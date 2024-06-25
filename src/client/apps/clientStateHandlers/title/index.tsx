import Roact from "@rbxts/roact";
import { EnabilityProvider } from "../../contexts/enability";
import EntireScreen from "../../components/entireScreen";
import { useEnability, useEnabled } from "../../hooks/enability";
import { useBindingListener, useTimeout } from "@rbxts/pretty-roact-hooks";
import { useSpring } from "../../hooks/ripple";
import TitleCardOptionButton from "../../titleCard/titleCardOptionButton";
import { routes } from "shared/network";
import useRemoteToken from "../../hooks/useRemoteToken";
import { useState } from "@rbxts/roact-hooked";
import { loopSound } from "shared/effects/sounds";
import { useClientState } from "client/apps/hooks/ecsSelectors";
import TitleCameraHandler from "./camera";

function App(props: {}) {
    const enability = useEnability();
    const enabled = useEnabled();

    const [blackScreenEnabled, setBlackScreenEnabled] = useState(true);
    const [presentsEnabled, setPresentsEnabled] = useState(false);
    const [titleEnabled, setTitleEnabled] = useState(false);
    const [optionsEnabled, setOptionsEnabled] = useState(false);

    const blackScreenSpring = useSpring(blackScreenEnabled && enabled ? 1 : 0, {
        frequency: 1,
    });
    const presentsSpring = useSpring(presentsEnabled && enabled ? 1 : 0, {
        frequency: 1,
    });
    const titleSpring = useSpring(titleEnabled && enabled ? 1 : 0, { frequency: 1 });

    const blackScreenTransparency = blackScreenSpring.map((v) => 1 - v);
    const presentsTransparency = presentsSpring.map((v) => 1 - v);
    const titleTransparency = titleSpring.map((v) => 1 - v);

    useBindingListener(titleSpring, (value) => {
        if (titleEnabled) return;
        loopSound({
            soundName: "dkTheme",
            volume: value,
        });
    });

    useTimeout(() => {
        setPresentsEnabled(true);
    }, 1);

    useTimeout(() => {
        setPresentsEnabled(false);
    }, 3);

    useTimeout(() => {
        setBlackScreenEnabled(false);
    }, 4);

    useTimeout(() => {
        setTitleEnabled(true);
        loopSound({
            soundName: "dkTheme",
            timePosition: 0,
        });
    }, 5);

    useTimeout(() => {
        setOptionsEnabled(true);
    }, 6);

    const token = useRemoteToken();

    const options = (
        <TitleCardOptionButton
            enabled={optionsEnabled && enabled}
            text={"Start"}
            onClick={() => {
                setBlackScreenEnabled(true);
                setOptionsEnabled(false);
                setPresentsEnabled(false);
                setTitleEnabled(false);

                task.delay(1, () => {
                    routes.requestSpawn.send(token);
                });
            }}
        />
    );

    return (
        <EntireScreen handleInset={true} superPositionEnability={enability} Key={"TitleCard"}>
            <frame
                Position={new UDim2(0.5, 0, 0.5, 0)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Size={new UDim2(5, 0, 5, 0)}
                BackgroundColor3={Color3.fromRGB(0, 0, 0)}
                BackgroundTransparency={blackScreenTransparency}
            >
                <textlabel
                    Position={new UDim2(0.5, 0, 0.5, 0)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Size={new UDim2(1, 0, 1, 0)}
                    BackgroundTransparency={1}
                    TextXAlignment={"Center"}
                    TextYAlignment={"Center"}
                    Text={"Golden Isles of Dendraetus Presents"}
                    TextSize={30}
                    Font={"Fantasy"}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    TextTransparency={presentsTransparency}
                    TextStrokeTransparency={1}
                />
            </frame>
            <textlabel
                Key={"Title"}
                Size={new UDim2(0, 500, 0, 100)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={new UDim2(0.5, 0, 0.1, 0)}
                BackgroundTransparency={1}
                BorderSizePixel={0}
                TextTransparency={titleTransparency}
                Font={"Fantasy"}
                TextSize={100}
                TextColor3={Color3.fromRGB(255, 255, 255)}
                Text={"Dendraetus Kingdom"}
            >
                <uistroke
                    ApplyStrokeMode={"Contextual"}
                    Color={Color3.fromRGB(0, 0, 0)}
                    Transparency={titleTransparency}
                    Thickness={2}
                ></uistroke>
            </textlabel>
            <frame
                Key={"Options"}
                Size={new UDim2(0, 200, 0, 500)}
                AnchorPoint={new Vector2(0.5, 0)}
                Position={new UDim2(0.5, 0, 0.7, 0)}
                BackgroundTransparency={1}
                BorderSizePixel={0}
            >
                <uilistlayout
                    FillDirection={"Vertical"}
                    VerticalAlignment={"Top"}
                    HorizontalAlignment={"Center"}
                    Padding={new UDim(0, 10)}
                ></uilistlayout>
                {options}
            </frame>
        </EntireScreen>
    );
}

export default function TitleHandler(props: {}) {
    const [clientState, setClientState] = useClientState();

    return (
        <EnabilityProvider value={{ enabled: clientState === "title" }}>
            <App />
            <TitleCameraHandler />
        </EnabilityProvider>
    );
}
