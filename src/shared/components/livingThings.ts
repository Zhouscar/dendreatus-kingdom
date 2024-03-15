import { component } from "@rbxts/matter";
import { ComponentCreator } from "./creators";

export const Plr = ComponentCreator.replicated<{ player: Player }>("Plr");
export type Plr = ReturnType<typeof Plr>;

export const LocalPlr = ComponentCreator.base<{}>("LocalPlr");
export type LocalPlr = ReturnType<typeof LocalPlr>;

export const LivingThingComponents = { Plr };
