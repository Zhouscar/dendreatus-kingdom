import { World } from "@rbxts/matter";
import { findPlrE } from "shared/calculations/findEntity";
import { Health } from "shared/components/health";
import { routes } from "shared/network";
import { State } from "shared/state";

function requestReset(w: World, s: State, remoteToken: string) {
    for (const [pos, player, token] of routes.requestReset.query()) {
        assert(token === remoteToken, "HAHA YOU HACKER");

        const e = findPlrE(w, player as Player);
        if (e === undefined) continue;

        const health = w.get(e, Health);
        if (health === undefined) continue;

        w.insert(e, health.patch({ current: 0 }));
    }
}

export = requestReset;
