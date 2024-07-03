import { World } from "@rbxts/matter";
import { store } from "server/store";
import { Plr, Transform } from "shared/components";
import { Dead } from "shared/components/health";
import { DroppingItem } from "shared/components/items";
import { UP } from "shared/constants/direction";

function plrDropItemOnDeath(w: World) {
    const state = store.getState();
    for (const [e, deadRecord] of w.queryChanged(Dead)) {
        if (!w.contains(e)) continue;
        if (deadRecord.new === undefined) continue;

        const plr = w.get(e, Plr);
        if (plr === undefined) continue;

        const transform = w.get(e, Transform);
        if (transform === undefined) continue;

        const plrId = tostring(plr.player.UserId);
        const inventory = state.players.inventory[plrId];
        if (inventory === undefined) continue;

        inventory.items.forEach((item) => {
            w.spawn(
                DroppingItem({
                    position: transform.cf.Position.add(UP.mul(2)),
                    impulse: new Vector3(
                        math.random(-10, 10),
                        math.random(10, 30),
                        math.random(-10, 10),
                    ),
                    item: item,
                }),
            );
        });

        store.clearInventory(plrId);
    }
}

export = plrDropItemOnDeath;
