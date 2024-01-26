import { component } from "@rbxts/matter";
import { t } from "@rbxts/t";
import variantModule, { TypeNames, VariantOf, fields } from "@rbxts/variant";
import { Item } from "shared/features/items/types";

type WithItem = {
    item: Item;
};
export const isWithItem = (value: unknown): value is WithItem => {
    return t.interface({
        item: t.table,
    })(value);
};

type WithDuration = {
    startTime: number;
    duration: number;
};
export const isWithDuration = (value: unknown): value is WithDuration => {
    return t.interface({
        startTime: t.number,
        duration: t.number,
    })(value);
};

export const Action = variantModule({
    attacking: fields<{ step: number } & WithItem & WithDuration>(),
});
export type Action<T extends TypeNames<typeof Action> = undefined> = VariantOf<typeof Action, T>;

export const Acting = component<{ action: Action }>("Acting");
export type Acting = ReturnType<typeof Acting>;

// side effects
export interface ShiftForwardData {
    force: number;
    delay?: number;
}
export const ShiftForward = component<ShiftForwardData & { startTime: number }>("ShiftForward");
export type ShiftForward = ReturnType<typeof ShiftForward>;

export const ActionComponents = {
    Acting,
};
