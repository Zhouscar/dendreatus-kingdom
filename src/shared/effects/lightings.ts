import { Make, Modify } from "@rbxts/altmake";
import { Lighting } from "@rbxts/services";

export function adjustDefaultAtmosphere(props: Partial<WritableInstanceProperties<Atmosphere>>) {
    const atmosphere = Lighting.FindFirstChild("Atmosphere");
    assert(atmosphere !== undefined && atmosphere.IsA("Atmosphere"));

    Modify(atmosphere, props);
}

export function adjustAtmosphere(
    name: string,
    props: Partial<WritableInstanceProperties<Atmosphere>>,
) {
    let atmosphere = Lighting.FindFirstChild(name) as Atmosphere | undefined;
    assert(atmosphere === undefined || atmosphere.IsA("Atmosphere"));
    if (atmosphere === undefined) {
        atmosphere = Make("Atmosphere", {
            Name: name,
            Parent: Lighting,
        });
    }

    Modify(atmosphere, props);
}

export function adjustBlur(name: string, size: number) {
    let blur = Lighting.FindFirstChild(name) as BlurEffect | undefined;
    assert(blur === undefined || blur.IsA("BlurEffect"));
    if (blur === undefined) {
        blur = Make("BlurEffect", {
            Name: name,
            Parent: Lighting,
        });
    }

    blur.Size = size;
}
