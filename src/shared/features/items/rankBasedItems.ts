import { ItemType } from "./types";

export const RANK_BASED_ITEMS: Map<NumberRange, ItemType[]> = new Map([
    [new NumberRange(1, 2), ["survivor_lantern"]],
    [new NumberRange(3), ["noble_lantern", "crucifix_dagger"]],
    [new NumberRange(4, 9), ["ritualist_candle", "sword"]],
    [new NumberRange(251, 254), ["royal_lantern", "sword"]],
    [new NumberRange(255), ["owner_lantern", "sword"]],
]);
