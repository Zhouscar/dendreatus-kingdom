import { World } from "@rbxts/matter";
import { Plr, Renderable } from "shared/components";
import { getIdAttribute } from "shared/idAttribute";
import { State } from "shared/state";

function updateIdAttribute(w: World, state: State): void {
    for (const [e, record] of w.queryChanged(Renderable)) {
        record.new?.model?.SetAttribute(getIdAttribute(state.host), e);
    }
}

export = updateIdAttribute;
