import { AnyEntity } from "@rbxts/matter";
import { useW } from "./wContext";
import { useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { RunService } from "@rbxts/services";
import { useLatest } from "@rbxts/pretty-roact-hooks";

export default function useSingletonE<T extends ComponentCtor>(Ctor: T) {
    const w = useW();

    const [e, setE] = useState<AnyEntity | undefined>(undefined);
    const latestE = useLatest(e);

    useEffect(() => {
        const connection = RunService.Heartbeat.Connect(() => {
            let newE: AnyEntity | undefined = undefined;

            for (const [entity, _] of w.query(Ctor)) {
                newE = entity;
                break;
            }

            if (newE !== latestE.current) {
                setE(newE);
            }
        });

        return () => {
            connection.Disconnect();
        };
    }, [w, e]);

    return e;
}
