import { AnyEntity } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { InteractState } from "shared/features/interactables/types";
import useComponent from "../hooks/useComponent";
import { Renderable } from "shared/components";
import { useBinding, useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { RunService, UserInputService } from "@rbxts/services";
import { useSelector } from "@rbxts/roact-reflex";
import { selectPlayerKeybinds } from "shared/store/players/keybinds";
import { theLocalPlr } from "client/localPlr";
import { CannotInteractReason, Harvestable, Interacting } from "shared/components/interactables";
import { useLocalPlrE } from "../hooks/ecsSelectors";
import useW from "../hooks/useW";
import { useEnabled } from "../hooks/enability";
import { useSpring } from "../hooks/ripple";

export default function Interactable(props: {
    e: AnyEntity;
    state: InteractState;
    cannotInteractReason?: CannotInteractReason;
}) {
    const enabled = useEnabled();
    const keybinds = useSelector(selectPlayerKeybinds(theLocalPlr));
    const interactKey = keybinds?.interact;

    const e = props.e;
    const state = props.state;
    const cannotInteractReason = props.cannotInteractReason;

    const renderable = useComponent(e, Renderable);
    const model = renderable?.model;

    const buttonTransparency = useSpring(
        state === "hidden" || !enabled || cannotInteractReason?.type === "busy"
            ? 1
            : cannotInteractReason !== undefined
              ? 0.5
              : 0,
    );

    const canInteract = enabled && state === "showing" && cannotInteractReason === undefined;

    const showSpring = useSpring(canInteract && enabled ? 1 : 0);

    const cooldownTransparency = useSpring(
        cannotInteractReason?.type === "cooldown" && state === "showing" ? 0 : 1,
    );

    const [cooldownPerc, setCooldownPerc] = useBinding(0);
    useEffect(() => {
        if (cannotInteractReason?.type !== "cooldown") {
            setCooldownPerc(0);
            return;
        }

        const connection = RunService.Heartbeat.Connect(() => {
            const timeLeft = tick() - cannotInteractReason.startTime;
            const perc = timeLeft / cannotInteractReason.duration;

            if (perc !== perc || perc < 0 || perc > 1) return;

            setCooldownPerc(perc);
        });
        return () => {
            connection.Disconnect();
        };
    }, [cannotInteractReason]);

    const frameSize = showSpring.map((v) => new UDim2(0, 10 + v * 20, 0, 10 + v * 20));
    const textFrameSize = showSpring.map((v) => new UDim2(0, v * 200, 0, 50));
    const showTransparency = showSpring.map((v) => 1 - v);

    const [interactionName, setInteractionName] = useState("");
    const interactionFunction = useMutable(() => {
        print("Hi");
    });

    // components
    const harvestable = useComponent(e, Harvestable);

    // \components

    useEffect(() => {
        if (!canInteract || !enabled) return;

        const connection = UserInputService.InputBegan.Connect((input, gPE) => {
            if (gPE) return;
            if (input.KeyCode.Name !== interactKey) return;
            interactionFunction.current();
        });

        return () => {
            connection.Disconnect();
        };
    }, [canInteract, interactKey, enabled]);

    const localPlrE = useLocalPlrE();
    const w = useW();

    useEffect(() => {
        if (harvestable !== undefined) {
            setInteractionName("Harvest");
            interactionFunction.current = () => {
                if (localPlrE === undefined) return;
                w.insert(localPlrE, Interacting({ interactE: e, interactType: "harvest" }));
            };
        } else {
            setInteractionName("");
            interactionFunction.current = () => {
                print("Hi");
            };
        }
    }, [harvestable, e, localPlrE]);

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
                BackgroundTransparency={buttonTransparency}
                TextXAlignment={"Center"}
                TextColor3={Color3.fromRGB(0, 0, 0)}
                Text={interactKey ?? ""}
                TextSize={20}
                Font={"Garamond"}
                TextTransparency={showTransparency}
            >
                <uicorner CornerRadius={new UDim(1, 0)} />
            </textlabel>
            <frame
                BorderSizePixel={0}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={new UDim2(0.5, 0, 0.5, 20)}
                Size={new UDim2(0, 100, 0, 1)}
                BackgroundTransparency={cooldownTransparency}
            >
                <frame
                    Size={cooldownPerc.map((perc) => new UDim2(perc, 0, 1, 0))}
                    BackgroundColor3={Color3.fromRGB(255, 255, 255)}
                    BorderSizePixel={0}
                    BackgroundTransparency={cooldownTransparency}
                ></frame>
            </frame>
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
