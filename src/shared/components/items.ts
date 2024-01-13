import { component } from "@rbxts/matter";
import { Item } from "shared/features/items/types";
import { ClientPredictable } from "type";

export const EquippingByIndex = component<{ index: number }>("EquippingByIndex");
export type EquippingByIndex = ReturnType<typeof EquippingByIndex>;

export const Equipping = component<{ itemGuid: string } & ClientPredictable>("Equipping");
export type Equipping = ReturnType<typeof Equipping>;

export const PredictUnequip = component<{}>("PredictUnequip");
export type PredictUnequip = ReturnType<typeof PredictUnequip>;

export const UsingItem = component<{ item: Item; startTime: number } & ClientPredictable>(
    "UsingItem",
);
export type UsingItem = ReturnType<typeof UsingItem>;

export const PredictUnuseItem = component<{}>("PredictUnuseItem");

export const ItemComponents = {
    EquippingByIndex,
    Equipping,
    PredictUnequip,
    UsingItem,
    PredictUnuseItem,
};
