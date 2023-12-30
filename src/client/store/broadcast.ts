import { createBroadcastReceiver } from "@rbxts/reflex";
import { network } from "shared/network";

const receiver = createBroadcastReceiver({
    start: () => {
        network.reflex.start.fire();
    },
});

network.reflex.dispatch.connect((actions) => {
    receiver.dispatch(actions);
});

export const recieverMiddleware = receiver.middleware;
