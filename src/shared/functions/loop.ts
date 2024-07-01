export default function loop(times: number, fn: (i: number) => void) {
    for (let i = 0; i < times; i++) {
        fn(i);
    }
}
