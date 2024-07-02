import { Make } from "@rbxts/altmake";
import { World } from "@rbxts/matter";
import { StarterGui } from "@rbxts/services";
import { routes } from "shared/network";

function requestReset(_: any, __: any, remoteToken: string) {
    const bindable = Make("BindableEvent");
    bindable.Event.Connect(() => {
        routes.requestReset.send(remoteToken);
    });

    StarterGui.SetCore("ResetButtonCallback", bindable);
}

export = requestReset;
