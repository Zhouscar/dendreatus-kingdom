# TODO

## local cannot interact
- replicated cannot interact would override though.
- I can use it for player acting cooldown

## player cooking

### procedure
- hold an item
- press the interact button
- then place the item inside
- wait a bit
- drops out the cooking item


### plan

- [done] create cookable component and initialize it from the tag with interactable
- create an item bar ui for the cookable, make sure it hides and shows
- create the action including taking it away the item from the reflex store and inserting it into the component
- insert cannot interact with cooldown and once the cooldown ends the item is popped out, if it doesn't have a recipe then the original items are popped out