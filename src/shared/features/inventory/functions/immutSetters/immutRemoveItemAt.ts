import { PlayerInventory } from "shared/store/players/types";
import immutSetItemAt from "./immutSetItemAt";

function immutRemoveItemAt(inventory: PlayerInventory, index: number): PlayerInventory {
    return immutSetItemAt(inventory, index, undefined, []);
}

export = immutRemoveItemAt;
