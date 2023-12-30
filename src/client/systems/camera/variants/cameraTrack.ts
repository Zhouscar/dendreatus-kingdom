import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { store } from "client/store";
import { selectCamera } from "client/store/camera";

const getCamera = selectCamera();

const camera = Workspace.CurrentCamera!;

const cameraTrackPart = new Instance("Part");
cameraTrackPart.Transparency = 1;
cameraTrackPart.CanCollide = false;
cameraTrackPart.Anchored = true;
cameraTrackPart.Name = "CameraTrackPart";
cameraTrackPart.Parent = Workspace;

cameraTrackPart.AncestryChanged.Connect(() => {
    warn("Don't you ever touch CameraTrackPart!!!");
    cameraTrackPart.Parent = Workspace;
});

function r(low: number, high: number) {
    return math.random(low * 1000, high * 1000) / 1000;
}

const SHAKE_INTENSITY_DELTA = 5;

function cameraTrack(w: World) {
    const cameraState = getCamera(store.getState());
    const variant = cameraState.variant;
    const shakeIntensity = cameraState.shakeIntensity;
    const lastTimeShaked = cameraState.lastTimeShaked;

    if (variant.type !== "track") return;

    camera.CameraType = Enum.CameraType.Track;
    camera.CameraSubject = cameraTrackPart;

    const targetCF = variant.target.CFrame;

    const shakeElapsed = os.clock() - lastTimeShaked;

    cameraTrackPart.CFrame = cameraTrackPart.CFrame.Lerp(targetCF, 0.2).add(
        new Vector3(r(-1, 1), r(-1, 1), r(-1, 1)).mul(
            SHAKE_INTENSITY_DELTA * math.max(shakeIntensity - shakeElapsed, 0),
        ),
    );
}

export = { system: cameraTrack, event: "onRender" };
