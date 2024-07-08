export function index<T extends Instance>(instance: Instance, directory: string): T | undefined {
    let current = instance;
    let halted = false;

    directory.split(".").forEach((to) => {
        if (halted) return;
        if (to === "") return;

        const child = current.FindFirstChild(to);
        if (!child) {
            halted = true;
            return;
        }

        current = child;
    });

    return halted ? undefined : (current as T);
}

export function indexPossible(startingInstance: Instance, directory: string): Instance[] {
    let current = [startingInstance];

    directory.split(".").forEach((to) => {
        if (to === "") return;

        const previous = current;
        current = [];

        previous.forEach((instance) => {
            const validChildren = instance.GetChildren().filter((child) => child.Name === to);
            validChildren.forEach((child) => {
                current.push(child);
            });
        });
    });

    return current;
}
