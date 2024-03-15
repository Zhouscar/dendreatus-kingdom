import { createBroadcastReceiver } from "@rbxts/reflex";
import { routes } from "shared/routes";

export const receiver = createBroadcastReceiver({
    start: () => {
        routes.reflexStart.send();
    },
});

export const recieverMiddleware = receiver.middleware;
