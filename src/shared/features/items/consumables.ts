import variantModule, { VariantOf } from "@rbxts/variant";
import withAssetPrefix from "shared/calculations/withAssetPrefix";
import { SoundName } from "../ids/sounds";

export const ItemConsumeSideEffect = variantModule({});
export type ItemConsumeSideEffect = VariantOf<typeof ItemConsumeSideEffect>;

export interface ItemConsumableContext {
    readonly calories: number;
    readonly duration: number;
    readonly stageAnimationIds: string[];
    readonly consumeSoundName: SoundName;
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
        consumeSoundName: "consumeSoup",
        sideEffects: [],
    }),
    humberbell: asItemConsumableContext({
        calories: 10,
        duration: 3,
        stageAnimationIds: [
            withAssetPrefix("17306447831"),
            withAssetPrefix("17306447831"),
            withAssetPrefix("17306447831"),
        ],
        consumeSoundName: "consumeHumberbell",
        sideEffects: [],
    }),
    goya: asItemConsumableContext({
        calories: 10,
        duration: 3,
        stageAnimationIds: [
            withAssetPrefix("17306177651"),
            withAssetPrefix("17306177651"),
            withAssetPrefix("17306177651"),
        ],
        consumeSoundName: "consumeGoya",
        sideEffects: [],
    }),
};
