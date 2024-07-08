A bit disappointed in how some stuff are handled by roact and some are handled by ecs system

# TODO

- [x] Respawning after death
- [x] Safe Zones (not tested)
- [x] Fixing character deleting
- [x] character fade when delete
- [x] Rework Chat system
- [x] Make stuff clickable (interactables, hotbar)
- [x] Given button click and hover sound
- [x] Rework reset character button
- [x] Make damage camera shake less buggy
- [x] Drowning respawns
- [x] Improve title card and death screen buttons
- [x] Rework player nametags (ranks)
- [x] Improve health bar and hunger bar to the top of the screen
- [x] different footstep sound on different surfaces
- [x] Rework Roact (deathscreen, gamescreen, inventory, sign screen, title card, chat screen)
- [x] Signs (component, state, ui)
- [x] Rank Based Tools
- [x] Seats
- [x] Some more damage effects
- [x] Rework item activation in Roact
- [x] Item Setup (tools, images, descriptions and stack sizes, consumables, and attackables)
- [x] Harvestable setup
- [x] Item holding animations
- [x] Fix atmosphere (only one atmosphere can be present at a time)
- [x] Low health effects (shaking, intense music)
- [x] Low hunger effects
- [x] Adding Sound (start sound, respawn sound, switch pages sound, harvest sound, switch item sound, sword swing sound, sword hit sound, eating sound)
nmr
- [ ] Waypoints

- [ ] More signs

# The streaming issue

StreamingEnabled means that
- when the renderable is passed from the server, the client can get undefined version of that
- PVInstance in the client can randomly be removed and added without knowing whether it is being streamed in or out just added or removed

My solution to this problem is this:
- A new Component called ServerRenderable that tells the client that a model may not be streamed in but it exists
- Renderable is now not replicated, ServerRenderable is replicated

Rule
- ServerRenderable should not be touched because it is only a component to communicate between client and server

- Make sure animatable, human, physically equipping follows Renderable, because an entity can now exist but not streamed in
- They are also no longer replicated but strictly follows Renderables


# Post Demo

- [ ] Carthage

- [ ] Item Randomizer Harvestables