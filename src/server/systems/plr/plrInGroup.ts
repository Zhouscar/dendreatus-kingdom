import { World } from "@rbxts/matter";
import { useChange } from "@rbxts/matter-hooks";
import { Players } from "@rbxts/services";
import Sift from "@rbxts/sift";
import { findPlrE } from "shared/calculations/findEntity";
import { Member } from "shared/components";
import { State } from "shared/state";

function plrMember(w: World, s: State) {
    Players.GetPlayers().forEach((player) => {
        const plrE = findPlrE(w, player);
        const groupData0 = s.plrGroupDatas.get(player);

        if (!useChange([plrE, groupData0 ?? "NA"], player)) return;
        if (plrE === undefined) return;
        if (groupData0 === undefined) return;

        const groupData = Sift.Dictionary.copy(groupData0);
        w.insert(plrE, Member(groupData));

        // TODO: now make a gui
    });
}

export = plrMember;
