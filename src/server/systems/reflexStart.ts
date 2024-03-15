import { World } from "@rbxts/matter";
import { broadcaster } from "server/store/broadcast";
import { routes } from "shared/routes";

function reflexStart() {
    for (const [pos, player] of routes.reflexStart.query()) {
        broadcaster.start(player as Player);
    }
}

export = reflexStart;
