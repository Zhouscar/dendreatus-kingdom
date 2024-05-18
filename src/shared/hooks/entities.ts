import { AnyEntity, World } from "@rbxts/matter";
import { Renderable } from "shared/components";

export function getEntityFromPart(w: World, part: BasePart): AnyEntity | undefined {
    for (const [e, renderable] of w.query(Renderable)) {
        if (part.IsDescendantOf(renderable.pv)) return e;
    }
    return undefined;
}
