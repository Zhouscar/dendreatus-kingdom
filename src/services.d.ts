interface ReplicatedStorage extends Instance {
    shared: Folder & {
        systems: Folder;
        plugins: Folder;
    };
    client: Folder & {
        systems: Folder;
        plugins: Folder;
        store: Folder & {
            defaultMiddlewares: Folder;
        };
    };
    assets: Folder & {
        blood: Folder & {
            dripPart: BasePart;
            splatterPart: BasePart;
        };
        dropItem: Folder & {
            droppingPart: BasePart;
            droppedModel: Model;
        };
        itemsAsTools: Folder; // contains only tool of the existing item types
    };
}

interface ServerScriptService extends Instance {
    server: Folder & {
        systems: Folder;
        plugins: Folder;
        store: Folder & {
            defaultMiddlewares: Folder;
        };
    };
}

interface StarterPlayer extends Instance {
    StarterCharacterScripts: StarterCharacterScripts;
}

interface Player extends Instance {
    Backpack: Backpack;
    StarterGear: StarterGear;
    PlayerGui: PlayerGui;
    PlayerScripts: PlayerScripts;
}
