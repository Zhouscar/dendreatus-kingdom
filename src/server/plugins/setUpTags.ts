import { AnyEntity, World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { CollectionService } from "@rbxts/services";
import { Renderable, Test, Transform } from "shared/components";
import { TestDamagePart } from "shared/components/colliders";
import { getIdAttribute } from "shared/idAttribute";
import { State } from "shared/state";

const boundTags = new Set([Test, TestDamagePart]);

function crashReportCheckModel(instance: Instance): instance is Model {
    if (!instance.IsA("Model")) {
        warn(`${instance.GetFullName()} is not a model`);
    }
    return true;
}

function setupTags(w: World, state: State): void {
    function spawnBound(model: Model, component: ComponentCtor): void {
        const e = w.spawn(
            component(),
            Renderable({ model: model }),
            Transform({ cf: model.GetPivot() }),
        );

        model.SetAttribute(getIdAttribute(state.host), e);
    }

    for (const component of boundTags) {
        const tagName = tostring(component);

        for (const instance of CollectionService.GetTagged(tagName)) {
            if (!crashReportCheckModel(instance)) continue;
            spawnBound(instance, component);
        }

        CollectionService.GetInstanceAddedSignal(tagName).Connect((instance) => {
            if (!crashReportCheckModel(instance)) return;
            spawnBound(instance, component);
        });

        CollectionService.GetInstanceRemovedSignal(tagName).Connect((instance) => {
            const e = instance.GetAttribute(getIdAttribute(state.host)) as AnyEntity;

            if (e !== undefined) w.despawn(e);
        });
    }
}

export = setupTags;
