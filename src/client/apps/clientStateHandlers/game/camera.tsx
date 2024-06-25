import { useCamera, useDebounceCallback } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect, useMutable } from "@rbxts/roact-hooked";
import { RunService, UserInputService, Workspace } from "@rbxts/services";
import { useEnabled } from "client/apps/hooks/enability";
import useGameSettings from "client/apps/hooks/gameSettings";
import useComponent from "client/apps/hooks/useComponent";
import { useLocalPlrE } from "client/apps/hooks/wContext";
import { Renderable, Transform } from "shared/components";
import deltaMult from "../deltaMult";
import { CrashLanding } from "shared/components/movements";
import { Damage } from "shared/components/health";

interface Mutables {
    cameraShake: number;

    character?: Model;

    targetRotationX: number;
    targetRotationY: number;
    targetDistance: number;

    newRotationX: number;
    newRotationY: number;
    newDistance: number;

    newPosition: Vector3;
}

export default function GameCameraHandler(props: {}) {
    const enabled = useEnabled();
    const camera = useCamera();
    const localPlrE = useLocalPlrE();
    const transform = useComponent(localPlrE, Transform);
    const renderable = useComponent(localPlrE, Renderable);

    const crashLanding = useComponent(localPlrE, CrashLanding);
    const damage = useComponent(localPlrE, Damage);

    const gameSettings = useGameSettings();

    const mutables = useMutable<Mutables>({
        cameraShake: 0,

        character: undefined,

        targetRotationX: 0,
        targetRotationY: 0,
        targetDistance: 10,

        newRotationX: 0,
        newRotationY: 0,
        newDistance: 0,

        newPosition: Vector3.zero,
    });

    useEffect(() => {
        if (!enabled) return;
        if (damage !== undefined) {
            mutables.current.cameraShake += 0.3;
        }
        if (crashLanding !== undefined) {
            mutables.current.cameraShake += 0.8;
        }
    }, [enabled, damage, crashLanding]);

    useEffect(() => {
        const connection = RunService.Heartbeat.Connect((dt) => {
            mutables.current.cameraShake -= dt / 2;
            mutables.current.cameraShake = math.clamp(mutables.current.cameraShake, 0, 1);
        });

        return () => {
            connection.Disconnect();
        };
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const connection = UserInputService.InputChanged.Connect((input, gPE) => {
            if (gPE) return;
            if (input.UserInputType === Enum.UserInputType.MouseMovement) {
                const diffX = input.Delta.X;
                const diffY = input.Delta.Y;
                mutables.current.targetRotationX -= (diffY / 8) * gameSettings.MouseSensitivity;
                mutables.current.targetRotationY -= (diffX / 8) * gameSettings.MouseSensitivity;

                mutables.current.targetRotationX = math.clamp(
                    mutables.current.targetRotationX,
                    -(math.pi - 0.5) / 2,
                    (math.pi - 0.5) / 2,
                );
            } else if (input.UserInputType === Enum.UserInputType.MouseWheel) {
                mutables.current.targetDistance += input.Position.Z * -5;
                mutables.current.targetDistance = math.clamp(
                    mutables.current.targetDistance,
                    5,
                    50,
                );
            }
        });

        return () => {
            connection.Disconnect();
        };
    }, [enabled]);

    useEffect(() => {
        if (!enabled) return;

        if (renderable?.pv !== undefined && renderable.pv.IsA("Model")) {
            mutables.current.character = renderable.pv;
        } else {
            mutables.current.character = undefined;
        }
    }, [enabled, renderable]);

    useEffect(() => {
        if (transform === undefined) return;

        if (!enabled) {
            const connection = RunService.Heartbeat.Connect((dt) => {
                mutables.current.newPosition = transform.cf.Position;
                mutables.current.newDistance = 0;
            });
            return () => {
                connection.Disconnect();
            };
        }

        const connection = RunService.RenderStepped.Connect((dt) => {
            camera.CameraType = Enum.CameraType.Fixed;
            camera.Focus = transform.cf;

            mutables.current.newPosition = mutables.current.newPosition.Lerp(
                transform.cf.Position,
                deltaMult(dt, 10),
            );
            mutables.current.newDistance =
                mutables.current.newDistance +
                (mutables.current.targetDistance - mutables.current.newDistance) *
                    deltaMult(dt, 10);
            mutables.current.newRotationX =
                mutables.current.newRotationX +
                (mutables.current.targetRotationX - mutables.current.newRotationX) *
                    deltaMult(dt, 15);
            mutables.current.newRotationY =
                mutables.current.newRotationY +
                (mutables.current.targetRotationY - mutables.current.newRotationY) *
                    deltaMult(dt, 15);

            if (mutables.current.character === undefined) return;

            const raycastParams = new RaycastParams();
            raycastParams.FilterType = Enum.RaycastFilterType.Exclude;
            raycastParams.IgnoreWater = true;
            raycastParams.RespectCanCollide = true;
            raycastParams.FilterDescendantsInstances = [mutables.current.character];

            const now = os.clock();
            // const shakeRotationX = 5 * s.cameraShake * math.noise(10, now * 200);
            // const shakeRotationY = 5 * s.cameraShake * math.noise(20, now * 200);
            // const shakeRotationZ = 5 * s.cameraShake * math.noise(30, now * 200);

            const shakeRotationX = (mutables.current.cameraShake * math.random(-1000, 1000)) / 1000;
            const shakeRotationY = (mutables.current.cameraShake * math.random(-1000, 1000)) / 1000;
            const shakeRotationZ = (mutables.current.cameraShake * math.random(-1000, 1000)) / 1000;

            const rotation = CFrame.fromEulerAnglesYXZ(
                mutables.current.newRotationX + shakeRotationX,
                mutables.current.newRotationY + shakeRotationY,
                shakeRotationZ,
            );
            const _cf = rotation.add(
                mutables.current.newPosition.add(
                    new Vector3(0, mutables.current.newDistance / 4, 0),
                ),
            );

            let correctedDistance = mutables.current.newDistance;
            const result = Workspace.Raycast(
                _cf.Position,
                _cf.LookVector.mul(-(mutables.current.newDistance + 2)),
                raycastParams,
            );
            if (result !== undefined) {
                correctedDistance = math.max(result.Position.sub(_cf.Position).Magnitude - 2, 2);
            }

            const newCF = _cf.add(_cf.LookVector.mul(-correctedDistance));

            camera.CFrame = camera.CFrame.Lerp(newCF, deltaMult(dt, 50));
        });

        return () => {
            connection.Disconnect();
        };
    }, [enabled, camera, transform]);

    return <></>;
}
