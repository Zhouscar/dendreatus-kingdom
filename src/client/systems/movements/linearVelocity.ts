import { World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr, Renderable } from "shared/components";
import { LinearVelocity } from "shared/components/movements";
import { getPvPrimaryPart } from "shared/hooks/pvPart";

function linearVelocity(w: World) {
    for (const [e, renderableRecord] of w.queryChanged(Renderable)) {
        if (!w.contains(e)) continue;
        if (renderableRecord.new !== undefined) continue;
        w.remove(e, LinearVelocity);
    }

    for (const [e, localPlr, renderable] of w.query(LocalPlr, Renderable)) {
        const linearVelocity = getPvPrimaryPart(renderable.pv)?.AssemblyLinearVelocity;
        if (linearVelocity && linearVelocity.Magnitude > 5) {
            w.insert(e, LinearVelocity({ velocity: linearVelocity }));
        } else {
            w.remove(e, LinearVelocity);
        }
    }
}

export = {
    system: linearVelocity,
    event: "onPhysics",
};
