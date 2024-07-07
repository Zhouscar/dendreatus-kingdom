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

    swordHit: withAssetPrefix("3521555808"),
    lowHealth: withAssetPrefix("7188240609"),

    harvest: withAssetPrefix("9119312300"),
    placeItem: withAssetPrefix("315912428"),

    itemPopOut: withAssetPrefix("9125781425"),

    consumeGoya: withAssetPrefix("6548799955"),
    consumeSoup: withAssetPrefix("9114224933"),
    consumeHumberbell: withAssetPrefix("9119956544"),

    footStep1: withAssetPrefix("619083295"),
    footStep2: withAssetPrefix("619184927"),
    footStep3: withAssetPrefix("619188333"),

    footStepGrass: withAssetPrefix("4776173570"), // 8 steps
    footStepMud: withAssetPrefix("9083822528"), // 18 steps
    footStepWood: withAssetPrefix("9058073414"), // 14 steps
    footStepStone: withAssetPrefix("4416041299"), // 12 steps

    takeOutLantern: withAssetPrefix("6605239584"),
    takeOutItem: withAssetPrefix("7109757838"),
    takeOutSword: withAssetPrefix("481732033"),

    swordSwing: withAssetPrefix("5789211405"),
    daggerSwing: withAssetPrefix("9119749145"),
    spikeballSwing: withAssetPrefix("5835032207"),

    doorOpen: withAssetPrefix("6739752366"),
    doorClose: withAssetPrefix("4583672060"),

    wakeUpFromTrauma: withAssetPrefix("18115139328"),
    characterDelete: withAssetPrefix("2162239324"),

    dkTheme: withAssetPrefix("18115288211"),
    startGame: withAssetPrefix("8754163935"),

    dayTimeMusic: withAssetPrefix("9112799929"),
    nightTimeMusic: withAssetPrefix("390457804"),

    letterByLetter: withAssetPrefix("929615155"),
    chatPopUp: withAssetPrefix("552654993"),

    buttonClick: withAssetPrefix("876939830"),
    buttonHover: withAssetPrefix("6333717580"),

    switchUI: withAssetPrefix("261190223"),
};

export type SoundName = keyof typeof SOUND_IDS;
