import { PlayerKeybinds } from "shared/reflex/slices/players/types";

export type Host = "CLIENT" | "SERVER" | "UNKNOWN";
export type KeyCode = keyof typeof Enum.KeyCode;
export type KeyName = keyof PlayerKeybinds;
