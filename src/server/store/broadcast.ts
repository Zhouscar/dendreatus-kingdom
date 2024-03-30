import { createBroadcaster } from "@rbxts/reflex";
import { slices } from "shared/store";
import { remos } from "shared/routes";

export const broadcaster = createBroadcaster({
    producers: slices,
    dispatch: (player, actions) => {
        print("SENDING");
        remos.reflexCore.dispatch.fire(player, actions);
    },
});

remos.reflexCore.start.connect((player) => {
    broadcaster.start(player);
});

export const broadcasterMiddleware = broadcaster.middleware;
