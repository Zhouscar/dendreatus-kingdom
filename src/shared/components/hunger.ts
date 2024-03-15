import { ComponentCreator } from "./creators";

export const Stomach = ComponentCreator.replicated<{
    hunger: number;
    capacity: number;
    digest: Map<string, number>;
}>("Stomach");
export type Stomach = ReturnType<typeof Stomach>;

export const HungerComponents = {
    Stomach,
};
