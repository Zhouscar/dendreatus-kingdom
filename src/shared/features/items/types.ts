import Sift from "@rbxts/sift";
import { ITEM_ATTACKABLE_CONTEXTS } from "./attackables";
import { ITEM_CONTEXTS } from "./constants";

export interface Item {
    readonly itemType: ItemType;
    readonly stack: number;

    readonly soulbound?: boolean;
    readonly consumeStage?: number;
}

import { ITEM_CONSUMABLE_CONTEXTS } from "./consumables";
import { t } from "@rbxts/t";

export type ItemType = keyof typeof ITEM_CONTEXTS;
export type ItemAttackableType = keyof typeof ITEM_ATTACKABLE_CONTEXTS;
export type ItemConsumableType = keyof typeof ITEM_CONSUMABLE_CONTEXTS;

export const isItemType = (value: unknown): value is ItemType => {
    return Sift.Dictionary.keys(ITEM_CONTEXTS).includes(value as ItemType);
};

export const isItemAttackableType = (value: unknown): value is ItemAttackableType => {
    return Sift.Dictionary.keys(ITEM_ATTACKABLE_CONTEXTS).includes(value as ItemAttackableType);
};

export const isItemConsumableType = (value: unknown): value is ItemConsumableType => {
    return Sift.Dictionary.keys(ITEM_CONSUMABLE_CONTEXTS).includes(value as ItemConsumableType);
};
