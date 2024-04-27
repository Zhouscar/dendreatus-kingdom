export interface DirectionalMovementContextData {
    walk: number;
    sprint: number;
    sneak: number;
    dive: number;
    swim: number;
    climb: number;

    acceleration: number;
    decceleration: number;
}

export interface LandingContextData {
    landDuration: number;
    crashLandDuration: number;
    timeTilCrashLand: number;
}

export interface DashContextData {
    duration: number;
    power: number;
    cooldown: number;
}

export interface JumpContextData {
    power: number;
    delay: number;
}

export type DirectionalMovementType = "walk" | "sprint" | "sneak" | "dive" | "swim" | "climb";
