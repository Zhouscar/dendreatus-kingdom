import { Spring, useBindingListener, useTimeout } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import EntireScreen from "../components/entireScreen";
import { Lighting, SoundService } from "@rbxts/services";
import useSuperPosition from "../hooks/useSuperPosition";
import DeathScreenOptionButton from "./deathScreenOptionButton";
import { useBinding, useState } from "@rbxts/roact-hooked";
import { Make } from "@rbxts/altmake";
import { SOUND_IDS } from "shared/features/ids/sounds";
import { useSpring } from "../hooks/ripple";
import { useEnability, useEnabled } from "../hooks/enability";
import { EnabilityProvider } from "../contexts/enability";

const blackOutAtmosphere = Make("Atmosphere", {
    Name: "BlackOut",
    Color: Color3.fromRGB(0, 0, 0),
    Density: 0,
    Haze: 0,
    Parent: Lighting,
});

const youDiedSound = Make("Sound", {
    SoundId: SOUND_IDS.youDied,
    Name: "YouDied",
    Parent: SoundService,
});

function App(props: {}) {
    const enabled = useEnabled();
    const enability = useEnability();

    const [blackOutEnabled, setBlackOutEnabled] = useState(false);
    const [titleEnabled, setTitleEnabled] = useState(false);
    const [optionsEnabled, setOptionsEnabled] = useState(false);

    const blackOutSpring = useSpring(blackOutEnabled ? 1 : 0, { frequency: 0.5 });
    const titleSpring = useSpring(titleEnabled ? 1 : 0, { frequency: 1 });
    const optionsSpring = useSpring(optionsEnabled ? 1 : 0, { frequency: 1 });

    const titleTransparency = titleSpring.map((v) => 1 - v);
    const titleSuperPosition = useSuperPosition(titleSpring, new UDim2(0.5, 0, 0.1, 0));

    const optionsSuperPosition = useSuperPosition(optionsSpring, new UDim2(0.5, 0, 0.7, 0));

    useBindingListener(blackOutSpring, (v) => {
        blackOutAtmosphere.Density = v;
        blackOutAtmosphere.Haze = v * 10;
    });

    useTimeout(
        () => {
            setBlackOutEnabled(true);
        },
        enabled ? 3 : math.huge,
    );

    useTimeout(
        () => {
            setTitleEnabled(true);
            youDiedSound.Play();
        },
        enabled ? 5 : math.huge,
    );

    useTimeout(
        () => {
            setOptionsEnabled(true);
        },
        enabled ? 6 : math.huge,
    );

    const options = (
        <DeathScreenOptionButton
            enabled={optionsEnabled && enabled}
            text={"Cry about it"}
            onClick={() => {
                print("lol");
            }}
        />
    );

    return (
        <EntireScreen superPositionEnability={enability}>
            <textlabel
                Key={"YouDied"}
                Size={new UDim2(0, 500, 0, 100)}
                AnchorPoint={new Vector2(0.5, 0.5)}
                Position={titleSuperPosition}
                BackgroundTransparency={1}
                BorderSizePixel={0}
                TextTransparency={titleTransparency}
                Font={"Fantasy"}
                TextSize={100}
                TextColor3={Color3.fromRGB(255, 0, 0)}
                Text={"You died"}
            >
                <uistroke
                    ApplyStrokeMode={"Contextual"}
                    Transparency={titleTransparency}
                    Color={Color3.fromRGB(0, 0, 0)}
                    Thickness={2}
                ></uistroke>
            </textlabel>
            <frame
                Key={"Options"}
                Size={new UDim2(0, 200, 0, 500)}
                AnchorPoint={new Vector2(0.5, 0)}
                Position={optionsSuperPosition}
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

export default function DeathScreen(props: { enabled: boolean }) {
    return (
        <EnabilityProvider value={{ enabled: props.enabled }}>
            <App></App>
        </EnabilityProvider>
    );
}
