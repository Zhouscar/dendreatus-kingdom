import { World, useEvent } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr, Renderable } from "shared/components";

function playerCharactersArePlr(w: World) {
    Players.GetPlayers().forEach((player) => {
        for (const [_, character] of useEvent(player, "CharacterAdded")) {
            w.spawn(Plr({ player: player }), Renderable({ model: character }));
        }
    });
}

export = playerCharactersArePlr;
