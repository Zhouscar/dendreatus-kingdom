import Roact from "@rbxts/roact";
import { CannotInteractReason, Cookable } from "shared/components/interactables";
import { InteractState } from "shared/features/interactables/types";
import CookableItemFragments from "./itemFragments";

const SLOT_LEN = 50;
const SLOT_PAD = 5;

export default function CookableItems(props: {
    cookable: Cookable;
    state: InteractState;
    cannotInteractReason?: CannotInteractReason;
}) {
    const cookable = props.cookable;
    const state = props.state;
    const cannotInteractReason = props.cannotInteractReason;

    const showing = state === "showing" && cannotInteractReason === undefined;

    return (
        <frame
            BackgroundTransparency={1}
            Size={new UDim2(0, SLOT_LEN * 3 + SLOT_PAD * 4, 0, SLOT_LEN + SLOT_PAD * 2)}
            Position={new UDim2(0.5, 0, 0.5, -20)}
            AnchorPoint={new Vector2(0.5, 1)}
        >
            <CookableItemFragments showing={showing} cookable={cookable} />
            <uigridlayout
                VerticalAlignment={"Center"}
                HorizontalAlignment={"Center"}
                CellSize={new UDim2(0, SLOT_LEN, 0, SLOT_LEN)}
                CellPadding={new UDim2(0, SLOT_PAD, 0, SLOT_PAD)}
                SortOrder={"LayoutOrder"}
            />
        </frame>
    );
}
