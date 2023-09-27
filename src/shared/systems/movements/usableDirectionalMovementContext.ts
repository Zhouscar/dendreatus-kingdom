import { World } from "@rbxts/matter";
import {
    BaseDirectionalMovementContext,
    UsableDirectionalMovementContext,
} from "shared/components/movements";

function usableDirectionalMovementContext(w: World) {
    for (const [id, baseDirectionalMovementContext] of w.query(BaseDirectionalMovementContext)) {
        const walk = baseDirectionalMovementContext.walk;
        const sprint = baseDirectionalMovementContext.sprint;
        const sneak = baseDirectionalMovementContext.sneak;
        const dive = baseDirectionalMovementContext.dive;
        const swim = baseDirectionalMovementContext.swim;

        w.insert(
            id,
            UsableDirectionalMovementContext({
                walk: walk,
                sprint: sprint,
                sneak: sneak,
                dive: dive,
                swim: swim,
            }),
        );
    }
}
export = usableDirectionalMovementContext;
