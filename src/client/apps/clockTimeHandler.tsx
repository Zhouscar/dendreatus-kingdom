import Roact, { Portal } from "@rbxts/roact";
import { useBinding, useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { Lighting, RunService, SoundService } from "@rbxts/services";
import { getClockTime } from "shared/hooks/clockTime";
import { useSpring } from "./hooks/ripple";
import { useClientState } from "./hooks/ecsSelectors";
import { ClientState } from "shared/state";
import { SOUND_IDS } from "shared/features/ids/sounds";
import { adjustDefaultAtmosphere } from "shared/effects/lightings";

const e = Roact.createElement;

const DISABLED_CLIENT_STATES: ClientState[] = ["death", "spawning", "title"];

export default function ClockTimeHandler(props: {}) {
    const [clockTime, setClockTime] = useBinding(getClockTime());
    const [isDayTime, setIsDayTime] = useState(getClockTime() > 6 && getClockTime() < 18);

    const isDayTimeMutable = useMutable(getClockTime() > 6 && getClockTime() < 18);

    const clientState = useClientState();

    const daySpring = useSpring(
        isDayTimeMutable.current && !DISABLED_CLIENT_STATES.includes(clientState) ? 1 : 0,
        {
            frequency: 5,
        },
    );
    const nightSpring = useSpring(
        !isDayTimeMutable.current && !DISABLED_CLIENT_STATES.includes(clientState) ? 1 : 0,
        {
            frequency: 5,
        },
    );

    useEffect(() => {
        const connection = RunService.Heartbeat.Connect(() => {
            const ct = getClockTime();
            setClockTime(ct);

            const isDT = ct > 6 && ct < 18;
            if (isDayTimeMutable.current !== isDT) {
                isDayTimeMutable.current = isDT;
                setIsDayTime(isDT);
            }

            const trigValue = (-math.cos((ct / 12) * math.pi) + 1) / 2;

            Lighting.ClockTime = ct;

            adjustDefaultAtmosphere({
                Haze: trigValue * 2,
                Glare: trigValue * 0.08,
            });
        });

        return () => {
            connection.Disconnect();
        };
    }, []);

    return (
        <>
            <Portal target={SoundService}>
                {e("Sound", {
                    Name: "DayTimeMusic",
                    SoundId: SOUND_IDS.dayTimeMusic,
                    Volume: daySpring,
                    Playing: true,
                    Looped: true,
                })}
                {e("Sound", {
                    Name: "NightTimeMusic",
                    SoundId: SOUND_IDS.nightTimeMusic,
                    Volume: nightSpring,
                    Playing: true,
                    Looped: true,
                })}
            </Portal>
        </>
    );
}
