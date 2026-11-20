# Tredy Candidate Coding Assessment (TypeScript)

![Rogue Goose](https://github.com/user-attachments/assets/4f1da58b-bd97-43a3-b2e8-c418b814b77b)

This repo is a small Next.js app for searching satellites with the [Orbital Wiki API](https://www.orbitalwiki.com/developers). The form and most of the UI are already built. Your job is mostly backend work.

There are two parts:

- **Part 1:** done **by hand, without AI**.
- **Part 2:** done **with AI assistance**. We want to see how you work with it.

Expect this to take about **2 hours**. If you're going well past that, stop and write down where you got to and what you'd do next. That's a perfectly fine submission.

There's also a [Go track](https://github.com/tredy-ai/rogue-goose-ts) (an MCP server around the same API). Do whichever you prefer, or both if you like.

---

## Setup

1. **Create your repo.** Click "Use this template" and create a **private** repository. Add **jalavosus and ToFut** as collaborators.
2. **Install the tools.** You need **Bun** (package manager and script runner) and **Node.js LTS** (the runtime Next.js and Vitest run on). See [Installing Bun and Node.js](#installing-bun-and-nodejs) below.
3. **Get an API key.** Create a free account at [orbitalwiki.com](https://www.orbitalwiki.com/developers/quickstart) and generate a key in the dashboard. The key is shown only once, so save it. The free tier allows 1,000 requests a day, which is plenty. Without a key, you share 50 requests a day with everyone on your network.
4. **Configure:** copy `.env.example` to `.env.local` and paste your key into it.
5. **Run:**
   ```sh
   bun install
   bun dev            # http://localhost:3000
   bun run test
   ```

The API reference is `docs/openapi.json` (a copy of https://www.orbitalwiki.com/api/v1/openapi.json). Everything you need to know about the API is in there.

### Commands

| What | Command |
|---|---|
| Install dependencies | `bun install` |
| Add a dependency | `bun add <pkg>` (or `bun add -d <pkg>` for dev-only) |
| Dev server | `bun dev` |
| Run tests | `bun run test` |
| Tests in watch mode | `bun run test:watch` |
| Lint + format check ([Biome](https://biomejs.dev)) | `bun run lint` |
| Auto-fix lint, formatting and imports | `bun run lint:fix` |
| Type-check | `bun run typecheck` |
| Format only | `bun run format` |
| Production build | `bun run build` |

> ⚠️ **Use `bun run test`, not `bun test`.** `bun test` starts Bun's own built-in test runner instead of this project's Vitest setup. The repo is configured to stop and remind you if you type it.

Please use Bun for package management, not npm, yarn or pnpm, so the lockfile stays `bun.lock`.

### Installing Bun and Node.js

**macOS** (in Terminal):

```sh
# Bun
curl -fsSL https://bun.com/install | bash
# Node.js LTS: use whatever you already use (Homebrew, nvm, fnm, Volta), or the installer from https://nodejs.org
brew install node        # if you use Homebrew
```

**Windows** (in PowerShell; Bun needs Windows 10 version 1809 or later):

```powershell
# Bun
powershell -c "irm bun.sh/install.ps1|iex"
# Node.js LTS: use the installer from https://nodejs.org, or:
winget install OpenJS.NodeJS.LTS
```

Then **open a new terminal** and check that both are on your PATH:

```sh
bun --version
node --version     # must be 20.9 or newer (the repo's .nvmrc has the exact LTS line)
```

If `bun --version` isn't recognised on Windows, the installer probably couldn't update your PATH. `& "$env:USERPROFILE\.bun\bin\bun" --version` checks the binary directly. If you already have Node, `npm install -g bun` also works on any platform.

Windows note: run the commands in PowerShell or WSL. `cp` in the setup steps works in PowerShell. In `cmd.exe`, use `copy .env.example .env.local` instead.

---

## Rules on AI use

**Part 1: AI does not write your code.** That means:

- no chat assistants (ChatGPT, Claude, Copilot Chat, etc.)
- no coding agents
- no multi-line AI completions that fill in function bodies

Ordinary editor autocomplete, including short single-line suggestions, is fine. So are the OpenAPI spec, MDN, the Next.js / TanStack Query / Vitest docs, Stack Overflow and any other documentation. If your editor has multi-line AI completion (Copilot, Cursor Tab, etc.), turn it off before you start.

**Part 2: use whatever AI tools you like.**

After you submit, we'll have a short call (about 30 minutes). You'll walk us through your Part 1 code, then make a small change to it live, without AI. That call is how we check Part 1. We're not going to try to guess from your commits.

---

## Part 1: the search handler (no AI)

The form submits multipart `FormData` to `POST /api/search`. Right now that returns 501. Make it work end to end.

### 1. `src/app/api/search/route.ts`

Implement the `POST` handler so that it:

- **Reads and validates the form.** The field names and values are whatever the UI sends; see `src/lib/form-options.ts` and `src/components/SearchForm.tsx`. They are **not** what the API expects.
  - `missionStatus` is required.
  - `howMany` is free text. Decide what counts as valid; the API accepts a limit of 1–100.
  - Invalid input gets a `400` with a `SearchFailure` body (`src/lib/view-types.ts`), with `field` set to the offending field.
- **Translates** the form values into a valid `GET /search` request, according to `docs/openapi.json`.
- **Calls Orbital Wiki** with your API key (`getApiKey()` in `src/server/env.ts`). The key must stay on the server.
- **Maps the response** to `SearchSuccess`. The UI shows display labels (e.g. "Low Earth (LEO)"), not API codes.
- **Handles upstream failures** sensibly. Return a `SearchFailure` with an appropriate status code, and don't leak the API key or raw upstream error bodies to the browser.

Put types and helpers wherever you think they belong. `src/server/` is a reasonable home.

### 2. `parseSearchResponse` in `src/hooks/useSearch.ts`

Turn the handler's response into a `SearchSuccess`, or throw a `SearchRequestError`.

### 3. `src/components/SearchPage.tsx`

Show the loading state, errors (using `ErrorMessage`) and results (using `ResultsTable`) from the mutation.

### 4. Tests

Write unit tests with [Vitest](https://vitest.dev) for your **backend** code: translation, validation, response mapping and the handler itself. They don't need to be exhaustive; we just want to see how you test. Mock the network, because tests must not call the real API. Frontend tests aren't needed. `src/server/env.test.ts` and `src/app/api/search/route.test.ts` show the basic patterns.

Leave `ResultsTable` alone in Part 1. Improving it is Part 2.

**You're done with Part 1 when:**

- searching with different combinations of filters shows matching satellites
- bad input shows a useful error
- `bun run lint`, `bun run typecheck` and `bun run test` all pass

Commit as you go; small commits are welcome. When you're finished:

```sh
git tag part-1 && git push origin part-1
```

---

## Part 2: satellite detail view (with AI)

1. **Clicking a result row opens a detail view** for that satellite, using `GET /satellites/{norad_cat_id}`. Start from the empty component in `src/components/SatelliteDetail.tsx`, and add whatever backend route you need. Same rule as before: the key stays on the server.
2. **The detail view shows the satellite's key facts and its `claims`.** Each claim is a sourced statement about one field. Group the claims by field, and when sources disagree about a field, make that obvious.
3. **Make the results table look less bad.** We're not grading design taste here. We're looking at how you work with AI to get there.
4. **Write tests** for any backend code you add.

### Logging your AI use

Everything goes in `ai-log/`:

- **Raw transcripts or exports** from the tools you used, unedited. For example:
  - Claude Code: the `.jsonl` files under `~/.claude/projects/<this-project>/`
  - Cursor: export the chat
  - ChatGPT / Claude.ai: share links or copied conversations
- **Specs, plans and brainstorms**, whether you wrote them or the AI did.
- **`ai-log/NOTES.md`**, a few paragraphs covering:
  - what you asked for and why
  - what the AI got wrong, or what you rejected
  - how you checked its work

`AGENTS.md` (which `CLAUDE.md` also loads) tells coding agents to save their plans into `ai-log/` and to stay out of the Part 1 code. You're free to change it, but if you do, tell us why in your notes.

When you're finished:

```sh
git tag part-2 && git push origin part-2
```

---

## Submitting

Push both tags, then let **Jamie (jamie@tredy.ai)** know. Anything you want us to know goes in `ai-log/NOTES.md` or the message.

## What we look at

- **Part 1:**
  - correctness
  - validation and error handling
  - how you structured the translation
  - your tests
  - keeping the key on the server
  - a readable commit history
- **Part 2:**
  - whether it works
  - how you directed the AI (specs, prompts, iteration)
  - what you caught and fixed
  - your tests

Visual design is **not** assessed.
