import { AnyEntity, component } from "@rbxts/matter";
import { LivingThingComponents } from "./livingThings";
import { MovementComponents } from "./movements";
import { MyAnimator } from "shared/effects/animations";
import { SoundContext } from "type";
import { HealthComponents } from "./health";
import { ColliderComponents } from "./colliders";
import { ItemComponents } from "./items";
import { ActionComponents } from "./actions";
import { HungerComponents } from "./hunger";
import { ComponentCreator } from "./creators";
import { InteractableComponents } from "./interactables";

export * from "./livingThings";

export const Dummy = ComponentCreator.tag("Dummy");
export type Dummy = ReturnType<typeof Dummy>;

export const Renderable = ComponentCreator.replicated<{ model: Model }>("Renderable");
export type Renderable = ReturnType<typeof Renderable>;

export const Transform = ComponentCreator.base<{ cf: CFrame; _doNotReconcile?: true }>("Transform");
export type Transform = ReturnType<typeof Transform>;

export const Test = ComponentCreator.tag("Test");
export type Test = ReturnType<typeof Test>;

export const Human = ComponentCreator.replicated<{ humanoid: Humanoid }>("Human");
export type Human = ReturnType<typeof Human>;

export const Animatable = ComponentCreator.replicated<{ animator: MyAnimator }>("Animatable");
export type Animatable = ReturnType<typeof Animatable>;

export const Sound = ComponentCreator.bidirectional<{
    audibility: number;
    context: SoundContext;
    cf: CFrame;
}>("Sound");
export type Sound = ReturnType<typeof Sound>;

export const Collision = ComponentCreator.base<{
    force: number;
    colliderE: AnyEntity;
    part: BasePart;
}>("Collision");
export type Collision = ReturnType<typeof Collision>;

export const Components = {
    Dummy,
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
    ...HungerComponents,
    ...InteractableComponents,
};
