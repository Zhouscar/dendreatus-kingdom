export function useTestLog(thisScript: Instance) {
    let i = 1;
    return () => {
        print(`${i++} at ${thisScript.GetFullName()}`);
    };
}
