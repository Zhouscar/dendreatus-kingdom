import { World } from "@rbxts/matter";
import { Damage } from "shared/components/health";
import { CrashLanding } from "shared/components/movements";
import gameTime from "shared/hooks/gameTime";
import { State } from "shared/state";

function crashLandDamage(w: World, s: State) {
    for (const [e, crashLanding] of w.queryChanged(CrashLanding)) {
        if (crashLanding.new !== undefined && w.contains(e)) {
            w.insert(e, Damage({ time: gameTime(), damageType: "physical", amount: 30 }));
        }
    }
}

export = crashLandDamage;
