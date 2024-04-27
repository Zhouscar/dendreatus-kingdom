import {
    DashContextData,
    DirectionalMovementContextData,
    JumpContextData,
    LandingContextData,
} from "./types";

export const plrBaseDirectionalMovementContext: DirectionalMovementContextData = {
    walk: 10,
    sprint: 30,
    sneak: 5,
    dive: 20,
    swim: 10,
    climb: 10,

    acceleration: 50,
    decceleration: 100,
};

export const plrBaseLandingContext: LandingContextData = {
    landDuration: 1,
    crashLandDuration: 5,
    timeTilCrashLand: 1,
};

export const plrBaseDashContext: DashContextData = { duration: 0.2, power: 100, cooldown: 1 };

export const plrBaseJumpContext: JumpContextData = { power: 40, delay: 0.2 };

// TODO: so should I do the context conversion in a function then a system or just a system?
// preferrably a function then system because that is easier to find in the workspace
