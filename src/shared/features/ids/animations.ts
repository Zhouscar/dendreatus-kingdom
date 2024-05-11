import withAssetPrefix from "shared/calculations/withAssetPrefix";

export const ANIM_IDS = {
    death: withAssetPrefix("14414130377"),
    dash: withAssetPrefix("14215455071"),

    walk: withAssetPrefix("17376804699"),
    sprint: withAssetPrefix("14207192205"),
    sneak: withAssetPrefix("14215263201"),
    dive: withAssetPrefix("14215257367"),
    swim: withAssetPrefix("14207199744"),
    climb: withAssetPrefix("14207203133"),

    idle: withAssetPrefix("14207151528"),
    sneakIdle: withAssetPrefix("14215260617"),

    jump: withAssetPrefix("14215254834"),

    landing: withAssetPrefix("14207189927"),
    crashLanding: withAssetPrefix("14207211480"),

    falling: withAssetPrefix("14215257367"),

    harvest: withAssetPrefix("13197708605"),
};

export type AnimName = keyof typeof ANIM_IDS;