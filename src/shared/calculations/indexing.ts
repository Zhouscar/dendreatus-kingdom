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
