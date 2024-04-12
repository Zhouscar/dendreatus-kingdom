// deprecated
export function backed<T>(value: T, backedValue: NonNullable<T>) {
    return value !== undefined ? value : backedValue;
}
