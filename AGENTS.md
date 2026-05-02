<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

<!--VITE PLUS END-->

# Project Notes

## Maintaining This File

- Keep this file updated when making important project-wide decisions about structure, naming, styling, state, data access, validation, deployment, or tooling.
- Do not document one-off implementation details here; only record conventions that future work should follow.

## Product Direction

Build a mobile-first Quiddler scorekeeper for a single game master.

MVP scope:

- Create a game.
- Add players.
- Track each round's scores.
- Show totals and the current leader.
- Review round history.
- Check word validity with a free dictionary API.

Technical direction:

- Local-first PWA so scores stay saved on the device and the app can be installed.
- Planned stack is Vite+ + React + React Router, TypeScript, PandaCSS, Zustand persisted state, `vite-plugin-pwa`, Free Dictionary API, Docker + Dokploy.
- Target domain is `quiddler.iacono.dev`.

## Naming

- Use lowercase kebab-case for source file and folder names under `src`.
- Keep React component exports in PascalCase so JSX can render them normally.
- Prefer arrow functions assigned to `const` wherever the framework does not require a function declaration.
- Prefer named exports over default exports wherever the framework does not require a default export.
- Use required framework/tooling filenames as-is when a tool expects them, such as `AGENTS.md`, `README.md`, or config files.

## Structure

- Use a vertical, route-first structure rather than horizontal buckets.
- Put route slices under `src/routes/<route-name>/`.
- Do not add a `pages` folder; this project calls route-owned UI `routes`.
- Keep route-specific components, styles, helpers, stores, and tests colocated inside their route slice unless they are genuinely shared.
- Keep app-level wiring, such as the route table, under `src/app/`.
- Keep `src/main.tsx` as the React entry point.
- Use the `@/` import alias for shared or cross-slice imports from `src`.
- Add slice entry points with `index.ts` when they make cross-slice imports cleaner, such as `@/app` or `@/routes/home`.

## Styling

- Use PandaCSS for component and route styles.
- Import Panda generated modules through `@styled-system/*`.
- Put component styles in a colocated `.styles.ts` file.
- Export a named object called `styles` from each `.styles.ts` file.
- Define style values inside that `styles` object using Panda's `css()` function.
- Keep `.tsx` files focused on markup and behavior by importing `styles` from the colocated style file.
- Keep global CSS in `src/index.css` limited to Panda layers, resets, and document-level defaults.
- The generated `styled-system` folder is ignored; run `vp run panda:codegen` if it needs to be recreated.

## Copy And I18n

- Keep user-facing strings in the i18n copy layer rather than hard-coding them in components.
- Use `src/i18n/locales/en.ts` as the English source copy file.
- Import copy through `src/i18n/copy.ts` so a future full i18n provider can replace that entry point without changing every route.
- Do not add a full i18n runtime library until the app needs locale switching, formatting, pluralization, or external translation workflows.

## Accessibility

- Treat WCAG 2.2 AA as the baseline for user-facing work, and prefer inclusive defaults even when a requirement is not explicitly covered by automated checks.
- Start with semantic HTML: use meaningful landmarks, headings in document order, lists for grouped content, and native links or buttons for interactive controls before reaching for ARIA.
- Give every interactive control an accessible name, a visible focus state, and keyboard behavior that works with Tab, Shift+Tab, Enter, Escape, and Space where those keys are expected.
- Keep visible text, accessible labels, image alt text, form labels, helper text, error text, and status messages in the i18n copy layer when they are user-facing.
- Do not remove browser focus outlines without replacing them with a clearly visible PandaCSS focus style that passes contrast expectations.
- Do not rely on color alone to convey state. Pair color with text, iconography, shape, or another non-color cue.
- Respect reduced-motion preferences for non-essential animation, transitions, parallax, smooth scrolling, and auto-playing movement.
- For images and media, provide useful alt text for informative content, empty alt text for decorative images, captions or transcripts when needed, and avoid text embedded only in images.
- For forms, pair every field with a programmatic label, connect help and error text with ARIA relationships, and make validation errors readable without moving focus unexpectedly.
- Validate substantial UI changes with keyboard-only navigation and at least one accessibility-oriented check, such as browser accessibility inspection or an automated audit, in addition to `vp check`.

## Documentation

- Add TSDoc comments to utility functions, including utility functions defined inside components.
- Add a one-line TSDoc summary to each type and interface.
- Add a one-line TSDoc comment to each attribute in each type or interface.
- Add inline comments only for complex logic or major function sections where they improve readability.
- Keep comments concise and focused on intent, constraints, or non-obvious behavior.

## Validation

- Run `vp check` after source changes.
- Run `vp run build` when route, root, styling, dependency, or build-related files change.
- Run `vp test` when tests exist or when changes touch tested behavior. If no test files exist, note that `vp test` exits because there are no matching test files.
