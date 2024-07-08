import { World } from "@rbxts/matter";
import { getPositionerCurrent } from "shared/calculations/positioner";
import { Positioner, Renderable, Transform } from "shared/components";
import gameTime from "shared/hooks/gameTime";

function positioners(w: World) {
    const now = gameTime();

    for (const [e, positioner, transform, renderable] of w.query(
        Positioner,
        Transform,
        Renderable,
    )) {
        const position = getPositionerCurrent(positioner, now).position;
        renderable.pv.PivotTo(new CFrame(position));

        // w.insert(e, transform.patch({ cf: transform.cf.Rotation.add(position) }));
    }
}
export = positioners;
