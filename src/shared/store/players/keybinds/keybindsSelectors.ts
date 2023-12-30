import { SharedState } from "shared/store";
import { defaultPlayerKeybinds } from "./keybindsDefaults";

export function selectPlayerKeybinds(plr: string) {
    return (state: SharedState) => {
        return state.players.keybinds[plr];
    };
}
