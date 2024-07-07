import { World } from "@rbxts/matter";
import { Sound, Transform } from "shared/components";
import { CannotInteract, CannotInteractReason, Cookable } from "shared/components/interactables";
import { DroppingItem } from "shared/components/items";
import { EMPTY_COOKABLE_ITEMS } from "shared/features/cookables/constants";
import { getItemTypeFromCookingRecipe } from "shared/features/cookables/cookableRecipes";
import gameTime from "shared/hooks/gameTime";

function rImpulse() {
    return new Vector3(math.random(-10, 10), math.random(10, 30), math.random(-10, 10));
}

function cookablesCook(w: World) {
    for (const [e, cannotInteractRecord] of w.queryChanged(CannotInteract)) {
        if (!w.contains(e)) continue;

        const cannotInteract = cannotInteractRecord.old;
        if (cannotInteract === undefined) continue;

        const cookable = w.get(e, Cookable);
        if (cookable === undefined) continue;

        const cf = w.get(e, Transform)?.cf;
        if (cf === undefined) continue;

        if (cannotInteract.reason.type !== "cooldown") continue;

        const item1 = cookable.items[0].item;
        const item2 = cookable.items[1].item;
        const item3 = cookable.items[2].item;
        assert(item1);
        assert(item2);
        assert(item3);

        const newItemType = getItemTypeFromCookingRecipe({
            itemType1: item1.itemType,
            itemType2: item2.itemType,
            itemType3: item3.itemType,
        });

        w.insert(e, cookable.patch({ items: EMPTY_COOKABLE_ITEMS }));

        assert(newItemType);

        w.spawn(
            DroppingItem({
                item: { itemType: newItemType, stack: 1 },
                impulse: rImpulse(),
                position: cf.Position,
            }),
        );

        w.spawn(Sound({ context: { soundName: "itemPopOut" }, cf: cf }));
    }

    for (const [e, cookableRecord] of w.queryChanged(Cookable)) {
        if (!w.contains(e)) continue;

        const cookable = cookableRecord.new;
        if (cookable === undefined) continue;

        const cf = w.get(e, Transform)?.cf;
        if (cf === undefined) continue;

        let size = 0;
        cookable.items.forEach((container) => {
            if (container.item !== undefined) size++;
        });

        if (size < 3) continue;

        const item1 = cookable.items[0].item;
        const item2 = cookable.items[1].item;
        const item3 = cookable.items[2].item;
        assert(item1);
        assert(item2);
        assert(item3);

        const newItemType = getItemTypeFromCookingRecipe({
            itemType1: item1.itemType,
            itemType2: item2.itemType,
            itemType3: item3.itemType,
        });

        if (newItemType === undefined) {
            w.spawn(DroppingItem({ item: item1, impulse: rImpulse(), position: cf.Position }));
            w.spawn(DroppingItem({ item: item2, impulse: rImpulse(), position: cf.Position }));
            w.spawn(DroppingItem({ item: item3, impulse: rImpulse(), position: cf.Position }));
            w.insert(e, cookable.patch({ items: EMPTY_COOKABLE_ITEMS }));

            w.spawn(Sound({ context: { soundName: "itemPopOut" }, cf: cf }));

            continue;
        }

        w.insert(
            e,
            CannotInteract({
                reason: CannotInteractReason.cooldown({ startTime: gameTime(), duration: 5 }),
            }),
        );
    }
}

export = cookablesCook;
