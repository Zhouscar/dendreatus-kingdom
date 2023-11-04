import { World } from "@rbxts/matter";
import { Workspace } from "@rbxts/services";
import { State } from "shared/state";

const cameraFollowPart = new Instance("Part");
cameraFollowPart.Name = "CameraFollowPart";
cameraFollowPart.CanCollide = false;
cameraFollowPart.CanTouch = false;
cameraFollowPart.Locked = true;
cameraFollowPart.Anchored = true;
cameraFollowPart.Transparency = 1;
cameraFollowPart.Massless = true;

cameraFollowPart.Parent = Workspace;

const camera = Workspace.CurrentCamera!;

const r = math.random;

function cameraStateFollow(w: World, s: State) {
    if (s.cameraState.type !== "follow") return;

    const targetPosition = s.cameraState.target?.Position;
    if (!targetPosition) return;

    cameraFollowPart.Position = cameraFollowPart.Position.Lerp(targetPosition, 0.1).add(
        new Vector3(
            r(-s.cameraShake * 100, s.cameraShake * 100) / 100,
            r(-s.cameraShake * 100, s.cameraShake * 100) / 100,
            r(-s.cameraShake * 100, s.cameraShake * 100) / 100,
        ),
    );

    camera.CameraType = Enum.CameraType.Track;
    camera.CameraSubject = cameraFollowPart;

    return;
}

export = cameraStateFollow;
