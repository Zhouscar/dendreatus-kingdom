import { useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { store } from "server/store";

function reconcileInventories() {
    if (!useThrottle(5)) return;

    Players.GetPlayers().forEach((player) => {
        const plr = tostring(player.UserId);
        store.reconcileInventory(plr);
    });
}

export = reconcileInventories;
