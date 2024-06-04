import { AnyEntity } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { useEnability, useEnabled } from "client/apps/hooks/enability";
import { CannotInteractReason } from "shared/components/interactables";
import { InteractState } from "shared/features/interactables/types";

const SLOT_LEN = 80;
const SLOT_PAD = 10;

export default function CookableItems(props: {
    e: AnyEntity;
    state: InteractState;
    cannotInteractReason?: CannotInteractReason;
}) {
    const e = props.e;
    const state = props.state;
    const cannotInteractReason = props.cannotInteractReason;

    const enabled = useEnabled();

    const showing = enabled && state === "showing" && cannotInteractReason === undefined;

    return <frame BackgroundTransparency={1}></frame>;
}
