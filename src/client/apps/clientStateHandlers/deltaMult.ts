export default function deltaMult(dt: number, mult: number) {
    return math.clamp(dt * mult, 0, 0.4);
}
