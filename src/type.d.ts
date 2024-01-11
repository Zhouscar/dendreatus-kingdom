import { PlayerKeybinds } from "shared/store/players/types";

export type Host = "CLIENT" | "SERVER" | "UNKNOWN";
export type KeyCode = keyof typeof Enum.KeyCode;
export type KeyName = keyof PlayerKeybinds;
export type SoundContext = {
    volume: number;
    soundId: string;
    speed: number;
};
export type ClientPredictable = {
    predicting?: boolean;
};
