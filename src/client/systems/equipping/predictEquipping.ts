import { None, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { Equipping, PredictUnequip } from "shared/components/items";
import { network } from "shared/network";

function predictEquipping(w: World) {
    for (const [e, equippingRecord] of w.queryChanged(Equipping)) {
        if (!w.contains(e)) continue;
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (equippingRecord.new !== undefined) continue;
        w.insert(e, PredictUnequip({}));
    }

    for (const [e, plr, equipping] of w.query(Plr, Equipping)) {
        if (plr.player !== Players.LocalPlayer) continue;
        if (!equipping.predicting) continue;

        network.ecs.playerEquip.fire(equipping.itemGuid);
        w.insert(e, equipping.patch({ predicting: None }));
    }

    for (const [e, plr, predictUnequip] of w.query(Plr, PredictUnequip)) {
        if (plr.player !== Players.LocalPlayer) continue;

        network.ecs.playerEquip.fire(undefined);
        w.remove(e, PredictUnequip);
    }
}

export = predictEquipping;
