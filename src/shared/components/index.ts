import { component } from "@rbxts/matter";

export * from "./livingThings";

export const Renderable = component<{ model: Model }>("Renderable");
export type Renderable = ReturnType<typeof Renderable>;

export const Transform = component<{ cf: CFrame; _doNotReconcile?: true }>("Transform");
export type Transform = ReturnType<typeof Transform>;

export const Components = { Renderable, Transform };
