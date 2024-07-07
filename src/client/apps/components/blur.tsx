import { useBindingListener } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useMemo } from "@rbxts/roact-hooked";
import { adjustBlur } from "shared/effects/lightings";
import { newGuid } from "shared/features/guidUtils";

export default function Blur(props: { size?: number | Roact.Binding<number> }) {
    const name = useMemo(() => newGuid(), []);

    const size = props.size;

    useBindingListener(size, (v) => {
        adjustBlur(name, v ?? 0);
    });

    return <></>;
}
