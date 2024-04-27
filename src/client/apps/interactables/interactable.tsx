import { AnyEntity } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import useEnabled from "../hooks/useEnabled";
import { InteractState } from "shared/features/interactables/types";
import useComponent from "../hooks/useComponent";
import { Renderable } from "shared/components";
import { Spring, useMotor } from "@rbxts/pretty-roact-hooks";
import { useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { UserInputService } from "@rbxts/services";
import { useSelector } from "@rbxts/roact-reflex";
import { selectPlayerKeybinds } from "shared/store/players/keybinds";
import { theLocalPlr } from "client/localPlr";

export default function Interactable(props: { e: AnyEntity; state: InteractState }) {
    const enabled = useEnabled();
    const keybinds = useSelector(selectPlayerKeybinds(theLocalPlr));
    const interactKey = keybinds?.interact;

    const e = props.e;
    const state = props.state;

    const renderable = useComponent(e, Renderable);
    const model = renderable?.model;

    const [transparency, setTransparency] = useMotor(state === "hidden" || !enabled ? 1 : 0);
    useEffect(() => {
        setTransparency(new Spring(state === "hidden" || !enabled ? 1 : 0));
    }, [state, enabled]);

    const canInteract = enabled && state === "showing";

    const [showMotor, setShowMotor] = useMotor(canInteract ? 1 : 0);
    useEffect(() => {
        setShowMotor(new Spring(canInteract && enabled ? 1 : 0));
    }, [canInteract]);

    const frameSize = showMotor.map((v) => new UDim2(0, 10 + v * 20, 0, 10 + v * 20));
    const textFrameSize = showMotor.map((v) => new UDim2(0, v * 200, 0, 50));
    const showTransparency = showMotor.map((v) => 1 - v);

    const [interactionName, setInteractionName] = useState("Test");
    const interactionFunction = useMutable(() => {
        print(e);
    });

    useEffect(() => {
        if (!canInteract) return;

        const connection = UserInputService.InputBegan.Connect((input, gPE) => {
            if (gPE) return;
            if (input.KeyCode.Name !== interactKey) return;
            interactionFunction.current();
        });

        return () => {
            connection.Disconnect();
        };
    }, [canInteract, interactKey]);

    return (
        <billboardgui
            Adornee={model}
            ResetOnSpawn={false}
            AlwaysOnTop={true}
            Size={new UDim2(0, 200, 0, 200)}
        >
            <textlabel
                BorderSizePixel={0}
                BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={new UDim2(0.5, 0, 0.5, 0)}
                Size={frameSize}
                BackgroundTransparency={transparency}
                TextXAlignment={"Center"}
                TextColor3={Color3.fromRGB(0, 0, 0)}
                Text={interactKey ?? ""}
                TextSize={20}
                Font={"Garamond"}
                TextTransparency={showTransparency}
            >
                <uicorner CornerRadius={new UDim(1, 0)} />
            </textlabel>
            <textlabel
                ClipsDescendants={true}
                TextXAlignment={"Center"}
                BackgroundTransparency={1}
                BorderSizePixel={0}
                Position={new UDim2(0.5, 0, 0.5, 30)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Size={textFrameSize}
                TextSize={20}
                Text={interactionName}
                Font={"Garamond"}
                TextColor3={Color3.fromRGB(255, 255, 255)}
            >
                <uistroke
                    ApplyStrokeMode={"Contextual"}
                    Thickness={1}
                    Color={Color3.fromRGB(0, 0, 0)}
                />
            </textlabel>
        </billboardgui>
    );
}
