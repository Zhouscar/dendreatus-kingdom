import { World } from "@rbxts/matter";
import { Dummy, Renderable } from "shared/components";
import { Health } from "shared/components/health";

const DUMMY_HEALTH = 100000000000;

function dummiesSetup(w: World) {
    for (const [e, dummy] of w.query(Dummy).without(Health)) {
        w.insert(
            e,
            Health({
                current: DUMMY_HEALTH,
                maximum: DUMMY_HEALTH,
                damageContributors: new Map(),
            }),
        );
    }
}

export = dummiesSetup;
