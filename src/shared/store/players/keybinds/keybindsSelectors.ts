import { SharedState } from "shared/store";

export function selectPlayerKeybinds(plr: string) {
    return (state: SharedState) => {
        return state.players.keybinds[plr];
    };
}
