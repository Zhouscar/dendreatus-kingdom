import Roact from "@rbxts/roact";

import Interactable from "./interactable";
import { useInteractEs } from "client/apps/hooks/ecsSelectors";

export default function Interactables(props: {}) {
    const interactEs = useInteractEs();

    const elements: Roact.Element[] = [];
    interactEs.forEach((context, e) => {
        elements.push(
            <Interactable
                Key={e}
                e={e}
                state={context[0]}
                cannotInteractReason={context[1] !== "NONE" ? context[1] : undefined}
            />,
        );
    });

    return <>{elements}</>;
}
