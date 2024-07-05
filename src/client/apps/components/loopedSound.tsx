import { useBindingListener } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect } from "@rbxts/roact-hooked";
import { loopSound } from "shared/effects/sounds";
import { SoundName } from "shared/features/ids/sounds";

export default function LoopedSound(props: {
    soundName: SoundName;
    timePosition?: number;
    speed?: number | Roact.Binding<number>;
    volume?: number | Roact.Binding<number>;
}) {
    const soundName = props.soundName;
    const timePosition = props.timePosition;
    const speed = props.speed;
    const volume = props.volume;

    useEffect(() => {
        loopSound({ soundName: soundName, timePosition: timePosition });
    }, [timePosition]);

    useBindingListener(speed, (v) => {
        loopSound({ soundName: soundName, speed: v });
    });

    useBindingListener(volume, (v) => {
        loopSound({ soundName: soundName, volume: v });
    });

    return <></>;
}
