import { useContext, useEffect, useMutable } from "@rbxts/roact-hooked";
import { EnabilityContext } from "../contexts/enability";
import { useSpring } from "./ripple";

export function useEnabled() {
    return useContext(EnabilityContext).enabled;
}

export function useEnabledMutable() {
    const enabled = useEnabled();
    const enabledMutable = useMutable(enabled);

    useEffect(() => {
        enabledMutable.current = enabled;
    }, [enabled]);

    return enabledMutable;
}

export function useEnability() {
    const enabled = useEnabled();
    const enability = useSpring(enabled ? 1 : 0);
    return enability;
}
