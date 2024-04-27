export function randomChoice<T>(...choices: T[]): T {
    return choices[math.random(0, choices.size() - 1)];
}
