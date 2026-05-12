---
"@duskit/components": minor
---

feat(components)!: **BREAKING CHANGE** implement complete notification and toast ecosystem and replace legacy toast

Key additions:

- Core logic: Event-driven emitter and a store factory to handle state, deduplication, and atomic namespace transitions.
- Context management: A provider component to manage the application context and synchronize persistent storage.
- Base UI: The core Notification component supporting both inline panels and floating toasts with distinct status types.
- Toast controller: A dedicated container managing the lifecycle of floating notifications, utilizing a highly optimized requestAnimationFrame loop with visibility change detection to handle decay animations and automatic dismissal gracefully.
- Notification Feed & Panel: A list view to display, read, and dismiss panel notifications, alongside a Drawer-based wrapper (NotificationPanel) with ARIA live region announcements for unread counts, providing a complete sliding sidebar experience.
- Counter Icon: A reactive icon component featuring a custom bounce animation, ideal for displaying unread notification badges.

**BREAKING CHANGE**: The legacy toast system has been completely removed and replaced by the new notification ecosystem.
