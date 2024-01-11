import { component } from "@rbxts/matter";
import { ClientPredictable } from "type";

export const EquippingByIndex = component<{ index: number }>("EquippingByIndex");
export type EquippingByIndex = ReturnType<typeof EquippingByIndex>;

export const Equipping = component<{ itemGuid: string } | ClientPredictable>("Equipping"); // TODO: make this client predictable
export type Equipping = ReturnType<typeof Equipping>;

export const ItemComponents = { EquippingByIndex, Equipping };
