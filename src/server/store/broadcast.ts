import { createBroadcaster } from "@rbxts/reflex";
import { slices } from "shared/store";
import { routes } from "shared/routes";

export const broadcaster = createBroadcaster({
    producers: slices,
    dispatch: (player, actions) => {
        routes.reflexDispatch.send(actions).to(player);
    },
});

export const broadcasterMiddleware = broadcaster.middleware;
