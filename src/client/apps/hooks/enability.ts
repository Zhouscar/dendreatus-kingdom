import { useContext } from "@rbxts/roact-hooked";
import { EnabilityContext } from "../contexts/enability";
import { useSpring } from "./ripple";

export function useEnabled() {
    return useContext(EnabilityContext).enabled;
}

export function useEnability() {
    const enabled = useEnabled();
    const enability = useSpring(enabled ? 1 : 0);
    return enability;
}
