import { World } from "@rbxts/matter";
import { Renderable, Transform } from "shared/components";
import { IsWaypoint, Waypoint } from "shared/components/waypoints";
import { State } from "shared/state";

function waypoints(w: World, s: State) {
    for (const [e, waypoint, transform, renderable] of w
        .query(Waypoint, Transform, Renderable)
        .without(IsWaypoint)) {
        w.insert(e, IsWaypoint({ name: renderable.pv.Name, position: transform.cf.Position }));
    }
}

export = waypoints;
