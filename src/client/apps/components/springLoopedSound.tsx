import { SpringOptions } from "@rbxts/ripple";
import { SoundName } from "shared/features/ids/sounds";
import LoopedSound from "./loopedSound";
import { useSpring } from "../hooks/ripple";
import Roact from "@rbxts/roact";
import useMenuOpened from "../hooks/useMenuOpened";

export default function SpringLoopedSound(props: {
    springOptions?: SpringOptions;
    soundName: SoundName;
    timePosition?: number;
    speed?: number;
    volume?: number;
}) {
    const springOptions = props.springOptions;

    const soundName = props.soundName;
    const timePosition = props.timePosition;

    const speed = props.speed ?? 1;
    const volume = props.volume ?? 1;

    const menuOpened = useMenuOpened();

    const speedSpring = useSpring(speed, springOptions);
    const volumeSpring = useSpring(menuOpened ? 0 : volume, springOptions);

    return (
        <LoopedSound
            soundName={soundName}
            timePosition={timePosition}
            speed={speedSpring}
            volume={volumeSpring}
        />
    );
}
