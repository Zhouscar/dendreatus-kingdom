import { World, useEvent } from "@rbxts/matter";
import { Human, Plr, Renderable } from "shared/components";
import { PhysicallyEquipping } from "shared/components/items";

function physicallyEquipping(w: World) {
    for (const [e, renderable, plr] of w.query(Renderable, Plr)) {
        const tool = renderable.pv?.FindFirstChildWhichIsA("Tool");
        if (tool) {
            w.insert(e, PhysicallyEquipping({ tool: tool }));
        } else {
            w.remove(e, PhysicallyEquipping);
        }
    }
}

export = physicallyEquipping;
