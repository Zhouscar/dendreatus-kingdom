import { AnyEntity } from "@rbxts/matter";
import { useW } from "./wContext";
import { useEffect, useState } from "@rbxts/roact-hooked";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { RunService } from "@rbxts/services";
import { useLatest } from "@rbxts/pretty-roact-hooks";

export default function useComponent<T extends ComponentCtor>(e: AnyEntity | undefined, Ctor: T) {
    const w = useW();

    const [data, setData] = useState(() =>
        e !== undefined && w.contains(e) ? w.get(e, Ctor) : undefined,
    );
    const latestData = useLatest(data);

    useEffect(() => {
        const connection = RunService.Heartbeat.Connect(() => {
            let newData: ReturnType<T> | undefined = undefined;

            if (e !== undefined && w.contains(e)) {
                newData = w.get(e, Ctor);
            }

            if (newData !== latestData.current) {
                setData(newData);
            }
        });

        return () => {
            connection.Disconnect();
        };
    }, [w, e]);

    return data;
}
