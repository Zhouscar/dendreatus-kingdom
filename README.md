# TODO

## local cannot interact
- [done] replicated cannot interact would override though.
- [done] I can use it for player acting cooldown

## protected bidirectional component based remote
- create protectedBidirectional components to send data to the server instead of creating more events

### plan
- [done not tested] replace "playerDamage" route by making "Damage" bidirectional
- replace "playerInteract" route by making "Interacted" bidirectional

## player crafting

### plan

- [done] create craftable component and initialize it from the tag with interactable
- [done] create an item bar ui for the craftable, make sure it hides and shows
- [done] create the action including taking it away the item from the reflex store and inserting it into the component
- insert cannot interact with cooldown and once the cooldown ends the item is popped out, if it doesn't have a recipe then the original items are popped out