import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { store } from "client/store";
import { selectCamera } from "client/store/camera";

const getCamera = selectCamera();

const camera = Workspace.CurrentCamera!;

function r(low: number, high: number) {
    return math.random(low * 1000, high * 1000) / 1000;
}

const SHAKE_INTENSITY_DELTA = 2;

function cameraView(w: World) {
    const cameraState = getCamera(store.getState());
    const variant = cameraState.variant;
    const shakeIntensity = cameraState.shakeIntensity;
    const lastTimeShaked = cameraState.lastTimeShaked;

    if (variant.type !== "view") return;

    camera.CameraSubject = undefined;
    camera.CameraType = Enum.CameraType.Fixed;

    const viewVector = variant.viewVector;

    const targetCF = variant.target.CFrame;
    const targetPosition = targetCF.Position;
    const goalPosition = targetPosition
        .add(targetCF.LookVector.mul(viewVector.look))
        .add(targetCF.RightVector.mul(viewVector.right))
        .add(targetCF.UpVector.mul(viewVector.up));

    const shakeElapsed = tick() - lastTimeShaked;

    camera.CFrame = new CFrame(goalPosition, targetPosition).add(
        new Vector3(r(-1, 1), r(-1, 1), r(-1, 1)).mul(
            SHAKE_INTENSITY_DELTA * math.max(shakeIntensity - shakeElapsed, 0),
        ),
    );
}

export = { system: cameraView, event: "onRender" };
