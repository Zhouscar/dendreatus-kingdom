import { Make } from "@rbxts/altmake";
import { Lighting } from "@rbxts/services";

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
