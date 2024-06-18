import { t } from "@rbxts/t";

export const isInteractType = t.literal(
    "harvest",
    "pickup",
    "place_item",
    "cook",
    "craft",
    "door_open",
    "door_close",
);
export type InteractType = t.static<typeof isInteractType>;

export type InteractState = "hidden" | "hinting" | "showing";
