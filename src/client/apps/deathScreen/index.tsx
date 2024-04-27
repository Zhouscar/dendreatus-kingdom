import { Spring, useBindingListener, useMotor, useTimeout } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import EntireScreen from "../components/entireScreen";
import { Lighting, SoundService } from "@rbxts/services";
import useSuperPosition from "../hooks/useSuperPosition";
import DeathScreenOptionButton from "./deathScreenOptionButton";
import { useState } from "@rbxts/roact-hooked";
import { Make } from "@rbxts/altmake";
import { SOUND_IDS } from "shared/features/ids/sounds";

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

export default function DeathScreen(props: {}) {
    const [blackOutEnability, setBlackOutEnability] = useMotor(0);
    const [titleEnability, setTitleEnability] = useMotor(0);
    const [optionsEnability, setOptionsEnability] = useMotor(0);
    const [optionsEnabled, setOptionsEnabled] = useState(false);

    const titleTransparency = titleEnability.map((v) => 1 - v);
    const titleSuperPosition = useSuperPosition(titleEnability, new UDim2(0.5, 0, 0.1, 0));

    const optionsSuperPosition = useSuperPosition(optionsEnability, new UDim2(0.5, 0, 0.7, 0));

    useBindingListener(blackOutEnability, (v) => {
        blackOutAtmosphere.Density = v;
        blackOutAtmosphere.Haze = v * 10;
    });

    useTimeout(() => {
        setBlackOutEnability(new Spring(1, { frequency: 0.5 }));
    }, 3);

    useTimeout(() => {
        setTitleEnability(new Spring(1, { frequency: 1 }));
        youDiedSound.Play();
    }, 5);

    useTimeout(() => {
        setOptionsEnability(new Spring(1, { frequency: 1 }));
        setOptionsEnabled(true);
    }, 6);

    const options = (
        <DeathScreenOptionButton
            enabled={optionsEnabled}
            text={"Cry about it"}
            onClick={() => {
                ("lol");
            }}
        ></DeathScreenOptionButton>
    );

    return (
        <EntireScreen>
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
