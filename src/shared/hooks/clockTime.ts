const DAY_NIGHT_CYCLE_LENGTH_MINUTES = 0.2;

export function getClockTime() {
    return (((os.clock() / DAY_NIGHT_CYCLE_LENGTH_MINUTES) * 24) / 60) % 24;
}
