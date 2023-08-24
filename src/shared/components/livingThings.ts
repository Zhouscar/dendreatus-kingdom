import { component } from "@rbxts/matter";

export const Plr = component<{ player: Player }>("Plr");
export type Plr = ReturnType<typeof Plr>;

export const LivingThingComponents = { Plr };
