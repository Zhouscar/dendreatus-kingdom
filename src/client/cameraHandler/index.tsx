import Roact from "@rbxts/roact";
import { CameraProps, CameraState, CameraStateName } from "./cameraProps";
import {
    Linear,
    Spring,
    useBindingListener,
    useCamera,
    useMotor,
    usePrevious,
} from "@rbxts/pretty-roact-hooks";
import { useCallback, useEffect, useMemo, useState } from "@rbxts/roact-hooked";
import { Players, RunService } from "@rbxts/services";
import { ViewVector } from "shared/classes";

const FOLLOW_VIEW_VECTOR = new ViewVector(-5, 2, 0);

const r = math.random;

const onRender = RunService.RenderStepped;
const onPhysics = RunService.Stepped;
const onTick = RunService.Heartbeat;

const cameraFollowPart = new Instance("Part");
cameraFollowPart.Name = "CameraFollowPart";
cameraFollowPart.CanCollide = false;
cameraFollowPart.CanTouch = false;
cameraFollowPart.Locked = true;
cameraFollowPart.Anchored = true;
cameraFollowPart.Transparency = 1;
cameraFollowPart.Massless = true;

function CameraHandler(props: CameraProps) {
    const state = props.state;
    const shake = props.shake;

    const prevState = usePrevious(state);

    const camera = useCamera();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionMotor, setTransitionMotor, transitionApi] = useMotor(0);

    const cameraCFOnStateChange = useMemo(() => camera.CFrame, [state]);

    const resetTransitionMotor = useCallback(() => {
        setIsTransitioning(false);
        setTransitionMotor(new Spring(0));
        transitionApi.setState({ complete: true, value: 0, velocity: 0 });
    }, []);

    useBindingListener(transitionMotor, (value) => {
        if (!isTransitioning) return;
        if (!prevState) return;

        if (value === 1) {
            setIsTransitioning(false);
            return;
        }

        if (prevState.type === "follow" && state.type === "angleView") {
            const followDelta = (0.5 - value) * 2;
            const angleViewDelta = (value - 0.5) * 2;

            if (followDelta > 0) {
                const target = prevState.target;
                camera.CameraType = Enum.CameraType.Fixed;
                camera.CameraSubject = undefined;

                const targetCF = target.CFrame;
                const targetPosition = target.Position;
                const goalPosition = targetPosition
                    .add(targetCF.LookVector.mul(FOLLOW_VIEW_VECTOR.look * followDelta))
                    .add(targetCF.RightVector.mul(FOLLOW_VIEW_VECTOR.right * followDelta))
                    .add(targetCF.UpVector.mul(FOLLOW_VIEW_VECTOR.up * followDelta));

                camera.CFrame = camera.CFrame.Lerp(new CFrame(goalPosition, targetPosition), 0.2);
            }

            if (angleViewDelta > 0) {
                const viewVector = state.viewVector;
                const target = state.target;
                camera.CameraType = Enum.CameraType.Fixed;
                camera.CameraSubject = undefined;

                const targetCF = target.CFrame;
                const targetPosition = target.Position;
                const goalPosition = targetPosition
                    .add(targetCF.LookVector.mul(viewVector.look * angleViewDelta))
                    .add(targetCF.RightVector.mul(viewVector.right * angleViewDelta))
                    .add(targetCF.UpVector.mul(viewVector.up * angleViewDelta));

                camera.CFrame = new CFrame(goalPosition, targetPosition);
            }
        } else if (prevState.type === "angleView" && state.type === "follow") {
            const angleViewDelta = (0.5 - value) * 2;
            const followDelta = (value - 0.5) * 2;

            if (angleViewDelta > 0) {
                const viewVector = prevState.viewVector;
                const target = prevState.target;
                camera.CameraType = Enum.CameraType.Fixed;
                camera.CameraSubject = undefined;

                const targetCF = target.CFrame;
                const targetPosition = target.Position;
                const goalPosition = targetPosition
                    .add(targetCF.LookVector.mul(viewVector.look * angleViewDelta))
                    .add(targetCF.RightVector.mul(viewVector.right * angleViewDelta))
                    .add(targetCF.UpVector.mul(viewVector.up * angleViewDelta));

                camera.CFrame = new CFrame(goalPosition, targetPosition);
            }

            if (followDelta > 0) {
                const target = state.target;
                camera.CameraType = Enum.CameraType.Fixed;
                camera.CameraSubject = undefined;

                const targetCF = target.CFrame;
                const targetPosition = target.Position;
                const goalPosition = targetPosition
                    .add(targetCF.LookVector.mul(FOLLOW_VIEW_VECTOR.look * followDelta))
                    .add(targetCF.RightVector.mul(FOLLOW_VIEW_VECTOR.right * followDelta))
                    .add(targetCF.UpVector.mul(FOLLOW_VIEW_VECTOR.up * followDelta));

                camera.CFrame = new CFrame(goalPosition, targetPosition);
            }
        }
    });

    useEffect(() => {
        if (!prevState) return;
        if (state.type === prevState.type) return;

        resetTransitionMotor();

        setIsTransitioning(true);
        setTransitionMotor(new Linear(1));
    }, [state, prevState]);

    useEffect(() => {
        if (isTransitioning) return;

        print(state.type);
        if (state.type === "follow") {
            const target = state.target;

            camera.CameraType = Enum.CameraType.Track;
            camera.CameraSubject = cameraFollowPart;

            const connection = onTick.Connect(() => {
                const targetPosition = target.Position;

                cameraFollowPart.Position = cameraFollowPart.Position.Lerp(targetPosition, 0.1);

                // .add(
                //     new Vector3(
                //         r(-s.cameraShake * 100, s.cameraShake * 100) / 100,
                //         r(-s.cameraShake * 100, s.cameraShake * 100) / 100,
                //         r(-s.cameraShake * 100, s.cameraShake * 100) / 100,
                //     ),
                // );
            });

            return () => {
                connection.Disconnect();
            };
        } else if (state.type === "angleView") {
            const target = state.target;
            const viewVector = state.viewVector;

            camera.CameraType = Enum.CameraType.Fixed;
            camera.CameraSubject = undefined;

            const connection = onTick.Connect(() => {
                const targetCF = target.CFrame;
                const targetPosition = target.Position;
                const goalPosition = targetPosition
                    .add(targetCF.LookVector.mul(viewVector.look))
                    .add(targetCF.RightVector.mul(viewVector.right))
                    .add(targetCF.UpVector.mul(viewVector.up));

                camera.CFrame = new CFrame(goalPosition, targetPosition);
            });

            return () => {
                connection.Disconnect();
            };
        } else if (state.type === "none") {
            camera.CameraType = Enum.CameraType.Fixed;
            camera.CameraSubject = undefined;
        }
    }, [state, isTransitioning]);

    return <></>;
}

export = CameraHandler;
