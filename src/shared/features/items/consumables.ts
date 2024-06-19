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

export const ITEM_CONSUMABLE_CONTEXTS: ReadonlyMap<ItemType, ItemConsumableContext> =
    new ReadonlyMap([
        [
            "mushroom_soup",
            {
                calories: 10,
                duration: 3,
                stageAnimationIds: [
                    withAssetPrefix("16651687848"),
                    withAssetPrefix("16651687848"),
                    withAssetPrefix("16651687848"),
                ],
                sideEffects: [],
            },
        ],
    ]);
