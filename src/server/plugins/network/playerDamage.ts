import { World } from "@rbxts/matter";
import { findPlrE } from "shared/calculations/findEntity";
import { Damage } from "shared/components/health";
import { itemAttackableContexts } from "shared/features/items/attackables";
import { network } from "shared/network";

function playerDamage(w: World) {
    network.ecs.playerDamage.connect((player, e, itemType) => {
        const plrE = findPlrE(w, player);
        assert(plrE);

        const damageAmount = itemAttackableContexts.get(itemType)?.damage;
        assert(damageAmount);

        w.insert(e, Damage({ amount: damageAmount, contributor: plrE }));
    });
}

export = playerDamage;
