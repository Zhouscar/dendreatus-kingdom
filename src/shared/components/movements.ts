import { component } from "@rbxts/matter";

// Arch States
export const OnLand = component<{}>("OnLand");
export type OnLand = ReturnType<typeof OnLand>;

export const InWater = component<{}>("InWater");
export type InWater = ReturnType<typeof InWater>;

export const InAir = component<{}>("InAir");
export type InAir = ReturnType<typeof InAir>;
// \Arch States

export const LinearVelocity = component<{ velocity: Vector3 }>("LinearVelocity");
export type LinearVelocity = ReturnType<typeof LinearVelocity>;

export const Sneaking = component<{}>("Sneaking");
export type Sneaking = ReturnType<typeof Sneaking>;

export const Falling = component<{ startTime: number }>("Falling");
export type Falling = ReturnType<typeof Falling>;

export const Landing = component<{}>("Landing");
export type Landing = ReturnType<typeof Landing>;

export const CrashLanding = component<{}>("CrashLanding");
export type CrashLanding = ReturnType<typeof CrashLanding>;

// Contexts
export const BaseJumpContext = component<{ power: number; delay: number }>("BaseJumpContext");
export type BaseJumpContext = ReturnType<typeof BaseJumpContext>;

export const UsableJumpContext = component<{ power: number; delay: number }>("UsableJumpContext");
export type UsableJumpContext = ReturnType<typeof UsableJumpContext>;

export const BaseDirectionalMovementContext = component<{
    walk: number;
    sprint: number;
    sneak: number;
    dive: number;
    swim: number;
}>("BaseDirectionalMovementContext");
export type BaseDirectionalMovementContext = ReturnType<typeof BaseDirectionalMovementContext>;

export const UsableDirectionalMovementContext = component<{
    walk: number;
    sprint: number;
    sneak: number;
    dive: number;
    swim: number;
}>("UsableDirectionalMovementContext");
export type UsableDirectionalMovementContext = ReturnType<typeof UsableDirectionalMovementContext>;

export const BaseLandingContext = component<{
    landDuration: number;
    crashLandDuration: number;
    timeTilCrashLand: number;
}>("BaseLandingContext");
export type BaseLandingContext = ReturnType<typeof BaseLandingContext>;

export const UsableLandingContext = component<{
    landDuration: number;
    crashLandDuration: number;
    timeTilCrashLand: number;
}>("UsableLandingContext");
export type UsableLandingContext = ReturnType<typeof UsableLandingContext>;

export const BaseDashContext = component<{
    duration: number;
    power: number;
    cooldown: number;
}>("BaseDashContext");
export type BaseDashContext = ReturnType<typeof BaseDashContext>;

export const UsableDashContext = component<{
    duration: number;
    power: number;
    cooldown: number;
}>("UsableDashContext");
export type UsableDashContext = ReturnType<typeof UsableDashContext>;
// \Contexts

export type DirectionalMovementType = "walk" | "sprint" | "sneak" | "dive" | "swim";

export const PotentialDirectionalMovement = component<{
    type: DirectionalMovementType;
}>("PotentialDirectionalMovement");
export type PotentialDirectionalMovement = ReturnType<typeof PotentialDirectionalMovement>;

export const DirectionalMovement = component<{
    direction: Vector3;
}>("DirectionalMovement");
export type DirectionalMovement = ReturnType<typeof DirectionalMovement>;

// Cans

export const CanJump = component<{}>("CanJump");
export type CanJump = ReturnType<typeof CanJump>;

export const CanDirectionallyMove = component<{}>("CanDirectionallyMove");
export type CanDirectionallyMove = ReturnType<typeof CanDirectionallyMove>;

export const CanDash = component<{}>("CanDash");
export type CanDash = ReturnType<typeof CanDash>;
// \Cans

// Movement Actions
export const Jumping = component<{}>("Jumping");
export type Jumping = ReturnType<typeof Jumping>;

export const Dashing = component<{ startTime: number }>("Dashing");
export type Dashing = ReturnType<typeof Dashing>;
// \Movement Actions

export const MovementComponents = {
    OnLand,
    InWater,
    InAir,
    LinearVelocity,
    Sneaking,
    Falling,
    Landing,
    CrashLanding,
    BaseJumpContext,
    UsableJumpContext,
    BaseDirectionalMovementContext,
    UsableDirectionalMovementContext,
    BaseLandingContext,
    UsableLandingContext,
    BaseDashContext,
    UsableDashContext,
    PotentialDirectionalMovement,
    DirectionalMovement,
    CanJump,
    CanDirectionallyMove,
    CanDash,
    Jump: Jumping,
    Dash: Dashing,
};
