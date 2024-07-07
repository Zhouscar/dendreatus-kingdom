import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { t } from "@rbxts/t";
import {
    bloodContainer,
    dropItemContainer,
    raycastVisualizePartsContainer,
} from "client/containers";
import { findInstanceE } from "shared/calculations/findEntity";
import { getPositionerCurrent } from "shared/calculations/positioner";
import { Positioner } from "shared/components";
import { Interactable } from "shared/components/interactables";
import { DroppedItem, DroppingItem } from "shared/components/items";
import { GRAVITY } from "shared/constants/gravity";

function droppingItems(w: World) {
    for (const [e, droppingItem] of w.query(DroppingItem).without(Positioner)) {
        const params = new RaycastParams();
        params.IgnoreWater = true;
        params.FilterType = Enum.RaycastFilterType.Exclude;
        params.AddToFilter([bloodContainer, raycastVisualizePartsContainer, dropItemContainer]);

        w.insert(
            e,
            Positioner({
                initialPosition: droppingItem.position,
                initialVelocity: droppingItem.impulse,
                acceleration: GRAVITY,
                raycastParams: params,
                startTime: tick(),
            }),
        );
    }

    for (const [e, droppingItem, positioner] of w.query(DroppingItem, Positioner)) {
        const positionerCurrent = getPositionerCurrent(positioner, tick());

        const result = Workspace.Raycast(
            positionerCurrent.position,
            positionerCurrent.velocity.Unit,
            positioner.raycastParams,
        );

        if (!result) continue;
        if (!result.Instance.Anchored || !result.Instance.CanCollide) continue;

        const instanceE = findInstanceE(w, result.Instance);
        if (instanceE !== undefined) continue;

        let item = droppingItem.item;

        const itemNotUnique =
            t.string(item) ||
            (item.soulbound === undefined && item.consumeStage === undefined && item.stack === 1);

        if (itemNotUnique) {
            item = t.string(item) ? item : item.itemType;
        }

        w.insert(
            e,
            DroppedItem({
                item: item,
                position: result.Position,
                droppedTime: tick(),
                willExpire: true,
            }),
            Interactable({}),
        );
        w.remove(e, DroppingItem, Positioner);
    }
}

export = droppingItems;
