import { AnyEntity, World } from "@rbxts/matter";
import Sift from "@rbxts/sift";
import { store } from "client/store";
import { IsWaypoint, Waypoint } from "shared/components/waypoints";
import { State } from "shared/state";

function waypointsEs(w: World, s: State) {
    const newWaypointEs: Map<string, IsWaypoint> = new Map();

    for (const [e, isWaypoint] of w.query(IsWaypoint)) {
        newWaypointEs.set(tostring(e), isWaypoint);
    }

    const oldWaypointEs = store.getState().ecsSlice.waypointEs;

    if (!Sift.Dictionary.equals(newWaypointEs, oldWaypointEs)) {
        store.selectWaypointEs(newWaypointEs);
    }
}

export = waypointsEs;
