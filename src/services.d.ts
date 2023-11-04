interface ReplicatedStorage extends Instance {
    shared: Folder & {
        systems: Folder;
        plugins: Folder;
    };
    client: Folder & {
        systems: Folder;
        plugins: Folder;
    };
    assets: Folder & {
        blood: Folder & {
            dripPart: BasePart;
            splatterPart: BasePart;
        };
    };
}

interface ServerScriptService extends Instance {
    server: Folder & {
        systems: Folder;
        plugins: Folder;
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
