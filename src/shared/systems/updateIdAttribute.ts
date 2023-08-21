import { World } from "@rbxts/matter";
import { Renderable } from "shared/components";
import { getIdAttribute } from "shared/idAttribute";
import { State } from "shared/state";

function updateIdAttribute(world: World, state: State): void {
    for (const [id, record] of world.queryChanged(Renderable)) {
        record.new?.model?.SetAttribute(getIdAttribute(state.host), id);
    }
}

export = updateIdAttribute;
