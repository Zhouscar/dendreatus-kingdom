import { createProducer } from "@rbxts/reflex";
import { PlayerData, PlayerKeybinds } from "./types";
import { produce } from "@rbxts/immut";
import { KeyCode } from "types";
import { defaultPlayerKeybinds } from "./defaults";

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

    setKeybind: (
        state: KeybindsState,
        plr: string,
        action: keyof PlayerKeybinds,
        keycode: KeyCode,
    ) => {
        const playerKeybinds = state[plr];
        if (playerKeybinds === undefined) return state;
        return {
            ...state,
            [plr]: produce(playerKeybinds, (draft) => {
                draft[action] = keycode;
            }),
        };
    },

    resetKeybinds: (state: KeybindsState, plr: string) => {
        if (state[plr] === undefined) return state;
        return {
            ...state,
            [plr]: defaultPlayerKeybinds,
        };
    },
});
