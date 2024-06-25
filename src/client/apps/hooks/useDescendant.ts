import { useLatest } from "@rbxts/pretty-roact-hooks";
import { useEffect, useMutable, useState } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import { index } from "shared/calculations/indexing";

export default function useDescendant(instance: Instance | undefined, directory: string) {
    const [desc, setDesc] = useState(() =>
        instance !== undefined ? index(instance, directory) : undefined,
    );
    const latestDesc = useLatest(desc);

    useEffect(() => {
        const connection = RunService.Heartbeat.Connect(() => {
            let newDesc: Instance | undefined = undefined;

            if (instance !== undefined) {
                newDesc = index(instance, directory);
            }

            if (newDesc !== latestDesc.current) {
                setDesc(newDesc);
            }
        });

        return () => {
            connection.Disconnect();
        };
    }, [instance, directory]);

    return desc;
}
