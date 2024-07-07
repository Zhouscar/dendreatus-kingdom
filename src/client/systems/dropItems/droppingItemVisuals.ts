import { AnyEntity, World } from "@rbxts/matter";
import { ReplicatedStorage } from "@rbxts/services";
import { dropItemContainer } from "client/containers";
import { getPositionerCurrent } from "shared/calculations/positioner";
import { LocalPlr, Positioner, Renderable, Transform } from "shared/components";
import { DroppingItem } from "shared/components/items";
import { visualize } from "shared/effects/raycastHitbox";

function newDroppingPart() {
    const part = ReplicatedStorage.assets.dropItem.droppingPart.Clone();
    part.Anchored = true;
    part.CanCollide = false;
    part.Parent = dropItemContainer;
    return part;
}

const THRESHOLD_DISTANCE = 100;

function droppingItemVisuals(w: World) {
    let characterPos = undefined;
    for (const [e, localPlr, transform] of w.query(LocalPlr, Transform)) {
        characterPos = transform.cf.Position;
    }

    if (!characterPos) return;

    for (const [e, droppingItem, positioner] of w
        .query(DroppingItem, Positioner)
        .without(Renderable)) {
        const distance = characterPos.sub(positioner.initialPosition).Magnitude;
        if (distance > THRESHOLD_DISTANCE) continue;

        const part = newDroppingPart();
        part.Position = positioner.initialPosition;
        w.insert(e, Renderable({ pv: part }));
    }

    for (const [e, droppingItem, positioner, renderable] of w.query(
        DroppingItem,
        Positioner,
        Renderable,
    )) {
        const part = renderable.pv;
        if (!part.IsA("BasePart")) continue;

        const position = getPositionerCurrent(positioner, tick()).position;

        const distance = characterPos.sub(position).Magnitude;
        if (distance > THRESHOLD_DISTANCE) continue;

        part.Position = position;
    }
}

export = droppingItemVisuals;
