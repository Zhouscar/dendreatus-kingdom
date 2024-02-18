import { None, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { LocalPlr, Plr } from "shared/components";
import { Equipping, PredictUnequip } from "shared/components/items";
import { isLocalPlr } from "shared/hooks/components";
import { network } from "shared/network";

function predictEquipping(w: World) {
    for (const [e, equippingRecord] of w.queryChanged(Equipping)) {
        if (!w.contains(e)) continue;
        if (!isLocalPlr(w, e)) continue;
        if (equippingRecord.new !== undefined) continue;
        w.insert(e, PredictUnequip({}));
    }

    for (const [e, localPlr, equipping] of w.query(LocalPlr, Equipping)) {
        if (!equipping.predicting) continue;

        network.ecs.playerEquip.fire(equipping.itemGuid);
        w.insert(e, equipping.patch({ predicting: None }));
    }

    for (const [e, localPlr, predictUnequip] of w.query(LocalPlr, PredictUnequip)) {
        network.ecs.playerEquip.fire(undefined);
        w.remove(e, PredictUnequip);
    }
}

export = predictEquipping;
