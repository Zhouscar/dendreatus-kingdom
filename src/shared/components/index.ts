import { component } from "@rbxts/matter";
import { LivingThingComponents } from "./livingThings";
import { MovementComponents } from "./movements";

export * from "./livingThings";

export const Renderable = component<{ model: Model }>("Renderable");
export type Renderable = ReturnType<typeof Renderable>;

export const Transform = component<{ cf: CFrame; _doNotReconcile?: true }>("Transform");
export type Transform = ReturnType<typeof Transform>;

export const Test = component<{}>("Test");
export type Test = ReturnType<typeof Test>;

export const Human = component<{ humanoid: Humanoid }>("Human");
export type Human = ReturnType<typeof Human>;

export const Components = {
    Renderable,
    Transform,
    Test,
    Human,
    ...LivingThingComponents,
    ...MovementComponents,
};
