import { World } from "@rbxts/matter";
import { LocalPlr, Renderable } from "shared/components";
import { State } from "shared/state";

function characterCF(w: World, s: State) {
    let newCF: CFrame | undefined = undefined;

    for (const [e, localPlr, renderable] of w.query(LocalPlr, Renderable)) {
        newCF = renderable.model.GetPivot();
    }

    if (newCF !== s.characterCF) {
        s.characterCF = newCF;
    }
}

export = { system: characterCF, event: "onPhysics" };
