import { EMPTY_SLOTS } from "shared/features/inventory/constants";
import { PlayerInventory } from "../types";

export const defaultPlayerInventory: PlayerInventory = {
    slots: EMPTY_SLOTS,
    items: {},
};
