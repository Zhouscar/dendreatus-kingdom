import Roact from "@rbxts/roact";
import useW from "../hooks/useW";
import { EnabilityProvider } from "../contexts/enability";
import { Renderable } from "shared/components";

import Interactable from "./interactable";
import { useInteractEs } from "../hooks/ecsSelectors";

function App(props: {}) {
    const interactEs = useInteractEs();

    const elements: Roact.Element[] = [];
    interactEs.forEach((state, e) => {
        elements.push(<Interactable Key={e} e={e} state={state}></Interactable>);
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
