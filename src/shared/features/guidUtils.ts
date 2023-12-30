import { HttpService } from "@rbxts/services";
import Sift from "@rbxts/sift";

function newGuid() {
    return HttpService.GenerateGUID(false);
}

export function createGuidPool(count: number = 100): string[] {
    const pool = [];
    for (let i = 0; i < count; i++) {
        pool.push(newGuid());
    }
    return pool;
}

export function useGuidPool(guidPool: string[]) {
    const pool = Sift.Array.copy(guidPool);
    return () => {
        const guid = pool.pop();
        assert(guid, "Ran out of guids in pool");
        return guid;
    };
}
