import { ComponentCreator } from "./creators";

export const Waypoint = ComponentCreator.tag("Waypoint");
export type Waypoint = ReturnType<typeof Waypoint>;

export const IsWaypoint = ComponentCreator.replicated<{ position: Vector3; name: string }>(
    "IsWaypoint",
);
export type IsWaypoint = ReturnType<typeof IsWaypoint>;

export const WaypointComponents = { IsWaypoint, Waypoint };
