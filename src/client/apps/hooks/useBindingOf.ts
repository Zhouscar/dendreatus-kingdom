import { useBinding, useEffect } from "@rbxts/roact-hooked";

export default function useBindingOf<T>(state: T) {
    const [binding, setBinding] = useBinding(state);

    useEffect(() => {
        setBinding(state);
    }, [state]);

    return binding;
}
