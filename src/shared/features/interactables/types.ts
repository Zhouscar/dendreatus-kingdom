import { t } from "@rbxts/t";

export const isInteractType = t.literal("harvest");
export type InteractType = t.static<typeof isInteractType>;

export type InteractState = "hidden" | "hinting" | "showing";
