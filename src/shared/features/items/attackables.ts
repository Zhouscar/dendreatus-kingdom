import variantModule, { VariantOf, fields } from "@rbxts/variant";
import { ShiftForwardData } from "shared/components/actions";
import { ItemType } from "./types";
import withAssetPrefix from "shared/calculations/withAssetPrefix";

export const ItemAttackSideEffect = variantModule({
    shiftForward: fields<ShiftForwardData>(),
});
export type ItemAttackSideEffect = VariantOf<typeof ItemAttackSideEffect>;

export interface ItemAttackbleContext {
    readonly damage: number;
    readonly cooldown: number;
    readonly stepTimeout: number;
    readonly stepAnimationIds: string[];
    readonly sideEffects: ItemAttackSideEffect[];
}

const asItemAttackableContext = (context: ItemAttackbleContext) => context;

export const ITEM_ATTACKABLE_CONTEXTS = {
    crucifix_dagger: asItemAttackableContext({
        damage: 5,
        cooldown: 0.5,
        stepTimeout: 0.5,
        stepAnimationIds: [withAssetPrefix("16426630172"), withAssetPrefix("16426603490")],
        sideEffects: [ItemAttackSideEffect.shiftForward({ force: 20 })],
    }),
    scrap_blade: asItemAttackableContext({
        damage: 8,
        cooldown: 0.5,
        stepTimeout: 0.5,
        stepAnimationIds: [withAssetPrefix("17390314970"), withAssetPrefix("18365427377")],
        sideEffects: [ItemAttackSideEffect.shiftForward({ force: 20 })],
    }),
    spikeball: asItemAttackableContext({
        damage: 15,
        cooldown: 0.5,
        stepTimeout: 0.5,
        stepAnimationIds: [withAssetPrefix("5835032207"), withAssetPrefix("18365427377")],
        sideEffects: [ItemAttackSideEffect.shiftForward({ force: 20 })],
    }),
    sword: asItemAttackableContext({
        damage: 20,
        cooldown: 0.5,
        stepTimeout: 0.5,
        stepAnimationIds: [withAssetPrefix("17390314970"), withAssetPrefix("18365427377")],
        sideEffects: [ItemAttackSideEffect.shiftForward({ force: 20 })],
    }),
};
