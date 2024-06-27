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
