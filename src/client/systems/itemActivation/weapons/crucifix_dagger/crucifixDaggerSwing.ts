import { World, useThrottle } from "@rbxts/matter";
import { CanUseItemFunction, UseItemEffectCallback, callItemActivation } from "client/itemHooks";
import { Acting, Action } from "shared/components/actions";
import { CrashLanding, Dashing, Falling, Jumping } from "shared/components/movements";
import { hasOneOfComponents } from "shared/hooks/components";

const COOLDOWN = 1;

const canUse: CanUseItemFunction = (w, e, item) => {
    if (hasOneOfComponents(w, e, Jumping, Dashing, CrashLanding, Falling, Acting)) {
        return false;
    }
    return useThrottle(COOLDOWN, "Cooldown");
};

const press: UseItemEffectCallback = (w, e, item, duration) => {
    // TODO: test this
    w.insert(e, Acting({ action: Action.swinging({ item, step: 0 }) }));
};

const callbacks = { canUse, press };

function crucifixDaggerSwing(w: World) {
    callItemActivation(w, "crucifix_dagger", callbacks);
}

export = crucifixDaggerSwing;
