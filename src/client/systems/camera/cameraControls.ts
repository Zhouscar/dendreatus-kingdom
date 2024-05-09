import { useDeltaTime, useEvent, World } from "@rbxts/matter";
import { UserInputService, Workspace } from "@rbxts/services";
import { LocalPlr, Renderable } from "shared/components";
import { State } from "shared/state";

let targetRotationX = 0;
let targetRotationY = 0;
let targetDistance = 10;

let newRotationX = 0;
let newRotationY = 0;
let newDistance = 10;

let newPosition = Vector3.zero;

const gameSettings = UserSettings().GetService("UserGameSettings");

function cameraControls(w: World, s: State) {
    const camera = Workspace.CurrentCamera;
    if (camera === undefined) return;

    const dt = useDeltaTime();

    switch (s.clientState) {
        case "game":
            (() => {
                if (s.characterCF === undefined) return;

                camera.CameraType = Enum.CameraType.Fixed;
                camera.Focus = s.characterCF;

                // TODO: raycast to shorten distance when there are obstacles

                newPosition = newPosition.Lerp(s.characterCF.Position, dt * 10);
                newDistance = newDistance + (targetDistance - newDistance) * dt * 10;
                newRotationX = newRotationX + (targetRotationX - newRotationX) * dt * 15;
                newRotationY = newRotationY + (targetRotationY - newRotationY) * dt * 15;

                const rotation = CFrame.fromEulerAnglesYXZ(newRotationX, newRotationY, 0);
                const _cf = rotation.add(newPosition.add(new Vector3(0, newDistance / 4, 0)));
                const newCF = _cf.add(_cf.LookVector.mul(-newDistance));

                camera.CFrame = camera.CFrame.Lerp(newCF, 0.5);

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
            })();
            break;
        case "death":
            (() => {
                for (const [e, localPlr, renderable] of w.query(LocalPlr, Renderable)) {
                    const head = renderable.model.FindFirstChild("Head");
                    if (head === undefined) continue;
                    if (!head.IsA("BasePart")) continue;

                    camera.CameraType = Enum.CameraType.Fixed;
                    camera.Focus = renderable.model.GetPivot();

                    const fromPos = head.Position.add(head.CFrame.LookVector.mul(15));
                    const newCF = CFrame.lookAt(fromPos, head.Position);

                    camera.CFrame = camera.CFrame.Lerp(newCF, dt * 10);
                }
            })();
            break;
        case "inventory":
            (() => {
                if (s.characterCF === undefined) return;

                camera.CameraType = Enum.CameraType.Fixed;
                camera.Focus = s.characterCF;

                const fromPos = s.characterCF.Position.add(s.characterCF.LookVector.mul(15));
                const newCF = CFrame.lookAt(fromPos, s.characterCF.Position);

                camera.CFrame = camera.CFrame.Lerp(newCF, dt * 10);
            })();
            break;
    }
}

export = { system: cameraControls, event: "onRender" };
