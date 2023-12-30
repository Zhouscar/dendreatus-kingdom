import { SharedState } from "shared/store";

export function selectPlayerInventory(plr: string) {
    return (state: SharedState) => {
        return state.players.inventory[plr];
    };
}
