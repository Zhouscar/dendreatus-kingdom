import { World } from "@rbxts/matter";
import { UseItemEffectCallback, callItemActivation } from "client/itemHooks";

const press: UseItemEffectCallback = (w, item, startTime) => {
    print("press");
};

const hold: UseItemEffectCallback = (w, item, startTime) => {
    print("hold");
};

const release: UseItemEffectCallback = (w, item, startTime) => {
    print("release");
};

const callbacks = {
    press,
    hold,
    release,
};

export = (w: World) => {
    callItemActivation(w, "stick", callbacks);
};
