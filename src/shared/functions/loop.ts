export default function loop(times: number, fn: () => void) {
    for (let i = 0; i < times; i++) {
        fn();
    }
}
