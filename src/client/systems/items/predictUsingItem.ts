import { None, World } from "@rbxts/matter";
import { Players } from "@rbxts/services";
import { Plr } from "shared/components";
import { PredictUnequip, PredictUnuseItem, UsingItem } from "shared/components/items";
import { network } from "shared/network";

function predictUsingItem(w: World) {
    for (const [e, usingItemRecord] of w.queryChanged(UsingItem)) {
        if (!w.contains(e)) continue;
        const plr = w.get(e, Plr);
        if (plr?.player !== Players.LocalPlayer) continue;
        if (usingItemRecord.new !== undefined) continue;
        w.insert(e, PredictUnuseItem({}));
    }

    for (const [e, plr, usingItem] of w.query(Plr, UsingItem)) {
        if (plr.player !== Players.LocalPlayer) continue;
        if (!usingItem.predicting) continue;

        print("hi");
        network.ecs.playerUseItem.fire(usingItem.startTime);
        w.insert(e, usingItem.patch({ predicting: None }));
    }

    for (const [e, plr, predictUnequip] of w.query(Plr, PredictUnequip)) {
        if (plr.player !== Players.LocalPlayer) continue;

        network.ecs.playerUseItem.fire(undefined);
        w.remove(e, PredictUnuseItem);
    }
}

export = predictUsingItem;
