import { useDeltaTime, useEvent, World } from "@rbxts/matter";
import { GuiService, UserInputService, Workspace } from "@rbxts/services";
import { LocalPlr, Renderable, TitleCamPart, Transform } from "shared/components";
import { State } from "shared/state";

let titleRotation = CFrame.identity;

let targetRotationX = 0;
let targetRotationY = 0;
let targetDistance = 10;

let newRotationX = 0;
let newRotationY = 0;
let newDistance = 0;

let newPosition = Vector3.zero;

const gameSettings = UserSettings().GetService("UserGameSettings");

const raycastParams = new RaycastParams();
raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
raycastParams.IgnoreWater = true;
raycastParams.RespectCanCollide = true;

function deltaMult(dt: number, mult: number) {
    return math.clamp(dt * mult, 0, 0.5);
}

function cameraControls(w: World, s: State) {
    const camera = Workspace.CurrentCamera;
    if (camera === undefined) return;

    const dt = useDeltaTime();

    switch (s.clientState) {
        case "game":
            for (const [e, localPlr, transform] of w.query(LocalPlr, Transform)) {
                camera.CameraType = Enum.CameraType.Fixed;
                camera.Focus = transform.cf;

                newPosition = newPosition.Lerp(transform.cf.Position, deltaMult(dt, 10));
                newDistance = newDistance + (targetDistance - newDistance) * deltaMult(dt, 10);
                newRotationX = newRotationX + (targetRotationX - newRotationX) * deltaMult(dt, 15);
                newRotationY = newRotationY + (targetRotationY - newRotationY) * deltaMult(dt, 15);

                let character: PVInstance | undefined = undefined;
                for (const [e, localPlr, renderable] of w.query(LocalPlr, Renderable)) {
                    character = renderable.pv;
                }
                if (character === undefined) return;
                raycastParams.FilterDescendantsInstances = [character];

                const now = os.clock();
                // const shakeRotationX = 5 * s.cameraShake * math.noise(10, now * 200);
                // const shakeRotationY = 5 * s.cameraShake * math.noise(20, now * 200);
                // const shakeRotationZ = 5 * s.cameraShake * math.noise(30, now * 200);

                const shakeRotationX = s.cameraShake * math.random(-1, 1);
                const shakeRotationY = s.cameraShake * math.random(-1, 1);
                const shakeRotationZ = s.cameraShake * math.random(-1, 1);

                const rotation = CFrame.fromEulerAnglesYXZ(
                    newRotationX + shakeRotationX,
                    newRotationY + shakeRotationY,
                    shakeRotationZ,
                );
                const _cf = rotation.add(newPosition.add(new Vector3(0, newDistance / 4, 0)));

                let correctedDistance = newDistance;
                const result = Workspace.Raycast(
                    _cf.Position,
                    _cf.LookVector.mul(-(newDistance + 2)),
                    raycastParams,
                );
                if (result !== undefined) {
                    correctedDistance = math.max(
                        result.Position.sub(_cf.Position).Magnitude - 2,
                        2,
                    );
                }

                const newCF = _cf.add(_cf.LookVector.mul(-correctedDistance));

                camera.CFrame = newCF;

                for (const [_, input, gPE] of useEvent(UserInputService, "InputChanged")) {
                    if (gPE) continue;
                    if (input.UserInputType === Enum.UserInputType.MouseMovement) {
                        const diffX = input.Delta.X;
                        const diffY = input.Delta.Y;
                        targetRotationX -= (diffY / 8) * gameSettings.MouseSensitivity;
                        targetRotationY -= (diffX / 8) * gameSettings.MouseSensitivity;

                        targetRotationX = math.clamp(
                            targetRotationX,
                            -(math.pi - 0.5) / 2,
                            (math.pi - 0.5) / 2,
                        );
                    } else if (input.UserInputType === Enum.UserInputType.MouseWheel) {
                        targetDistance += input.Position.Z * -5;
                        targetDistance = math.clamp(targetDistance, 5, 50);
                    }
                }
            }
            break;
        case "death":
            for (const [e, localPlr, renderable, transform] of w.query(
                LocalPlr,
                Renderable,
                Transform,
            )) {
                const head = renderable.pv.FindFirstChild("Head");
                if (head === undefined) continue;
                if (!head.IsA("BasePart")) continue;

                camera.CameraType = Enum.CameraType.Fixed;
                camera.Focus = transform.cf;

                const fromPos = head.Position.add(head.CFrame.LookVector.mul(15));
                const newCF = CFrame.lookAt(fromPos, head.Position);

                camera.CFrame = camera.CFrame.Lerp(newCF, deltaMult(dt, 10));
            }
            break;
        case "inventory":
            for (const [e, localPlr, transform] of w.query(LocalPlr, Transform)) {
                camera.CameraType = Enum.CameraType.Fixed;
                camera.Focus = transform.cf;

                const fromPos = transform.cf.Position.add(transform.cf.LookVector.mul(15));
                const newCF = CFrame.lookAt(fromPos, transform.cf.Position);

                camera.CFrame = camera.CFrame.Lerp(newCF, deltaMult(dt, 10));
            }
            break;
        case "title":
            for (const [e, titleCamPart, renderable] of w.query(TitleCamPart, Renderable)) {
                if (renderable.pv.IsA("BasePart")) {
                    renderable.pv.Transparency = 1;
                }
            }

            for (const [e, titleCamPart, transform] of w.query(TitleCamPart, Transform)) {
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

                titleRotation = titleRotation.Lerp(targetRotation, 0.2);

                camera.CFrame = transform.cf.mul(titleRotation);
            }
            break;
        case "spawning":
            for (const [e, renderable, localPlr] of w.query(Renderable, LocalPlr)) {
                camera.CameraType = Enum.CameraType.Fixed;
                camera.Focus = camera.CFrame;

                const head = renderable.pv.FindFirstChild("Head");
                if (head === undefined || !head.IsA("PVInstance")) continue;

                camera.CFrame = head.GetPivot();

                newPosition = head.GetPivot().Position;
            }
            break;
    }
}

export = { system: cameraControls, event: "onRender" };
