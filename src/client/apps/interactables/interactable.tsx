import { AnyEntity } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { InteractState } from "shared/features/interactables/types";
import useComponent from "../hooks/useComponent";
import { Animatable, Renderable, Sound, Transform } from "shared/components";
import {
    useBinding,
    useCallback,
    useEffect,
    useMemo,
    useMutable,
    useState,
} from "@rbxts/roact-hooked";
import { Players, RunService, UserInputService } from "@rbxts/services";
import { useSelector } from "@rbxts/roact-reflex";
import { selectPlayerKeybinds } from "shared/store/players/keybinds";
import { theLocalPlr } from "client/localPlr";
import {
    CannotInteractReason,
    Cookable,
    Craftable,
    DoorLike,
    Harvestable,
    Interacted,
} from "shared/components/interactables";
import useW from "../hooks/useW";
import { useSpring } from "../hooks/ripple";
import { DroppedItem } from "shared/components/items";
import CookableItems from "./misc/cookableItems";
import CraftableItems from "./misc/craftableItems";
import { ReadingSign, Sign } from "shared/components/signs";
import useLocalPlrE from "../hooks/useLocalPlrE";
import Transition from "../components/transition";
import useCoincidenceEffect from "../hooks/useCoincidenceEffect";
import { useLatest } from "@rbxts/pretty-roact-hooks";
import { startAnimation } from "shared/effects/animations";

export default function Interactable(props: {
    enabled: boolean;
    e: AnyEntity;
    state: InteractState;
    cannotInteractReason?: CannotInteractReason;
}) {
    const enabled = props.enabled;
    const keybinds = useSelector(selectPlayerKeybinds(theLocalPlr));
    const interactKey = keybinds?.interact;

    const e = props.e;
    const state = props.state;
    const cannotInteractReason = props.cannotInteractReason;

    const renderable = useComponent(e, Renderable);
    const model = renderable?.pv;

    const buttonTransparency = useSpring(
        state === "hidden" ? 1 : cannotInteractReason !== undefined ? 0.5 : 0,
    );

    const canInteract = enabled && state === "showing" && cannotInteractReason === undefined;

    const showing = canInteract;
    const showSpring = useSpring(showing ? 1 : 0);

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
    const buttonColor = showSpring.map((v) => new Color3(1 - v, 1 - v, 1 - v));

    const [interactionName, setInteractionName] = useState("");
    const interactionFunction = useMutable(() => {});

    // components
    const harvestable = useComponent(e, Harvestable);
    const droppedItem = useComponent(e, DroppedItem);
    const cookable = useComponent(e, Cookable);
    const craftable = useComponent(e, Craftable);
    const doorLike = useComponent(e, DoorLike);
    const sign = useComponent(e, Sign);

    // \components

    const clicked = useCallback(() => {
        interactionFunction.current();
    }, []);

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

    const cf = useComponent(localPlrE, Transform)?.cf;
    const latestCf = useLatest(cf);

    const animator = useComponent(localPlrE, Animatable)?.animator;
    const latestAnimator = useLatest(animator);

    useEffect(() => {
        if (!w.contains(localPlrE) || harvestable === undefined) return;
        setInteractionName("Harvest");
        interactionFunction.current = () => {
            w.insert(
                e,
                Interacted({
                    player: Players.LocalPlayer,
                    interactType: "harvest",
                    interactTime: tick(),
                }),
            );

            if (latestCf.current !== undefined) {
                w.spawn(Sound({ context: { soundName: "harvest" }, cf: latestCf.current }));
            }

            if (latestAnimator.current !== undefined) {
                startAnimation(latestAnimator.current, "harvest", "Action2");
            }
        };
    }, [w, localPlrE, harvestable]);

    useEffect(() => {
        if (!w.contains(localPlrE) || droppedItem === undefined) return;
        setInteractionName("Pick Up");
        interactionFunction.current = () => {
            w.insert(
                e,
                Interacted({
                    player: Players.LocalPlayer,
                    interactType: "pickup",
                    interactTime: tick(),
                }),
            );

            if (latestAnimator.current !== undefined) {
                startAnimation(latestAnimator.current, "harvest", "Action2");
            }
        };
    }, [w, localPlrE, droppedItem]);

    useEffect(() => {
        if (!w.contains(localPlrE) || cookable === undefined) return;
        setInteractionName("Place Item");
        interactionFunction.current = () => {
            w.insert(
                e,
                Interacted({
                    player: Players.LocalPlayer,
                    interactType: "place_item",
                    interactTime: tick(),
                }),
            );

            if (cf !== undefined) {
                w.spawn(Sound({ context: { soundName: "placeItem" }, cf: cf }));
            }
        };
    }, [w, localPlrE, cookable]);

    useEffect(() => {
        if (!w.contains(localPlrE) || craftable === undefined) return;
        setInteractionName("Place Item");
        interactionFunction.current = () => {
            w.insert(
                e,
                Interacted({
                    player: Players.LocalPlayer,
                    interactType: "place_item",
                    interactTime: tick(),
                }),
            );

            if (cf !== undefined) {
                w.spawn(Sound({ context: { soundName: "placeItem" }, cf: cf }));
            }
        };
    }, [w, localPlrE, craftable]);

    useEffect(() => {
        if (!w.contains(localPlrE) || doorLike === undefined) return;
        if (doorLike.state === "opened") {
            setInteractionName("Close");
            interactionFunction.current = () => {
                w.insert(
                    e,
                    Interacted({
                        player: Players.LocalPlayer,
                        interactType: "door_close",
                        interactTime: tick(),
                    }),
                );
            };
        } else if (doorLike.state === "closed") {
            setInteractionName("Open");
            interactionFunction.current = () => {
                w.insert(
                    e,
                    Interacted({
                        player: Players.LocalPlayer,
                        interactType: "door_open",
                        interactTime: tick(),
                    }),
                );
            };
        }
    }, [w, localPlrE, doorLike]);

    useEffect(() => {
        if (!w.contains(localPlrE) || sign === undefined) return;
        setInteractionName("Read");
        interactionFunction.current = () => {
            if (w.contains(localPlrE)) {
                w.insert(localPlrE, ReadingSign({ signComponentName: sign.signComponentName }));
            }
            w.insert(
                e,
                Interacted({
                    player: Players.LocalPlayer,
                    interactType: "read_sign",
                    interactTime: tick(),
                }),
            );
        };
    }, [w, localPlrE, sign]);

    return (
        <billboardgui
            Adornee={model}
            ResetOnSpawn={false}
            AlwaysOnTop={true}
            Size={new UDim2(0, 200, 0, 200)}
            Active={showing}
            ZIndexBehavior={"Sibling"}
        >
            <Transition enabled={enabled}>
                {cookable !== undefined && (
                    <CookableItems
                        cookable={cookable}
                        state={state}
                        cannotInteractReason={cannotInteractReason}
                    />
                )}
                {craftable !== undefined && (
                    <CraftableItems
                        craftable={craftable}
                        state={state}
                        cannotInteractReason={cannotInteractReason}
                    />
                )}
                <textbutton
                    Active={showing}
                    AutoButtonColor={false}
                    Event={{ MouseButton1Click: showing ? clicked : undefined }}
                    BorderSizePixel={0}
                    BackgroundColor3={buttonColor}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    Size={frameSize}
                    BackgroundTransparency={buttonTransparency}
                    TextXAlignment={"Center"}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    Text={interactKey ?? ""}
                    TextStrokeColor3={Color3.fromRGB(0, 0, 0)}
                    TextStrokeTransparency={showTransparency}
                    TextSize={20}
                    Font={"Fantasy"}
                    TextTransparency={showTransparency}
                >
                    <uicorner CornerRadius={new UDim(1, 0)} />
                </textbutton>
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
            </Transition>
        </billboardgui>
    );
}
