import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { State } from "shared/state";

const DK_GROUD_ID = 16214293;

function playerAdded(player: Player, s: State) {
    Promise.retryWithDelay(
        () => {
            const role = player.GetRoleInGroup(DK_GROUD_ID);
            const rank = player.GetRankInGroup(DK_GROUD_ID);

            return Promise.resolve({ role: role, rank: rank });
        },
        10,
        1,
    ).andThen((data) => {
        print(data);
        s.plrGroupDatas.set(player, data);
    });
}

function playerRemoved(player: Player, s: State) {
    s.plrGroupDatas.delete(player);
}

function plrGroupRole(w: World, s: State) {
    Players.GetPlayers().forEach((player) => {
        playerAdded(player, s);
    });

    Players.PlayerAdded.Connect((player) => {
        playerAdded(player, s);
    });

    Players.PlayerRemoving.Connect((player) => {
        playerRemoved(player, s);
    });
}

export = plrGroupRole;
