import Roact from "@rbxts/roact";
import ProximityPlr from "./proximityPlr";
import { AnyEntity } from "@rbxts/matter";
import { useSelector } from "@rbxts/roact-reflex";
import { selectProximityPlrEs } from "client/store/ecs";

export default function ProximityPlrs(props: { enabled: boolean }) {
    const enabled = props.enabled;
    const plrEs = useSelector(selectProximityPlrEs());

    const elements: Roact.Element[] = [];
    plrEs.forEach((showing, eStr) => {
        elements.push(
            <ProximityPlr enabled={showing && enabled} e={tonumber(eStr) as AnyEntity} />,
        );
    });

    return <>{elements}</>;
}
