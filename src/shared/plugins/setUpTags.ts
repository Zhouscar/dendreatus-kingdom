import { AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { CollectionService } from "@rbxts/services";
import { Renderable, Transform } from "shared/components";
import { getIdAttribute } from "shared/idAttribute";
import { State } from "shared/state";

const boundTags = new Set([]);

function setupTags(world: World, state: State): void {
    function spawnBound(model: Model, component: ComponentCtor): void {
        const id = world.spawn(
            component(),
            Renderable({ model: model }),
            Transform({ cf: model.GetPivot() }),
        );

        model.SetAttribute(getIdAttribute(state.host), id);
    }

    for (const component of boundTags) {
        const tagName = tostring(component);

        for (const instance of CollectionService.GetTagged(tagName)) {
            spawnBound(instance as Model, component);
        }

        CollectionService.GetInstanceAddedSignal(tagName).Connect((instance) => {
            spawnBound(instance as Model, component);
        });

        CollectionService.GetInstanceRemovedSignal(tagName).Connect((instance) => {
            const id = instance.GetAttribute(getIdAttribute(state.host)) as AnyEntity;

            if (id !== undefined) world.despawn(id);
        });
    }
}

export = setupTags;
