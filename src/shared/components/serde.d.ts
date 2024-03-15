import { AnyComponent, GenericOfComponent } from "@rbxts/matter";
import { Components } from "shared/components";

export type ComponentNames = keyof typeof Components;

export type ComponentsMap = { [K in ComponentNames]: MappedComponentToName<K> };

export type MappedComponentToName<T extends ComponentNames> = GenericOfComponent<
    ReturnType<(typeof Components)[T]>
>;
type UnionComponentsMap = ComponentsMap[ComponentNames];

export type ReplicationMap = Map<
    string,
    Map<
        string,
        {
            data: AnyComponent;
        }
    >
>;

export type SyncMap = ReplicationMap;
