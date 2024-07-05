import { useDeferEffect } from "@rbxts/pretty-roact-hooks";
import { useEffect } from "@rbxts/roact-hooked";

export default function useCoincidenceEffect(callback: () => void, dependencies: boolean[]) {
    useEffect(() => {
        let allTrue = true;
        dependencies.forEach((bool) => {
            if (!allTrue) return;
            if (!bool) allTrue = false;
        });
        if (!allTrue) return;
        callback();
    }, dependencies);
}
