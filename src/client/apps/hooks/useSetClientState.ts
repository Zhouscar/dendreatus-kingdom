import { useCallback } from "@rbxts/roact-hooked";
import { useS } from "./useW";
import { ClientState } from "shared/state";

export default function useSetClientState() {
    const s = useS();

    const setClientState = useCallback((state: ClientState) => {
        s.clientState = state;
    }, []);

    return setClientState;
}
