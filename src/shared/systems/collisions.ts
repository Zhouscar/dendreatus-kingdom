import { World, useEvent } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Collision, Plr, Renderable } from "shared/components";
import { Health } from "shared/components/health";
import { getEntityFromPart } from "shared/hooks/entities";
import { State } from "shared/state";

function collisions(w: World, s: State) {
    for (const [e, renderable] of w.query(Renderable)) {
        if (s.host === "CLIENT") {
            const plr = w.get(e, Plr);
            if (plr?.player !== Players.LocalPlayer) continue;
        }

        renderable.model
            .GetDescendants()
            .filter((descendant): descendant is BasePart => descendant.IsA("BasePart"))
            .forEach((part) => {
                for (const [_, hit] of useEvent(part, "Touched")) {
                    const hitE = getEntityFromPart(w, hit);
                    if (hitE === undefined) return;

                    const force = part.AssemblyLinearVelocity.sub(
                        hit.AssemblyLinearVelocity,
                    ).Magnitude;

                    w.insert(
                        e,
                        Collision({
                            force: force,
                            part: hit,
                            colliderE: hitE,
                        }),
                    );
                }
            });
    }
}

export = { event: "onPhysics", system: collisions };
