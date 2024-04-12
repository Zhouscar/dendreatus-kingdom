import {
    DashContextData,
    DirectionalMovementContextData,
    DirectionalMovementType,
    JumpContextData,
    LandingContextData,
} from "shared/features/movements/types";
import { ComponentCreator } from "./creators";

// Arch States
export const OnLand = ComponentCreator.protectedBidirectional<{}>("OnLand");
export type OnLand = ReturnType<typeof OnLand>;

export const InWater = ComponentCreator.protectedBidirectional<{}>("InWater");
export type InWater = ReturnType<typeof InWater>;

export const InAir = ComponentCreator.protectedBidirectional<{}>("InAir");
export type InAir = ReturnType<typeof InAir>;
// \Arch States

export const LinearVelocity = ComponentCreator.base<{ velocity: Vector3 }>("LinearVelocity");
export type LinearVelocity = ReturnType<typeof LinearVelocity>;

export const Sneaking = ComponentCreator.protectedBidirectional<{}>("Sneaking");
export type Sneaking = ReturnType<typeof Sneaking>;

export const Falling = ComponentCreator.protectedBidirectional<{ startTime: number }>("Falling");
export type Falling = ReturnType<typeof Falling>;

export const Climbing = ComponentCreator.protectedBidirectional<{}>("Climbing");
export type Climbing = ReturnType<typeof Climbing>;

export const Landing = ComponentCreator.protectedBidirectional<{}>("Landing");
export type Landing = ReturnType<typeof Landing>;

export const CrashLanding = ComponentCreator.protectedBidirectional<{}>("CrashLanding");
export type CrashLanding = ReturnType<typeof CrashLanding>;

// Contexts
export const JumpContext = ComponentCreator.base<JumpContextData>("JumpContext");
export type JumpContext = ReturnType<typeof JumpContext>;

export const DirectionalMovementContext = ComponentCreator.base<DirectionalMovementContextData>(
    "DirectionalMovementContext",
);
export type DirectionalMovementContext = ReturnType<typeof DirectionalMovementContext>;

export const LandingContext = ComponentCreator.base<LandingContextData>("LandingContext");
export type LandingContext = ReturnType<typeof LandingContext>;

export const DashContext = ComponentCreator.base<DashContextData>("DashContext");
export type DashContext = ReturnType<typeof DashContext>;

// \Contexts

export const PotentialDirectionalMovement = ComponentCreator.monitored<{
    type: DirectionalMovementType;
}>("PotentialDirectionalMovement");
export type PotentialDirectionalMovement = ReturnType<typeof PotentialDirectionalMovement>;

export const DirectionalMovement = ComponentCreator.base<{
    direction: Vector3;
}>("DirectionalMovement");
export type DirectionalMovement = ReturnType<typeof DirectionalMovement>;

export const IsDirectionallyMoving = ComponentCreator.monitored<{}>("IsDirectionallyMoving");
export type IsDirectionallyMoving = ReturnType<typeof IsDirectionallyMoving>;

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

export const Jumping = ComponentCreator.protectedBidirectional<{}>("Jumping");
export type Jumping = ReturnType<typeof Jumping>;

export const Dashing = ComponentCreator.protectedBidirectional<{ startTime: number }>("Dashing");
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
    JumpContext,
    DirectionalMovementContext,
    LandingContext,
    DashContext,
    PotentialDirectionalMovement,
    DirectionalMovement,
    IsDirectionallyMoving,
    CanJump,
    CanDirectionallyMove,
    CanDash,
    CanSneak,
    WillJump,
    Jumping,
    Dashing,
};
