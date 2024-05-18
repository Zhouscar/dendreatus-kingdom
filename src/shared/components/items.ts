import { component } from "@rbxts/matter";
import { Item } from "shared/features/items/types";
import { ComponentCreator } from "./creators";

export const EquippingByIndex = ComponentCreator.base<{ index: number }>("EquippingByIndex");
export type EquippingByIndex = ReturnType<typeof EquippingByIndex>;

export const Equipping = ComponentCreator.protectedBidirectional<{ itemGuid: string }>("Equipping");
export type Equipping = ReturnType<typeof Equipping>;

export const PhysicallyEquipping = ComponentCreator.base<{ tool: Tool }>("PhysicallyEquipping");
export type PhysicallyEquipping = ReturnType<typeof PhysicallyEquipping>;

export const ActivatingItem = ComponentCreator.base<{
    item: Item;
    startTime: number | "temporarily_disabled";
}>("ActivatingItem");
export type ActivatingItem = ReturnType<typeof ActivatingItem>;

export const DroppedItem = ComponentCreator.replicated<{
    item: Item;
    droppedTime: number;
    willExpire: boolean;
}>("DroppedItem");
export type DroppedItem = ReturnType<typeof DroppedItem>;

export const DroppingItem = ComponentCreator.base<{
    item: Item;
    impulse: Vector3;
    position: Vector3;
}>("DroppingItem");
export type DroppingItem = ReturnType<typeof DroppedItem>;

export const ItemComponents = {
    EquippingByIndex,
    Equipping,
    PhysicallyEquipping,
    ActivatingItem,
};
