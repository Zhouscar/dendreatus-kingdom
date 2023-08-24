import { World } from "@rbxts/matter";
import { BaseDashContext, UsableDashContext } from "shared/components/movements";

function usableDashContext(w: World) {
    for (const [e, baseDashContext] of w.query(BaseDashContext)) {
        const duration = baseDashContext.duration;
        const power = baseDashContext.power;
        const cooldown = baseDashContext.cooldown;

        w.insert(e, UsableDashContext({ duration: duration, power: power, cooldown: cooldown }));
        return;
    }
}

export = usableDashContext;
