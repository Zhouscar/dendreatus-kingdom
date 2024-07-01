import { AnyComponent, AnyEntity } from "@rbxts/matter";
import useW from "./useW";
import { useBinding, useEffect, useMutable, useRef, useState } from "@rbxts/roact-hooked";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { RunService } from "@rbxts/services";
import { useLatest } from "@rbxts/pretty-roact-hooks";

export default function useComponent<T extends ComponentCtor>(e: AnyEntity, Ctor: T) {
    const w = useW();

    const [data, setData] = useState(() => (w.contains(e) ? w.get(e, Ctor) : undefined));
    const lastestData = useLatest(data);

    useEffect(() => {
        const connection = RunService.Heartbeat.Connect(() => {
            let newData: ReturnType<T> | undefined = undefined;

            if (w.contains(e)) {
                newData = w.get(e, Ctor);
            }

            if (newData !== lastestData.current) {
                setData(newData);
            }
        });

        return () => {
            connection.Disconnect();
        };
    }, [w, e]);

    return data;
}
