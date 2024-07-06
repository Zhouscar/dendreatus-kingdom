import variantModule, { VariantOf } from "@rbxts/variant";
import { ItemType } from "./types";
import withAssetPrefix from "shared/calculations/withAssetPrefix";

export const ItemConsumeSideEffect = variantModule({});
export type ItemConsumeSideEffect = VariantOf<typeof ItemConsumeSideEffect>;

export interface ItemConsumableContext {
    readonly calories: number;
    readonly duration: number;
    readonly stageAnimationIds: string[];
    readonly sideEffects: ItemConsumeSideEffect[];
}

const asItemConsumableContext = (context: ItemConsumableContext) => context;

export const ITEM_CONSUMABLE_CONTEXTS = {
    mushroom_soup: asItemConsumableContext({
        calories: 10,
        duration: 3,
        stageAnimationIds: [
            withAssetPrefix("16651687848"),
            withAssetPrefix("16651687848"),
            withAssetPrefix("16651687848"),
        ],
        sideEffects: [],
    }),
};
