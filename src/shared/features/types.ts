import { t } from "@rbxts/t";

export type WithDuration = {
    startTime: number;
    duration: number;
};

export const isWithDuration = (value: unknown): value is WithDuration => {
    return t.interface({
        startTime: t.number,
        duration: t.number,
    })(value);
};
