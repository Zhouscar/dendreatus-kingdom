import Roact from "@rbxts/roact";

import Interactable from "./interactable";
import { AnyEntity } from "@rbxts/matter";
import { useSelector } from "@rbxts/roact-reflex";
import { selectInteractEs } from "client/store/ecs";

export default function Interactables(props: { enabled: boolean }) {
    const interactEs = useSelector(selectInteractEs());

    const elements: Map<string, Roact.Element> = new Map();
    interactEs.forEach((context, eStr) => {
        elements.set(
            eStr,
            <Interactable
                enabled={props.enabled}
                Key={eStr}
                e={tonumber(eStr) as AnyEntity}
                state={context[0]}
                cannotInteractReason={context[1] !== "NONE" ? context[1] : undefined}
            />,
        );
    });

    return <>{elements}</>;
}
