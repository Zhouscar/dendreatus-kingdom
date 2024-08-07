import { World } from "@rbxts/matter";
import { routes } from "shared/network";
import { State } from "shared/state";

function requestSpawn(w: World, s: State, remoteToken: string) {
    for (const [pos, player, token] of routes.requestSpawn.query()) {
        assert(token === remoteToken, "HAHA YOU HACKER");

        task.spawn(() => {
            if ((player as Player).Character === undefined) {
                (player as Player).LoadCharacter();
            } else {
                (player as Player).Character?.Destroy();
            }
        });
    }
}

export = requestSpawn;
