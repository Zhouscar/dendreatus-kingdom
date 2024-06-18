import { useContext } from "@rbxts/roact-hooked";
import { EnabilityContext } from "../contexts/enability";
import { useSpring } from "./ripple";

export function useEnabled() {
    return useContext(EnabilityContext).enabled;
}

export function useEnability(instant?: boolean) {
    const enabled = useEnabled();
    const enability = useSpring(enabled ? 1 : 0, instant ? { frequency: 0.0001 } : undefined);
    return enability;
}
