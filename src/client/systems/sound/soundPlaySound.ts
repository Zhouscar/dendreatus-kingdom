import { AnyEntity, World } from "@rbxts/matter";
import { Sound } from "shared/components";
import { makeSound } from "shared/effects/sounds";
import { State } from "shared/state";

const playedSound: Set<AnyEntity> = new Set();

function soundPlaySound(w: World, s: State) {
    for (const [e, soundRecord] of w.queryChanged(Sound)) {
        if (soundRecord.new !== undefined) continue;
        playedSound.delete(e);
    }

    for (const [e, sound] of w.query(Sound)) {
        if (playedSound.has(e)) continue;
        playedSound.add(e);
        makeSound(sound.cf, sound.context);
    }
}

export = soundPlaySound;
