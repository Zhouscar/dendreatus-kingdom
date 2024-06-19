import withAssetPrefix from "shared/calculations/withAssetPrefix";

export const SOUND_IDS = {
    deathScream: withAssetPrefix("5825316184"),
    youDied: withAssetPrefix("4817888357"),
    wind: withAssetPrefix("687874741"),
    dash: withAssetPrefix("4909206080"),

    land: withAssetPrefix("268933841"),
    crashLanding: withAssetPrefix("3802270141"),

    plrDamage: withAssetPrefix("5634710863"),
    dummyDamage: withAssetPrefix("5634710863"),

    footStep1: withAssetPrefix("619083295"),
    footStep2: withAssetPrefix("619184927"),
    footStep3: withAssetPrefix("619188333"),

    doorOpen: withAssetPrefix("6739752366"),
    doorClose: withAssetPrefix("4583672060"),

    wakeUpFromTrauma: withAssetPrefix("18112889134"),
};

export type SoundName = keyof typeof SOUND_IDS;
