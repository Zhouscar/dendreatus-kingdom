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
import { SignComponents } from "./signs";

export * from "./livingThings";

export const Member = ComponentCreator.replicated<{ role: string; rank: number }>("Member");
export type Member = ReturnType<typeof Member>;

export const ChattingRaw = ComponentCreator.protectedBidirectional<{ message: string }>(
    "ChattingRaw",
);
export type ChattingRaw = ReturnType<typeof ChattingRaw>;

export const Chatting = ComponentCreator.replicated<{ message: string; time: number }>("Chatting");
export type Chatting = ReturnType<typeof Chatting>;

export const InSafeZone = ComponentCreator.replicated("InSafeZone");
export type InSafeZone = ReturnType<typeof InSafeZone>;

export const SafeZone = ComponentCreator.tag("SafeZone");
export type SafeZone = ReturnType<typeof SafeZone>;

export const TitleCamPart = ComponentCreator.tag("TitleCamPart");
export type TitleCamPart = ReturnType<typeof TitleCamPart>;

export const Dummy = ComponentCreator.tag("Dummy");
export type Dummy = ReturnType<typeof Dummy>;

export const Renderable = ComponentCreator.replicated<{ pv?: PVInstance }>("Renderable");
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
    audibility?: number;
    context: SoundContext;
    cf: CFrame;
}>("Sound");
export type Sound = ReturnType<typeof Sound>;

export const Collision = ComponentCreator.base<{
    impulse: Vector3;
    colliderE: AnyEntity;
    part: BasePart;
}>("Collision");
export type Collision = ReturnType<typeof Collision>;

export const Positioner = ComponentCreator.replicated<{
    initialPosition: Vector3;
    initialVelocity: Vector3;
    acceleration: Vector3;

    startTime: number;

    raycastParams: RaycastParams;
}>("Positioner");
export type Positioner = ReturnType<typeof Positioner>;

export const BloodDrip = ComponentCreator.base<{}>("BloodDrip");
export type BloodDrip = ReturnType<typeof BloodDrip>;

export const Components = {
    Member,
    ChattingRaw,
    Chatting,
    InSafeZone,
    SafeZone,
    Dummy,
    Renderable,
    Transform,
    Test,
    Human,
    Animatable,
    Sound,
    Collision,
    Positioner,
    TitleCamPart,
    ...LivingThingComponents,
    ...MovementComponents,
    ...HealthComponents,
    ...ColliderComponents,
    ...ItemComponents,
    ...ActionComponents,
    ...HungerComponents,
    ...InteractableComponents,
    ...SignComponents,
};
