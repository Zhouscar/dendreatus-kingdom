import { Make } from "@rbxts/altmake";
import { useBindingListener, useUnmountEffect } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useBinding, useEffect, useMemo, useMutable } from "@rbxts/roact-hooked";
import { waypointContainer } from "client/containers";
import { IsWaypoint } from "shared/components/waypoints";
import Transition from "../components/transition";
import useLocalPlrE from "../hooks/useLocalPlrE";
import useComponent from "../hooks/useComponent";
import { Renderable, Transform } from "shared/components";
import { getPvPrimaryPart } from "shared/hooks/pvPart";
import { useSpring } from "../hooks/ripple";

export default function Waypoint(props: { enabled: boolean; isWaypoint: IsWaypoint }) {
    const enabled = props.enabled;
    const isWaypoint = props.isWaypoint;

    const [part, setPart] = useBinding<Part | undefined>(undefined);
    const beamMutable = useMutable(Make("Beam", { FaceCamera: true, TextureSpeed: -1 }));

    const semiTransparencySpring = useSpring(enabled ? 0.5 : 1);

    const localPlrE = useLocalPlrE();
    const plrTransform = useComponent(localPlrE, Transform);
    const plrRenderable = useComponent(localPlrE, Renderable);

    const distance = useMemo(() => {
        if (plrTransform === undefined) return undefined;
        return plrTransform.cf.Position.sub(isWaypoint.position).Magnitude;
    }, [plrTransform, isWaypoint]);

    useEffect(() => {
        const newPart = Make("Part", {
            Anchored: true,
            CanCollide: false,
            CanTouch: false,
            Transparency: 1,

            Parent: waypointContainer,
            Position: isWaypoint.position,
            Name: isWaypoint.name,
            Children: [Make("Attachment")],
        });

        setPart(newPart);

        return () => {
            newPart.Destroy();
        };
    }, [isWaypoint]);

    useBindingListener(part, (p) => {
        beamMutable.current.Parent = p;
        beamMutable.current.Attachment0 = p?.FindFirstChildWhichIsA("Attachment");
    });

    useBindingListener(semiTransparencySpring, (trans) => {
        beamMutable.current.Transparency = new NumberSequence(trans);
    });

    useEffect(() => {
        if (plrRenderable === undefined) return;
        beamMutable.current.Attachment1 = getPvPrimaryPart(plrRenderable.pv)?.FindFirstChild(
            "RootAttachment",
        ) as Attachment | undefined;
    }, [plrRenderable]);

    useUnmountEffect(() => {
        part.getValue()?.Destroy();
        setPart(undefined);
    });

    useEffect(() => {
        print(enabled);
    });

    return (
        <billboardgui
            Adornee={part}
            ResetOnSpawn={false}
            AlwaysOnTop={true}
            Size={new UDim2(0, 200, 0, 200)}
            ZIndexBehavior={"Sibling"}
            MaxDistance={100000000000000}
            DistanceLowerLimit={100000000000000}
            DistanceUpperLimit={100000000000000}
        >
            <Transition enabled={enabled}>
                <textlabel
                    Position={UDim2.fromScale(0.5, 0.5)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Size={UDim2.fromScale(1, 1)}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    TextStrokeColor3={Color3.fromRGB(0, 0, 0)}
                    TextStrokeTransparency={0}
                    Font={"Fantasy"}
                    TextSize={20}
                    Text={isWaypoint.name}
                    BackgroundTransparency={1}
                    BorderSizePixel={0}
                />
                <textlabel
                    Position={new UDim2(0.5, 0, 0.5, 20)}
                    AnchorPoint={new Vector2(0.5, 0.5)}
                    Size={UDim2.fromScale(1, 1)}
                    TextColor3={Color3.fromRGB(255, 255, 255)}
                    TextStrokeColor3={Color3.fromRGB(0, 0, 0)}
                    TextStrokeTransparency={0}
                    Font={"Fantasy"}
                    TextSize={15}
                    Text={distance !== undefined ? tostring(math.round(distance)) : ""}
                    BackgroundTransparency={1}
                    BorderSizePixel={0}
                />
            </Transition>
        </billboardgui>
    );
}
