interface ReplicatedStorage extends Instance {
    shared: Folder & {
        systems: Folder;
        plugins: Folder;
    };
    client: Folder & {
        systems: Folder;
        plugins: Folder;
    };
    assets: Folder;
}

interface ServerScriptService extends Instance {
    server: Folder & {
        systems: Folder;
        plugins: Folder;
    };
}
