import { useDeferState } from "@rbxts/pretty-roact-hooks";
import { useEffect } from "@rbxts/roact-hooked";

export default function useDeferred<T>(state: T) {
    const [deferState, setDeferState] = useDeferState(state);

    useEffect(() => {
        setDeferState(state);
    }, [state]);

    return deferState;
}
