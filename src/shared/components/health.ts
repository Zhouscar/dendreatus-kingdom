import { AnyEntity, component } from "@rbxts/matter";

export const Health = component<{
    current: number;
    maximum: number;
    damageContributors: ReadonlyMap<AnyEntity, number>;
}>("Health");
export type Health = ReturnType<typeof Health>;

export const Dead = component<{ startTime: number }>("Dead");
export type Dead = ReturnType<typeof Dead>;

export type DamageType = "physical" | "passive";
export const Damage = component<{
    amount: number;
    contributor?: AnyEntity;
    damageType: DamageType;
}>("Damage");
export type Damage = ReturnType<typeof Damage>;

export const HealthComponents = {
    Health,
    Dead,
    Damage,
};
