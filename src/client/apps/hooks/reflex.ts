import { UseProducerHook, UseSelectorHook, useProducer, useSelector } from "@rbxts/roact-reflex";
import { RootProducer } from "client/store";

export const useRootProducer: UseProducerHook<RootProducer> = useProducer;
export const useRootSelector: UseSelectorHook<RootProducer> = useSelector;
