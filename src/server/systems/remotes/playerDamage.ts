import { World } from "@rbxts/matter";
import { findPlrE } from "shared/calculations/findEntity";
import { Damage } from "shared/components/health";
import { ITEM_ATTACKABLE_CONTEXTS } from "shared/features/items/attackables";
import { routes } from "shared/network";

function playerDamage(w: World, _: any, remoteToken: string) {
    for (const [pos, player, token, e, itemType] of routes.playerDamage.query()) {
        assert(token === remoteToken, "HAHA YOU HACKER");

        const plrE = findPlrE(w, player as Player);
        assert(plrE);

        const damageAmount = ITEM_ATTACKABLE_CONTEXTS.get(itemType)?.damage;
        assert(damageAmount);

        w.insert(e, Damage({ amount: damageAmount, contributor: plrE, damageType: "physical" }));
    }
}

export = playerDamage;
