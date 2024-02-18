import { component } from "@rbxts/matter";

export const Plr = component<{ player: Player }>("Plr");
export type Plr = ReturnType<typeof Plr>;

export const LocalPlr = component<{}>("LocalPlr");
export type LocalPlr = ReturnType<typeof LocalPlr>;

export const LivingThingComponents = { Plr };
