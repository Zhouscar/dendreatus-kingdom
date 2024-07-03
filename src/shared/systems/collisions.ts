import { World, useEvent } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Collision, Plr, Renderable } from "shared/components";
import { getEntityFromPart } from "shared/hooks/entities";
import { HOST } from "shared/host";
import { State } from "shared/state";

function collisions(w: World, s: State) {
    for (const [e, renderable] of w.query(Renderable)) {
        if (HOST === "CLIENT") {
            const plr = w.get(e, Plr);
            if (plr?.player !== Players.LocalPlayer) continue;
        }

        renderable.pv
            .GetDescendants()
            .filter((descendant): descendant is BasePart => descendant.IsA("BasePart"))
            .forEach((part) => {
                for (const [_, hit] of useEvent(part, "Touched")) {
                    const hitE = getEntityFromPart(w, hit);
                    if (hitE === undefined) return;

                    const impulse = hit.AssemblyLinearVelocity.sub(part.AssemblyLinearVelocity);

                    w.insert(
                        e,
                        Collision({
                            impulse: impulse,
                            part: hit,
                            colliderE: hitE,
                        }),
                    );
                }
            });
    }
}

export = { event: "onPhysics", system: collisions };
