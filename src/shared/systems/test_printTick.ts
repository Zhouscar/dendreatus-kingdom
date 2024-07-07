import { useThrottle, World } from "@rbxts/matter";

export = function () {
    if (!useThrottle(1)) return;

    print(`os.clock() ${os.clock()}`);
    print(`tick ${tick()}`);
};
