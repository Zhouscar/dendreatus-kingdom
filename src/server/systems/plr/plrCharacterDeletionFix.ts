import { World, useEvent } from "@rbxts/matter";
import { Players, Workspace } from "@rbxts/services";
import { findPlrE } from "shared/calculations/findEntity";

const playersRemoving: Set<Player> = new Set();
const playersSpawnedOnce: Set<Player> = new Set();
const playersRespawning: Set<Player> = new Set();

function plrCharacterDeletionFix(w: World) {
    playersRemoving.forEach((player) => {
        if (player.Parent === Players) return;
        playersRemoving.delete(player);
    });

    for (const [_, player] of useEvent(Players, "PlayerRemoving")) {
        playersRemoving.add(player);
    }

    Players.GetPlayers().forEach((player) => {
        for (const [_, character] of useEvent(player, "CharacterAdded")) {
            if (!playersSpawnedOnce.has(player)) {
                playersSpawnedOnce.add(player);
            }
        }

        if (playersRemoving.has(player)) return;
        if (playersSpawnedOnce.has(player)) {
            if (player.Character === undefined || !player.Character.IsDescendantOf(Workspace)) {
                const plrE = findPlrE(w, player);
                if (plrE !== undefined) {
                    w.despawn(plrE);
                }
                if (playersRespawning.has(player)) return;
                playersRespawning.add(player);
                task.defer(() => {
                    player.LoadCharacter();
                    playersRespawning.delete(player);
                });
            }
        }
    });
}

export = plrCharacterDeletionFix;
