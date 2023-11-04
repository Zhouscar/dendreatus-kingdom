import { component } from "@rbxts/matter";

export const Health = component<{
    current: number;
    //baseMax: number;
    maximum: number;
}>("Health");
export type Health = ReturnType<typeof Health>;

export const Dead = component<{ startTime: number }>("Dead");
export type Dead = ReturnType<typeof Dead>;

export const Damage = component<{
    amount: number;
    //contributor
}>("Damage");
export type Damage = ReturnType<typeof Damage>;

export const HealthComponents = {
    Health,
    Dead,
    Damage,
};
