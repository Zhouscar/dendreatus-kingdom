import { createProducer } from "@rbxts/reflex";
import { PlayerData, PlayerKeybinds } from "./types";

export interface KeybindsState {
    [plr: string]: PlayerKeybinds | undefined;
}

const initState: KeybindsState = {};

export const keybindsSlice = createProducer(initState, {
    loadPlayerData: (state, plr: string, data: PlayerData) => ({
        ...state,
        [plr]: data.keybinds,
    }),

    closePlayerData: (state, plr: string) => ({
        ...state,
        [plr]: undefined,
    }),
});
