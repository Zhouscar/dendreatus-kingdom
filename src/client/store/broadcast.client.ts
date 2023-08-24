import { createBroadcastReceiver } from "@rbxts/reflex";
import { network } from "shared/network";
import { store } from ".";

const receiver = createBroadcastReceiver({
    start: () => {
        network.reflex.start.fire();
    },
});

network.reflex.dispatch.connect((actions) => {
    receiver.dispatch(actions);
});

store.applyMiddleware(receiver.middleware);
