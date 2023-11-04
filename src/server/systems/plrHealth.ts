import { World } from "@rbxts/matter";
import { Plr } from "shared/components";
import { Health } from "shared/components/health";

function plrHealth(w: World) {
    for (const [e, plr] of w.query(Plr).without(Health)) {
        w.insert(e, Health({ current: 100, maximum: 100 }));
        //w.insert(e, Health({ current: 100000, maximum: 100000 }));
    }
}

export = plrHealth;
