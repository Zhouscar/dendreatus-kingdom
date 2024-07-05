import { useEventListener, useLatest } from "@rbxts/pretty-roact-hooks";
import { useS } from "./useW";
import { RunService } from "@rbxts/services";
import { useState } from "@rbxts/roact-hooked";
import { ClientState } from "shared/state";

export default function useClientState() {
    const s = useS();

    const [clientState, setClientState] = useState<ClientState>("title");
    const latestClientState = useLatest(clientState);

    useEventListener(RunService.Heartbeat, () => {
        if (s.clientState !== latestClientState.current) {
            setClientState(s.clientState);
        }
    });

    return clientState;
}
