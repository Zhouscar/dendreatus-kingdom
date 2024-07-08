import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { ReplicatedStorage } from "@rbxts/services";
import { dropItemContainer } from "client/containers";
import { LocalPlr, Renderable, Transform } from "shared/components";
import { DroppedItem } from "shared/components/items";
import { UP } from "shared/constants/direction";
import { getToolAsDisplayByItemType } from "shared/features/items/getItem";
import { isItemType } from "shared/features/items/types";
import gameTime from "shared/hooks/gameTime";

function newDroppedModel() {
    const model = ReplicatedStorage.assets.dropItem.droppedModel.Clone();
    assert(model.PrimaryPart);
    model.PrimaryPart.Anchored = true;
    model.Parent = dropItemContainer;
    return model;
}

const THRESHOLD_DISTANCE = 100;

function droppedItemVisuals(w: World) {
    let characterPos = undefined;
    for (const [e, localPlr, transform] of w.query(LocalPlr, Transform)) {
        characterPos = transform.cf.Position;
    }

    if (!characterPos) return;

    for (const [e, droppedItemRecord] of w.queryChanged(DroppedItem)) {
        if (!w.contains(e)) continue;

        const droppedItem = droppedItemRecord.new;
        if (!droppedItem) continue;

        const model = newDroppedModel();
        model.PivotTo(new CFrame(droppedItem.position));

        const renderable = w.get(e, Renderable);
        if (renderable) {
            renderable.pv.Destroy();
        }

        w.insert(
            e,
            Renderable({ pv: model }),
            Transform({ cf: new CFrame(droppedItem.position), _doNotReconcile: true }),
        );
    }

    for (const [e, droppedItem, renderable] of w.query(DroppedItem, Renderable)) {
        const distance = droppedItem.position.sub(characterPos).Magnitude;
        if (distance > THRESHOLD_DISTANCE) continue;

        const itemType = isItemType(droppedItem.item)
            ? droppedItem.item
            : droppedItem.item.itemType;

        let itemAsDisplay = renderable.pv.FindFirstChildWhichIsA("Tool");
        if (useChange([itemType], e) || itemAsDisplay === undefined) {
            if (itemAsDisplay !== undefined) {
                itemAsDisplay.Destroy();
            }
            itemAsDisplay = getToolAsDisplayByItemType(itemType);
            itemAsDisplay.Parent = renderable.pv;
        }

        const baseCF = renderable.pv.GetPivot();
        if (baseCF === undefined) continue;

        const elapsed = gameTime() - droppedItem.droppedTime;
        const rotation = CFrame.Angles(0, elapsed, 0);
        const height = 1 - math.cos(elapsed * 2) * 0.5;

        const displayCF = baseCF.add(UP.mul(height)).mul(rotation);
        itemAsDisplay.PivotTo(displayCF);
    }
}

export = droppedItemVisuals;
