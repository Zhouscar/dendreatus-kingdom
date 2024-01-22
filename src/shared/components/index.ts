import { AnyEntity, component } from "@rbxts/matter";
import { LivingThingComponents } from "./livingThings";
import { MovementComponents } from "./movements";
import { MyAnimator } from "shared/effects/animations";
import { SoundContext } from "type";
import { HealthComponents } from "./health";
import { ColliderComponents } from "./colliders";
import { ItemComponents } from "./items";
import { ActionComponents } from "./actions";

export * from "./livingThings";

export const Renderable = component<{ model: Model }>("Renderable");
export type Renderable = ReturnType<typeof Renderable>;

export const Transform = component<{ cf: CFrame; _doNotReconcile?: true }>("Transform");
export type Transform = ReturnType<typeof Transform>;

export const Test = component<{}>("Test");
export type Test = ReturnType<typeof Test>;

export const Human = component<{ humanoid: Humanoid }>("Human");
export type Human = ReturnType<typeof Human>;

export const Animatable = component<{ animator: MyAnimator }>("Animatable");
export type Animatable = ReturnType<typeof Animatable>;

export const Sound = component<{
    creator: Player | "server";
    audibility: number;
    context: SoundContext;
    cf: CFrame;
}>("Sound");
export type Sound = ReturnType<typeof Sound>;

export const Collision = component<{ force: number; colliderE: AnyEntity; part: BasePart }>(
    "Collision",
);
export type Collision = ReturnType<typeof Collision>;

export const Components = {
    Renderable,
    Transform,
    Test,
    Human,
    Animatable,
    Sound,
    Collision,
    ...LivingThingComponents,
    ...MovementComponents,
    ...HealthComponents,
    ...ColliderComponents,
    ...ItemComponents,
    ...ActionComponents,
};
