---
"@duskit/components": major
---

refactor(css / components)!: stabilize token contracts, layout mechanics and component anatomy

- updated styles of `Banner` and `Icon` to use the new icon size contracts
- updated `Drawer` and `NotificationFeed` to use the new layout boundary contracts
- added `Heading` component
- tweaked paddings of interactive components
- buttons in the "naked" variant now have a default padding
- added a more distinct style to toggle buttons while pressed
- gave a fixed line height of `1.5` to `Agreement`, `Button`, `ContentSwitch`, `ExclusiveChoice`, `Select`, `Tabs` and `Textbox` instead of inheriting it
- icon buttons are now guaranteed to be square
- updated `ContentSwitch` to use standard padding and font size
- added missing `min-block-size` in `ContentSwitch` and `Tabs` interactive elements
- updated `Tabs` to used the "naked" variant for scroll buttons
- stabilized header height in `Notification` by deriving minimum block size from interactive density tokens
- added a defensive layout rule to ensure card structural slots always stretch to the full available width, preventing parent flex alignment from affecting the component layout
- added `flex: 1` to `Banner`'s content wrapper to ensure it spans the full remaining width next to the icon
- prevented layout blowout in `Banner` and text overflow when handling long unbreakable strings
