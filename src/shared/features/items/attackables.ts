import variantModule, { VariantOf, fields } from "@rbxts/variant";
import { ShiftForwardData } from "shared/components/actions";
import { ItemType } from "./types";
import withAssetPrefix from "shared/calculations/withAssetPrefix";

export const ItemAttackSideEffect = variantModule({
    shiftForward: fields<ShiftForwardData>(),
});
export type ItemAttackSideEffect = VariantOf<typeof ItemAttackSideEffect>;

export interface ItemAttackbleContext {
    readonly toolHitboxDirectory: string;
    readonly damage: number;
    readonly cooldown: number;
    readonly stepTimeout: number;
    readonly stepAnimationIds: string[];
    readonly sideEffects: ItemAttackSideEffect[];
}

const asItemAttackableContext = (context: ItemAttackbleContext) => context;

export const ITEM_ATTACKABLE_CONTEXTS = {
    crucifix_dagger: asItemAttackableContext({
        toolHitboxDirectory: "Crucifix Dagger/Blade",
        damage: 10,
        cooldown: 0.5,
        stepTimeout: 0.5,
        stepAnimationIds: [withAssetPrefix("16426630172"), withAssetPrefix("16426603490")],
        sideEffects: [ItemAttackSideEffect.shiftForward({ force: 20 })],
    }),
};
