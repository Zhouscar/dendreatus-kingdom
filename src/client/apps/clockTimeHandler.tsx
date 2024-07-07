import Roact from "@rbxts/roact";
import { useMemo, useState } from "@rbxts/roact-hooked";
import { Lighting } from "@rbxts/services";
import { ClientState } from "shared/state";
import SpringLoopedSound from "./components/springLoopedSound";
import useClientState from "./hooks/useClientState";
import useClockTime from "./hooks/useClockTime";
import { useBindingListener, useLatest } from "@rbxts/pretty-roact-hooks";
import Atmosphere from "./components/atmosphere";

const asClientStates = (value: ClientState[]) => value;

export default function ClockTimeHandler(props: {}) {
    const clockTime = useClockTime();
    const trigValue = clockTime.map((t) => (-math.cos((t / 12) * math.pi) + 1) / 2);

    const [isDay, setIsDay] = useState(clockTime.getValue() > 6 && clockTime.getValue() < 18);
    const latestIsDay = useLatest(isDay);

    const clientState = useClientState();

    const soundEnabled = useMemo(
        () => !asClientStates(["death", "spawning", "title"]).includes(clientState),
        [clientState],
    );

    useBindingListener(clockTime, (ct) => {
        Lighting.ClockTime = ct;

        const sD = ct > 6 && ct < 18;
        if (sD !== latestIsDay.current) {
            setIsDay(sD);
        }
    });

    return (
        <>
            <Atmosphere
                enabled={clientState !== "death"}
                useDefaultAtmosphereProps={true}
                haze={trigValue.map((v) => v * 2)}
                glare={trigValue.map((v) => v * 0.08)}
            />
            <SpringLoopedSound
                soundName={"dayTimeMusic"}
                volume={!soundEnabled ? 0 : isDay ? 1 : 0}
            />
            <SpringLoopedSound
                soundName={"nightTimeMusic"}
                volume={!soundEnabled ? 0 : isDay ? 0 : 1}
            />
        </>
    );
}
