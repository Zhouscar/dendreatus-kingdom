import { component } from "@rbxts/matter";
import { ComponentCreator } from "./creators";

export const TestDamagePart = ComponentCreator.tag("TestDamagePart");
export type TestDamagePart = ReturnType<typeof TestDamagePart>;

export const ColliderComponents = {
    TestDamagePart,
};
