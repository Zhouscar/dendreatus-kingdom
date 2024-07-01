import Roact from "@rbxts/roact";
import { useProximityPlrEs } from "../hooks/ecsSelectors";
import ProximityPlr from "./plr";
import { EnabilityProvider } from "../contexts/enability";
import { AnyEntity } from "@rbxts/matter";

export default function ProximityPlrs(props: { enabled: boolean }) {
    const enabled = props.enabled;
    const plrEs = useProximityPlrEs();

    const elements: Roact.Element[] = [];
    plrEs.forEach((showing, eStr) => {
        elements.push(
            <EnabilityProvider value={{ enabled: showing && enabled }}>
                <ProximityPlr e={tonumber(eStr) as AnyEntity} />
            </EnabilityProvider>,
        );
    });

    return <>{elements}</>;
}
