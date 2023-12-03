import { PlayerKeybinds } from "shared/store/slices/players/types";

export type Host = "CLIENT" | "SERVER" | "UNKNOWN";
export type KeyCode = keyof typeof Enum.KeyCode;
export type KeyName = keyof PlayerKeybinds;
export type SoundContext = {
    volume: number;
    soundId: string;
    speed: number;
};
