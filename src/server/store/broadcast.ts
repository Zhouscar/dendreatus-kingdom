import { createBroadcaster } from "@rbxts/reflex";
import { network } from "shared/network";
import { slices } from "shared/store";

const broadcaster = createBroadcaster({
    producers: slices,
    dispatch: (player, actions) => {
        network.reflex.dispatch.fire(player, actions);
    },
});

network.reflex.start.connect((player) => {
    broadcaster.start(player);
});

export const broadcasterMiddleware = broadcaster.middleware;
