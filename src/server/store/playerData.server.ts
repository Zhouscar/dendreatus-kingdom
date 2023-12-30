import { GetProfileStore } from "@rbxts/profileservice";
import { Profile } from "@rbxts/profileservice/globals";
import { Players } from "@rbxts/services";
import { defaultPlayerData } from "shared/store/players/playerDefaults";
import { selectPlayerData } from "shared/store/players/playersSelectors";
import { PlayerData } from "shared/store/players/types";
import { store } from ".";

const profileStore = GetProfileStore("playerData", defaultPlayerData);

const profiles: Map<Player, Profile<PlayerData, unknown> | undefined> = new Map();

const playerAdded = (player: Player): void => {
    if (player.UserId < 0) {
        store.loadPlayerData(tostring(player.UserId), defaultPlayerData);
        return;
    }

    const profile = profileStore.LoadProfileAsync("player_" + tostring(player.UserId));
    if (profile !== undefined) {
        profile.AddUserId(player.UserId);
        profile.Reconcile();
        profile.ListenToRelease(() => {
            profiles.set(player, undefined);
            store.closePlayerData(tostring(player.UserId));
            player.Kick();
        });
        if (player.IsDescendantOf(Players) === true) {
            profiles.set(player, profile);
            store.loadPlayerData(tostring(player.UserId), profile.Data);
            const unsubscribe = store.subscribe(
                selectPlayerData(tostring(player.UserId)),
                (data) => {
                    if (data !== undefined) profile.Data = data;
                },
            );

            Promise.fromEvent(Players.PlayerRemoving, (p) => p === player).then(() => {
                unsubscribe();
                profile.Release();
            });
        } else {
            profile.Release();
        }
    } else {
        player.Kick();
    }
};

Players.GetPlayers().forEach((player: Player) => {
    task.spawn(playerAdded, player);
});

Players.PlayerAdded.Connect(playerAdded);

Players.PlayerRemoving.Connect((player: Player) => {
    const profile = profiles.get(player);
    if (profile !== undefined) profile.Release();
});
