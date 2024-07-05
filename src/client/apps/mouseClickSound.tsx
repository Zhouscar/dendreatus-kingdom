import { useEventListener } from "@rbxts/pretty-roact-hooks";
import Roact from "@rbxts/roact";
import { UserInputService } from "@rbxts/services";
import { playSound } from "shared/effects/sounds";

export default function MouseClickEffects(props: {}) {
    // useEventListener(UserInputService.InputBegan, (input: InputObject) => {
    //     if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;
    //     playSound({ soundName: "buttonClick" });
    // });

    // useEventListener(UserInputService.InputEnded, (input: InputObject) => {
    //     if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;
    //     playSound({ soundName: "buttonClick" });
    // });

    return <></>;
}
