# Move Top Panel Gnome Extension

Don't use this. It barely works, and I'm not going to publish this or offer support for now.

This extension allows you to move the Gnome top panel to a non-primary monitor.

## Motivation

Especially with multi-monitor setups, I don't want to give up vertical space on my primary monitor for a clock and notifications, but I do want my dock on my primary display, and good behavior for full screen applications that launch on my primary monitor.

## What's missing

Before I really feel okay with recommending this to anybody aside from me, the following is needed:

- Find a better way to enumerate and list monitors in settings
- Find out how to listen for monitor change events
  - Reset monitor-count on monitor change events (requires restart now)
  - Use monitor enumeration to try to keep top bar on same monitor
- Allow changing position of the top panel from the top panel (only in preferences now)
