import { useEventListener } from "@rbxts/pretty-roact-hooks";
import { useBinding } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import { getClockTime } from "shared/hooks/clockTime";

export default function useClockTime() {
    const [clockTime, setClockTime] = useBinding(getClockTime());

    useEventListener(RunService.Heartbeat, () => {
        setClockTime(getClockTime());
    });

    return clockTime;
}
