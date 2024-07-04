import { World } from "@rbxts/matter";
import { ComponentCtor } from "@rbxts/matter/lib/component";
import { Sign, TestSign } from "shared/components/signs";
import { SIGN_CONTEXTS } from "shared/features/signs/contexts";

function signs(w: World) {
    SIGN_CONTEXTS.forEach((_, Ctor) => {
        for (const [e] of w.query(Ctor).without(Sign)) {
            w.insert(e, Sign({ signCtor: Ctor }));
        }
    });
}

export = signs;
