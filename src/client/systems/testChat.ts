import { World, useThrottle } from "@rbxts/matter";
import { Chatting, LocalPlr } from "shared/components";

function msg() {
    let s = "";
    while (math.random(10) !== 1) {
        s += "a";
    }
    return s;
}

export = function (w: World) {
    if (!useThrottle(3)) return;
    for (const [e] of w.query(LocalPlr)) {
        const m = msg();
        print(m);
        w.insert(e, Chatting({ message: m }));
    }
};
