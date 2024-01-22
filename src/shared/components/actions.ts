import { component } from "@rbxts/matter";
import variantModule, { TypeNames, VariantOf, fields } from "@rbxts/variant";
import { Item } from "shared/features/items/types";

type WithItem = {
    item: Item;
};

export const Action = variantModule({
    swinging: fields<{ step: number } & WithItem>(),
});
export type Action<T extends TypeNames<typeof Action> = undefined> = VariantOf<typeof Action, T>;

export const Acting = component<{ action: Action }>("Acting");
export type Acting = ReturnType<typeof Acting>;

export const ActionComponents = {
    Acting,
};
