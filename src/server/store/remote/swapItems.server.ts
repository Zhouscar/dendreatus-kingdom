import { network } from "shared/network";
import { store } from "..";

network.store.swapItems.connect((player, from, to) => {
    const plr = tostring(player.UserId);

    store.swapItems(plr, from, to);
});
