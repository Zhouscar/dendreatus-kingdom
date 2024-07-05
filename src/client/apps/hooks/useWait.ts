import {
    useBindingListener,
    useDebounceEffect,
    useLatest,
    useLifetime,
} from "@rbxts/pretty-roact-hooks";
import { useEffect, useState } from "@rbxts/roact-hooked";

export default function useWait(wait: number, dependencies?: unknown[]) {
    const [passed, setPassed] = useState(false);

    useEffect(() => {
        setPassed(false);
    }, [wait, ...(dependencies ?? [])]);

    useDebounceEffect(
        () => {
            setPassed(true);
        },
        [wait, ...(dependencies ?? [])],
        { wait: wait },
    );

    return passed;
}
