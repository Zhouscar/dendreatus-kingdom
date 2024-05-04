import { None, produce } from "@rbxts/immut";
import { Draft } from "@rbxts/immut/src/types-external";
import { Item } from "shared/features/items/types";
import { PlayerInventory } from "shared/store/players/types";

function immutModifyItemAtGuid(
    inventory: PlayerInventory,
    guid: string,
    recipe: (draft: Draft<Item>) => Draft<Item> | void | undefined | Item,
) {
    return produce(inventory, (draft) => {
        const item = draft.items.get(guid);
        if (item === undefined) return;
        draft.items.set(guid, produce(item, recipe));
    });
}

export = immutModifyItemAtGuid;
