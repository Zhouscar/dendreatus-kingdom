import { useCamera } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect, useMutable } from "@rbxts/roact-hooked";
import { GuiService, RunService, UserInputService } from "@rbxts/services";
import { useEnabled } from "client/apps/hooks/enability";
import useComponent from "client/apps/hooks/useComponent";
import useSingletonE from "client/apps/hooks/useSingletonE";
import { Renderable, TitleCamPart, Transform } from "shared/components";

export default function TitleCameraHandler(props: {}) {
    const enabled = useEnabled();

    const camera = useCamera();

    const titleCamPartE = useSingletonE(TitleCamPart);
    const transform = useComponent(titleCamPartE, Transform);
    const renderable = useComponent(titleCamPartE, Renderable);

    const titleRotationMutable = useMutable(CFrame.identity);

    useEffect(() => {
        if (renderable === undefined || !renderable.pv.IsA("BasePart")) return;

        renderable.pv.Transparency = 1;
    }, [renderable]);

    useEffect(() => {
        if (!enabled || transform === undefined) return;

        const connection = RunService.RenderStepped.Connect(() => {
            camera.CameraType = Enum.CameraType.Fixed;
            camera.Focus = transform.cf;

            const center = new Vector2(
                camera.ViewportSize.X / 2,
                camera.ViewportSize.Y / 2 - GuiService.GetGuiInset()[0].Y / 2,
            );

            const location = UserInputService.GetMouseLocation().sub(center);

            const rotationX = -location.Y / 1000;
            const rotationY = -location.X / 1000;

            const targetRotation = CFrame.fromEulerAnglesYXZ(rotationX, rotationY, 0);

            titleRotationMutable.current = titleRotationMutable.current.Lerp(targetRotation, 0.2);

            camera.CFrame = transform.cf.mul(titleRotationMutable.current);
        });

        return () => {
            connection.Disconnect();
        };
    }, [enabled, transform]);

    return <></>;
}
