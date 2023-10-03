# Learn Vim

vim snippet sharer

## Goals!

- [ ] Allow new vim users to mess around with different motions/commands
- [ ] Curate collections of motions/commands and allow users to rank them
- [ ] Language/usecase specific tags
- [ ] Clone into your vim to create collections and manuals

## Plan

Use Golang in combination with HTMX to serve a simple UI to the user. Once loaded we'll use Javascript to emulate vim motions on the text. All snippets need to also be available from a JSON api to allow a lua plugin to download and display them for users.

### UI

For the UI simplicity is key,

- dark
- monospace font
- toggle-able sidebar
- cmd menu below
- vim emulator

All pages/content will be rendered inside emulator so you can navigate the leaderboards, snippets and search functionality.

### Static Backend

Serving all the files will be done with a Golang HTTP server (echo), this serves the HTMX components when needed.

- index.hmtl
- navbar
- editor
- editorText
