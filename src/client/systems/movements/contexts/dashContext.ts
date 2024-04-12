import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import Sift from "@rbxts/sift";
import { LocalPlr, Plr } from "shared/components";
import { DashContext } from "shared/components/movements";
import { plrBaseDashContext } from "shared/features/movements/constants";
import { hasComponents } from "shared/hooks/components";

function dashContext(w: World) {
    for (const [e, localPlr] of w.query(LocalPlr)) {
        const data = Sift.Dictionary.copy(plrBaseDashContext);

        if (useChange([data], e) || !hasComponents(w, e, DashContext)) {
            w.insert(e, DashContext(data));
        }
    }
}

export = dashContext;
