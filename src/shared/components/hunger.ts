import { component } from "@rbxts/matter";

export const Stomach = component<{
    hunger: number;
    capacity: number;
    digest: Map<string, number>;
}>("Stomach");
export type Stomach = ReturnType<typeof Stomach>;

export const HungerComponents = {
    Stomach,
};
