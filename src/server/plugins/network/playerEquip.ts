import { World } from "@rbxts/matter";
import findPlrE from "shared/calculations/findPlrE";
import { Equipping } from "shared/components/items";
import { network } from "shared/network";

function playerEquip(w: World) {
    network.ecs.playerEquip.connect((player, guid) => {
        const e = findPlrE(w, player);
        assert(e);

        if (guid === undefined) {
            w.remove(e, Equipping);
            return;
        }

        w.insert(e, Equipping({ itemGuid: guid }));
    });
}

export = playerEquip;
