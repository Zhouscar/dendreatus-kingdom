import { World } from "@rbxts/matter";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import Root from "client/apps/root";

function root(w: World) {
    const player = Players.LocalPlayer!;

    task.spawn(() => {
        Roact.mount(<Root w={w} />, player.WaitForChild("PlayerGui")!);
    });
}

export = root;
