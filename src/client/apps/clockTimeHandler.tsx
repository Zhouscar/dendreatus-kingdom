import Roact, { Portal } from "@rbxts/roact";
import { useBinding, useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { Lighting, RunService, SoundService } from "@rbxts/services";
import { getClockTime } from "shared/hooks/clockTime";
import { useSpring } from "./hooks/ripple";
import { ClientState } from "shared/state";
import { SOUND_IDS } from "shared/features/ids/sounds";
import { adjustDefaultAtmosphere } from "shared/effects/lightings";
import { useS } from "./hooks/useW";
import LoopedSound from "./components/loopedSound";
import SpringLoopedSound from "./components/springLoopedSound";
import useSetClientState from "./hooks/useSetClientState";
import useClientState from "./hooks/useClientState";
import useClockTime from "./hooks/useClockTime";
import { useBindingListener, useLatest } from "@rbxts/pretty-roact-hooks";
import DefaultAtmosphere from "./components/defaultAtmosphere";

const e = Roact.createElement;

const DISABLED_CLIENT_STATES: ClientState[] = ["death", "spawning", "title"];

export default function ClockTimeHandler(props: {}) {
    const clockTime = useClockTime();
    const trigValue = clockTime.map((t) => (-math.cos((t / 12) * math.pi) + 1) / 2);

    const [isDay, setIsDay] = useState(clockTime.getValue() > 6 && clockTime.getValue() < 18);
    const latestIsDay = useLatest(isDay);

    const clientState = useClientState();
    const enabled = !DISABLED_CLIENT_STATES.includes(clientState);

    useBindingListener(clockTime, (ct) => {
        Lighting.ClockTime = ct;

        const sD = ct > 6 && ct < 18;
        if (sD !== latestIsDay.current) {
            setIsDay(sD);
        }
    });

    return (
        <>
            <DefaultAtmosphere
                haze={trigValue.map((v) => v * 2)}
                glare={trigValue.map((v) => v * 0.08)}
            />
            <SpringLoopedSound soundName={"dayTimeMusic"} volume={!enabled ? 0 : isDay ? 1 : 0} />
            <SpringLoopedSound soundName={"nightTimeMusic"} volume={!enabled ? 0 : isDay ? 0 : 1} />
        </>
    );
}
