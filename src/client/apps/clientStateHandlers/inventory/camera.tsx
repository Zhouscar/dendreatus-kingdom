import { useCamera } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import { useEnabled } from "client/apps/hooks/enability";
import useComponent from "client/apps/hooks/useComponent";
import { Transform } from "shared/components";
import deltaMult from "../deltaMult";
import { useLocalPlrE } from "client/apps/hooks/wContext";

export default function InventoryCameraHandler(props: {}) {
    const enabled = useEnabled();
    const camera = useCamera();
    const localPlrE = useLocalPlrE();
    const transform = useComponent(localPlrE, Transform);

    useEffect(() => {
        if (!enabled || transform === undefined) return;

        const connection = RunService.RenderStepped.Connect((dt) => {
            camera.CameraType = Enum.CameraType.Fixed;
            camera.Focus = transform.cf;

            const fromPos = transform.cf.Position.add(transform.cf.LookVector.mul(15));
            const newCF = CFrame.lookAt(fromPos, transform.cf.Position);

            camera.CFrame = camera.CFrame.Lerp(newCF, deltaMult(dt, 10));
        });

        return () => {
            connection.Disconnect();
        };
    }, [enabled, transform, camera]);

    return <></>;
}
