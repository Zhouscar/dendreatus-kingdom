import { None, World } from "@rbxts/matter";
import { BaseJumpContext, UsableJumpContext } from "shared/components/movements";

function usableJumpContext(w: World) {
    for (const [e, baseJumpContext] of w.query(BaseJumpContext)) {
        const power = baseJumpContext.power;
        const delay = baseJumpContext.delay;

        w.insert(e, UsableJumpContext({ power: power, delay: delay }));
    }
}
export = usableJumpContext;
