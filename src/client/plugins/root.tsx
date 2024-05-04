import { World } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import Root from "client/apps/root";
import { State } from "shared/state";

function root(w: World, s: State, remoteToken: string) {
    const player = Players.LocalPlayer!;

    task.spawn(() => {
        Roact.mount(<Root w={w} remoteToken={remoteToken} />, player.WaitForChild("PlayerGui")!);
    });
}

export = root;
