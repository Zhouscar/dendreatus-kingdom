import Roact from "@rbxts/roact";
import { EnabilityProvider } from "../contexts/enability";

import Interactable from "./interactable";
import { useInteractEs } from "../hooks/ecsSelectors";

function App(props: {}) {
    const interactEs = useInteractEs();

    const elements: Roact.Element[] = [];
    interactEs.forEach((context, e) => {
        elements.push(
            <Interactable
                Key={e}
                e={e}
                state={context[0]}
                cannotInteractReason={context[1]}
            ></Interactable>,
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
