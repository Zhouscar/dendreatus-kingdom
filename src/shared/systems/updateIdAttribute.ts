import { World } from "@rbxts/matter";
import { Plr, Renderable } from "shared/components";
import { ID_ATTRIBUTE } from "shared/idAttribute";
import { State } from "shared/state";

function updateIdAttribute(w: World, state: State): void {
    for (const [e, record] of w.queryChanged(Renderable)) {
        record.new?.model?.SetAttribute(ID_ATTRIBUTE, e);
    }
}

export = updateIdAttribute;
