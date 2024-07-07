export function useTestLog() {
    let i = 1;
    return () => {
        print(i++);
    };
}
