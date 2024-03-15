import { ComponentCreator } from "./creators";

// Arch States
export const OnLand = ComponentCreator.base<{}>("OnLand");
export type OnLand = ReturnType<typeof OnLand>;

export const InWater = ComponentCreator.base<{}>("InWater");
export type InWater = ReturnType<typeof InWater>;

export const InAir = ComponentCreator.base<{}>("InAir");
export type InAir = ReturnType<typeof InAir>;
// \Arch States

export const LinearVelocity = ComponentCreator.base<{ velocity: Vector3 }>("LinearVelocity");
export type LinearVelocity = ReturnType<typeof LinearVelocity>;

export const Sneaking = ComponentCreator.base<{}>("Sneaking");
export type Sneaking = ReturnType<typeof Sneaking>;

export const Falling = ComponentCreator.base<{ startTime: number }>("Falling");
export type Falling = ReturnType<typeof Falling>;

export const Climbing = ComponentCreator.base<{}>("Climbing");
export type Climbing = ReturnType<typeof Climbing>;

export const Landing = ComponentCreator.base<{}>("Landing");
export type Landing = ReturnType<typeof Landing>;

export const CrashLanding = ComponentCreator.base<{}>("CrashLanding");
export type CrashLanding = ReturnType<typeof CrashLanding>;

// Contexts
export const BaseJumpContext = ComponentCreator.base<{ power: number; delay: number }>(
    "BaseJumpContext",
);
export type BaseJumpContext = ReturnType<typeof BaseJumpContext>;

export const UsableJumpContext = ComponentCreator.base<{ power: number; delay: number }>(
    "UsableJumpContext",
);
export type UsableJumpContext = ReturnType<typeof UsableJumpContext>;

export const BaseDirectionalMovementContext = ComponentCreator.base<{
    walk: number;
    sprint: number;
    sneak: number;
    dive: number;
    swim: number;
    climb: number;
}>("BaseDirectionalMovementContext");
export type BaseDirectionalMovementContext = ReturnType<typeof BaseDirectionalMovementContext>;

export const UsableDirectionalMovementContext = ComponentCreator.base<{
    walk: number;
    sprint: number;
    sneak: number;
    dive: number;
    swim: number;
    climb: number;
}>("UsableDirectionalMovementContext");
export type UsableDirectionalMovementContext = ReturnType<typeof UsableDirectionalMovementContext>;

export const BaseLandingContext = ComponentCreator.base<{
    landDuration: number;
    crashLandDuration: number;
    timeTilCrashLand: number;
}>("BaseLandingContext");
export type BaseLandingContext = ReturnType<typeof BaseLandingContext>;

export const UsableLandingContext = ComponentCreator.base<{
    landDuration: number;
    crashLandDuration: number;
    timeTilCrashLand: number;
}>("UsableLandingContext");
export type UsableLandingContext = ReturnType<typeof UsableLandingContext>;

export const BaseDashContext = ComponentCreator.base<{
    duration: number;
    power: number;
    cooldown: number;
}>("BaseDashContext");
export type BaseDashContext = ReturnType<typeof BaseDashContext>;

export const UsableDashContext = ComponentCreator.base<{
    duration: number;
    power: number;
    cooldown: number;
}>("UsableDashContext");
export type UsableDashContext = ReturnType<typeof UsableDashContext>;
// \Contexts

export type DirectionalMovementType = "walk" | "sprint" | "sneak" | "dive" | "swim" | "climb";

export const PotentialDirectionalMovement = ComponentCreator.base<{
    type: DirectionalMovementType;
}>("PotentialDirectionalMovement");
export type PotentialDirectionalMovement = ReturnType<typeof PotentialDirectionalMovement>;

export const DirectionalMovement = ComponentCreator.base<{
    direction: Vector3;
}>("DirectionalMovement");
export type DirectionalMovement = ReturnType<typeof DirectionalMovement>;

// Cans

export const CanJump = ComponentCreator.base<{}>("CanJump");
export type CanJump = ReturnType<typeof CanJump>;

export const CanDirectionallyMove = ComponentCreator.base<{}>("CanDirectionallyMove");
export type CanDirectionallyMove = ReturnType<typeof CanDirectionallyMove>;

export const CanDash = ComponentCreator.base<{}>("CanDash");
export type CanDash = ReturnType<typeof CanDash>;

export const CanSneak = ComponentCreator.base<{}>("CanSneak");
export type CanSneak = ReturnType<typeof CanSneak>;
// \Cans

// Movement Actions
export const WillJump = ComponentCreator.base<{}>("WillJump");
export type WillJump = ReturnType<typeof WillJump>;

export const Jumping = ComponentCreator.base<{}>("Jumping");
export type Jumping = ReturnType<typeof Jumping>;

export const Dashing = ComponentCreator.base<{ startTime: number }>("Dashing");
export type Dashing = ReturnType<typeof Dashing>;
// \Movement Actions

export const MovementComponents = {
    OnLand,
    InWater,
    InAir,
    LinearVelocity,
    Sneaking,
    Falling,
    Climbing,
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
    CanSneak,
    WillJump,
    Jumping,
    Dashing,
};
