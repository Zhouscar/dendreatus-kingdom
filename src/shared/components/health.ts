import { AnyEntity, component } from "@rbxts/matter";
import { ComponentCreator } from "./creators";

export const Health = ComponentCreator.replicated<{
    current: number;
    maximum: number;
    damageContributors: ReadonlyMap<AnyEntity, number>;
}>("Health");
export type Health = ReturnType<typeof Health>;

export const Dead = ComponentCreator.replicated<{ startTime: number }>("Dead");
export type Dead = ReturnType<typeof Dead>;

export type DamageType = "physical" | "passive";
export const Damage = ComponentCreator.bidirectional<{
    time: number;
    amount: number;
    serverContributor?: AnyEntity;
    damageType: DamageType;
}>("Damage");
export type Damage = ReturnType<typeof Damage>;

export const HealthComponents = {
    Health,
    Dead,
    Damage,
};
