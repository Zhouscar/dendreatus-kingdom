import Roact from "@rbxts/roact";
import { EnabilityProvider } from "../contexts/enability";

import Interactable from "./interactable";
import { useInteractEs } from "../hooks/ecsSelectors";
import { AnyEntity } from "@rbxts/matter";

function App(props: {}) {
    const interactEs = useInteractEs();

    const elements: Map<string, Roact.Element> = new Map();
    interactEs.forEach((context, eStr) => {
        elements.set(
            eStr,
            <Interactable
                Key={eStr}
                e={tonumber(eStr) as AnyEntity}
                state={context[0]}
                cannotInteractReason={context[1] !== "NONE" ? context[1] : undefined}
            />,
        );
    });

    return <>{elements}</>;
}

export default function Interactables(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App />
        </EnabilityProvider>
    );
}
