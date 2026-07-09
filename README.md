# Evee's Adventure

A browser-based, choose-your-own-adventure text game starring a lost Evee (Eevee) trying to find its way home through a Pokémon-themed forest. Styled after a classic Game Boy cartridge, with retro pixel fonts and branching story paths.

## Story

A young Evee has wandered far from home. Guide it through dark caves, sunny meadows, hidden paths, and friendly Pokémon villages, making choices along the way that lead to different encounters and, ultimately, a reunion with family.

## How to Play

Just open [index.html](index.html) in any modern web browser — no build step, server, or dependencies required.

1. Press **Start** on the title screen.
2. Read each story passage.
3. Choose from the available options to continue the adventure.
4. Reach one of the story's endings, then press **Start** again to play through a different path.

## Install as an App

Evee's Adventure is an installable Progressive Web App. When visiting the site in Chrome, Edge, or another PWA-capable browser, use the install icon in the address bar (or "Add to Home Screen" on mobile) to add it as a standalone app with offline support.

## Project Structure

| File | Purpose |
|---|---|
| [index.html](index.html) | Page structure and Game Boy-style UI shell |
| [style.css](style.css) | Retro Game Boy visual styling (pixel font, red cartridge frame, Poké Ball accents) |
| [script.js](script.js) | Game engine and branching story data (`storyData`) |
| [manifest.json](manifest.json) | Web app manifest enabling "Install as App" |
| [sw.js](sw.js) | Service worker that caches the app shell for offline play |
| [icons/](icons) | App icons used for installation and favicons |

## Adding to the Story

The story is defined as a plain object (`storyData`) in [script.js](script.js). Each node has:

- `text` — the passage shown to the player
- either `choices` (an array of `{ text, nextId }` options) or `nextId` (auto-continue to the next node)
- a node with neither ends the game

To extend the adventure, add a new key to `storyData` and point an existing choice's `nextId` at it.
