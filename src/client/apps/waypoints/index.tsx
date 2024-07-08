import { Interacting } from "shared/components/interactables";
import useComponent from "../hooks/useComponent";
import useLocalPlrE from "../hooks/useLocalPlrE";
import { useSelector } from "@rbxts/roact-reflex";
import { selectWaypointEs } from "client/store/ecs";
import { useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import useWait from "../hooks/useWait";
import Roact from "@rbxts/roact";
import Waypoint from "./waypoint";

export default function Waypoints(props: { enabled: boolean }) {
    const enabled = props.enabled;

    const localPlrE = useLocalPlrE();
    const interacting = useComponent(localPlrE, Interacting);

    const [lastTimeInteract, setLastTimeInteract] = useState(-1);

    useEffect(() => {
        if (interacting === undefined) return;
        if (interacting.interactType !== "use_waypointer") return;
        setLastTimeInteract(interacting.interactTime);
    }, [interacting]);

    const waypointTimeout = useWait(10, [lastTimeInteract]);

    const waypointEs = useSelector(selectWaypointEs());

    const elements: Map<string, Roact.Element> = new Map();
    waypointEs.forEach((isWaypoint, eStr) => {
        elements.set(
            eStr,
            <Waypoint
                Key={eStr}
                enabled={enabled && !waypointTimeout && lastTimeInteract > 0}
                isWaypoint={isWaypoint}
            />,
        );
    });

    return <>{elements}</>;
}
