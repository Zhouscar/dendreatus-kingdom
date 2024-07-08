import { useThrottle, World } from "@rbxts/matter";
import { Animatable, Human, LocalPlr, Plr, Renderable } from "shared/components";
import { hasComponents } from "shared/hooks/components";

function humanSetup(w: World) {
    for (const [e, renderable] of w.query(Renderable)) {
        if (hasComponents(w, e, Plr)) {
            const pv = renderable.pv;
            const humanoid = pv.FindFirstChildWhichIsA("Humanoid");
            if (!humanoid) continue;
            w.insert(e, Human({ humanoid: humanoid }));
            const animator = humanoid.FindFirstChildWhichIsA("Animator");
            if (!animator) continue;
            w.insert(e, Animatable({ animator: animator }));
        }
    }

    for (const [e, renderableRecord] of w.queryChanged(Renderable)) {
        if (!w.contains(e)) continue;
        if (renderableRecord.new === undefined && hasComponents(w, e, Plr)) {
            w.remove(e, Animatable, Human);
        }
    }
}

export = humanSetup;
