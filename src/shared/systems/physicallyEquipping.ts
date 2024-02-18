import { World, useEvent } from "@rbxts/matter";
import { Human, Renderable } from "shared/components";
import { PhysicallyEquipping } from "shared/components/items";

function physicallyEquipping(w: World) {
    for (const [e, renderable] of w.query(Renderable)) {
        const tool = renderable.model.FindFirstChildWhichIsA("Tool");
        if (tool) {
            w.insert(e, PhysicallyEquipping({ tool: tool }));
        } else {
            w.remove(e, PhysicallyEquipping);
        }
    }
}

export = physicallyEquipping;
