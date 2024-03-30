import { createBroadcastReceiver } from "@rbxts/reflex";
import { remos, routes } from "shared/routes";

export const receiver = createBroadcastReceiver({
    start: () => {
        remos.reflexCore.start.fire();
    },
});

remos.reflexCore.dispatch.connect((actions) => {
    receiver.dispatch(actions);
});

export const recieverMiddleware = receiver.middleware;
