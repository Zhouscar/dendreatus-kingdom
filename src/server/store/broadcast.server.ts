import { createBroadcaster } from "@rbxts/reflex";
import { network } from "shared/network";
import { slices } from "shared/reflex/slices";
import { store } from ".";

const broadcaster = createBroadcaster({
    producers: slices,
    dispatch: (player, actions) => {
        network.reflex.dispatch.fire(player, actions);
    },
});

network.reflex.start.connect((player) => {
    broadcaster.start(player);
});

store.applyMiddleware(broadcaster.middleware);
