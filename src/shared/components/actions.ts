import { t } from "@rbxts/t";
import variantModule, { TypeNames, VariantOf, fields } from "@rbxts/variant";
import { Item } from "shared/features/items/types";
import { ComponentCreator } from "./creators";
import { WithDuration } from "shared/features/types";

type WithItem = {
    item: Item;
};
export const isWithItem = (value: unknown): value is WithItem => {
    return t.interface({
        item: t.table,
    })(value);
};

export const Action = variantModule({
    attacking: fields<{ step: number } & WithItem & WithDuration>(),
    consuming: fields<{ stage: number } & WithItem & WithDuration>(),
});
export type Action<T extends TypeNames<typeof Action> = undefined> = VariantOf<typeof Action, T>;

export const Acting = ComponentCreator.monitored<{ action: Action }>("Acting");
export type Acting = ReturnType<typeof Acting>;

// side effects
export interface ShiftForwardData {
    force: number;
    delay?: number;
}
export const ShiftForward = ComponentCreator.monitored<ShiftForwardData & { startTime: number }>(
    "ShiftForward",
);
export type ShiftForward = ReturnType<typeof ShiftForward>;

export const ActionComponents = {
    Acting,
    ShiftForward,
};
