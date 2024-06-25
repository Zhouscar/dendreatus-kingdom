import { useCamera } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import { useEnabled } from "client/apps/hooks/enability";
import useComponent from "client/apps/hooks/useComponent";
import useDescendant from "client/apps/hooks/useDescendant";
import { useLocalPlrE } from "client/apps/hooks/wContext";
import { Renderable } from "shared/components";
import deltaMult from "../deltaMult";

export default function DeathCameraHandler(props: {}) {
    const enabled = useEnabled();
    const camera = useCamera();
    const localPlrE = useLocalPlrE();
    const renderable = useComponent(localPlrE, Renderable);
    const head = useDescendant(renderable?.pv, "Head");

    useEffect(() => {
        if (!enabled || head === undefined || !head.IsA("PVInstance")) return;

        const connection = RunService.RenderStepped.Connect((dt) => {
            const cf = head.GetPivot();

            camera.CameraType = Enum.CameraType.Fixed;
            camera.Focus = cf;

            const fromPos = cf.Position.add(cf.LookVector.mul(15));
            const newCF = CFrame.lookAt(fromPos, cf.Position);

            camera.CFrame = camera.CFrame.Lerp(newCF, deltaMult(dt, 10));
        });

        return () => {
            connection.Disconnect();
        };
    }, [enabled, camera, head]);

    return <></>;
}
