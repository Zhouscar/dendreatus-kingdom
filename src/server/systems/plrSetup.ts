import { World, useEvent } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Human, Plr, Renderable } from "shared/components";
import { Health } from "shared/components/health";
import { Stomach } from "shared/components/hunger";

function plrSetup(w: World) {
    Players.GetPlayers().forEach((player) => {
        for (const [_, character] of useEvent(player, "CharacterAdded")) {
            w.spawn(Plr({ player: player }), Renderable({ pv: character }));
        }
    });

    for (const [e, _plr, renderable] of w.query(Plr, Renderable).without(Human)) {
        const humanoid = renderable.pv.FindFirstChildWhichIsA("Humanoid");
        if (humanoid) {
            w.insert(e, Human({ humanoid: humanoid }));
        } else {
            w.remove(e, Human);
        }
    }

    for (const [e, plr] of w.query(Plr).without(Health, Stomach)) {
        w.insert(
            e,
            Health({
                current: 100,
                maximum: 100,
                damageContributors: new Map(),
            }),
            Stomach({
                hunger: 100,
                capacity: 100,
                digest: new Map(),
            }),
        );
    }
}

export = plrSetup;
