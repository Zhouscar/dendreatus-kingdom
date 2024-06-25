import { useCamera } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import { useEnabled } from "client/apps/hooks/enability";
import useComponent from "client/apps/hooks/useComponent";
import useDescendant from "client/apps/hooks/useDescendant";
import { useLocalPlrE } from "client/apps/hooks/wContext";
import { Renderable } from "shared/components";

export default function SpawningCameraHandler(props: {}) {
    const enabled = useEnabled();
    const camera = useCamera();
    const localPlrE = useLocalPlrE();
    const renderable = useComponent(localPlrE, Renderable);
    const head = useDescendant(renderable?.pv, "Head");

    useEffect(() => {
        if (!enabled || head === undefined || !head.IsA("PVInstance")) return;

        const connection = RunService.RenderStepped.Connect(() => {
            camera.CameraType = Enum.CameraType.Fixed;

            const cf = head.GetPivot();
            camera.Focus = cf;
            camera.CFrame = cf;
        });

        return () => {
            connection.Disconnect();
        };
    }, [enabled, camera, head]);

    return <></>;
}
