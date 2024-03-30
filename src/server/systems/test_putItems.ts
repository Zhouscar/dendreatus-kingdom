import { World, useThrottle } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { store } from "server/store";
import { createGuidPool } from "shared/features/guidUtils";
import { defaultPlayerData } from "shared/store/players/playerDefaults";

export = function (w: World) {
    if (useThrottle(10, "putItems")) {
        Players.GetPlayers().forEach((player) => {
            const plr = tostring(player.UserId);
            store.putItems(plr, "mushroom_soup", 1, createGuidPool(10));
        });
    }
};
