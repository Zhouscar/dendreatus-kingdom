import { Make } from "@rbxts/altmake";
import { useBindingListener, useMountEffect } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { useEffect, useMemo } from "@rbxts/roact-hooked";
import { Lighting, RunService } from "@rbxts/services";
import { throttle } from "@rbxts/set-timeout";
import { newGuid } from "shared/features/guidUtils";

type AtmosphereProps = Partial<WritableInstanceProperties<Atmosphere>>;

let atmosphere = Lighting.FindFirstChild("Atmosphere") as Atmosphere | undefined;

const defaultAtmosphereProps: AtmosphereProps | undefined =
    atmosphere !== undefined
        ? {
              Color: atmosphere.Color,
              Decay: atmosphere.Decay,
              Density: atmosphere.Density,
              Glare: atmosphere.Glare,
              Haze: atmosphere.Haze,
              Offset: atmosphere.Offset,
          }
        : undefined;

if (atmosphere === undefined) {
    task.spawn(() => {
        atmosphere = Lighting.WaitForChild("Atmosphere") as Atmosphere;
    });
}

const storage: Map<string, AtmosphereProps> = new Map();

const actives: Set<string> = new Set();

let latestActive: string | undefined = undefined;

function deltaMult(dt: number, mult: number) {
    return math.clamp(dt * mult, 0, 1);
}

RunService.Heartbeat.Connect((dt) => {
    if (atmosphere === undefined) return;

    const currentProps = latestActive !== undefined ? storage.get(latestActive) : undefined;
    if (currentProps === undefined) return;

    if (currentProps.Color !== undefined)
        atmosphere.Color = atmosphere.Color.Lerp(currentProps.Color, deltaMult(dt, 10));

    if (currentProps.Decay !== undefined)
        atmosphere.Decay = atmosphere.Decay.Lerp(currentProps.Decay, deltaMult(dt, 10));

    if (currentProps.Density !== undefined)
        atmosphere.Density =
            atmosphere.Density + (currentProps.Density - atmosphere.Density) * deltaMult(dt, 10);

    if (currentProps.Glare !== undefined)
        atmosphere.Glare =
            atmosphere.Glare + (currentProps.Glare - atmosphere.Glare) * deltaMult(dt, 10);

    if (currentProps.Haze !== undefined)
        atmosphere.Haze =
            atmosphere.Haze + (currentProps.Haze - atmosphere.Haze) * deltaMult(dt, 10);

    if (currentProps.Offset !== undefined)
        atmosphere.Offset =
            atmosphere.Offset + (currentProps.Offset - atmosphere.Offset) * deltaMult(dt, 10);
});

export default function Atmosphere(props: {
    enabled: boolean;
    useDefaultAtmosphereProps?: boolean;
    color?: Color3 | Roact.Binding<Color3>;
    decay?: Color3 | Roact.Binding<Color3>;
    density?: number | Roact.Binding<number>;
    glare?: number | Roact.Binding<number>;
    haze?: number | Roact.Binding<number>;
    offset?: number | Roact.Binding<number>;
}) {
    const key = useMemo(() => newGuid(), []);
    const enabled = props.enabled;
    const useDefaultAtmosphereProps = props.useDefaultAtmosphereProps;

    const color = props.color;
    const decay = props.decay;
    const density = props.density;
    const glare = props.glare;
    const haze = props.haze;
    const offset = props.haze;

    useBindingListener(color, (v) => {
        let atmosphereProps = storage.get(key);
        if (atmosphereProps === undefined) {
            atmosphereProps = {};
            storage.set(key, atmosphereProps);
        }
        atmosphereProps.Color =
            v ?? (useDefaultAtmosphereProps ? defaultAtmosphereProps?.Color : undefined);
    });

    useBindingListener(decay, (v) => {
        let atmosphereProps = storage.get(key);
        if (atmosphereProps === undefined) {
            atmosphereProps = {};
            storage.set(key, atmosphereProps);
        }

        atmosphereProps.Decay =
            v ?? (useDefaultAtmosphereProps ? defaultAtmosphereProps?.Decay : undefined);
    });

    useBindingListener(density, (v) => {
        let atmosphereProps = storage.get(key);
        if (atmosphereProps === undefined) {
            atmosphereProps = {};
            storage.set(key, atmosphereProps);
        }
        atmosphereProps.Density =
            v ?? (useDefaultAtmosphereProps ? defaultAtmosphereProps?.Density : undefined);
    });

    useBindingListener(glare, (v) => {
        let atmosphereProps = storage.get(key);
        if (atmosphereProps === undefined) {
            atmosphereProps = {};
            storage.set(key, atmosphereProps);
        }
        atmosphereProps.Glare =
            v ?? (useDefaultAtmosphereProps ? defaultAtmosphereProps?.Glare : undefined);
    });

    useBindingListener(haze, (v) => {
        let atmosphereProps = storage.get(key);
        if (atmosphereProps === undefined) {
            atmosphereProps = {};
            storage.set(key, atmosphereProps);
        }
        atmosphereProps.Haze =
            v ?? (useDefaultAtmosphereProps ? defaultAtmosphereProps?.Haze : undefined);
    });

    useBindingListener(offset, (v) => {
        let atmosphereProps = storage.get(key);
        if (atmosphereProps === undefined) {
            atmosphereProps = {};
            storage.set(key, atmosphereProps);
        }
        atmosphereProps.Offset =
            v ?? (useDefaultAtmosphereProps ? defaultAtmosphereProps?.Offset : undefined);
    });

    useEffect(() => {
        if (enabled) {
            latestActive = key;
            actives.add(key);
        } else {
            actives.delete(key);
        }
    }, [enabled, key]);

    return <></>;
}
