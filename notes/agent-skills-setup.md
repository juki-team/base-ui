# Agent Skills setup

This note documents the agent skills installed for this project, where they live, and how to install / verify / update them.

This setup is **Claude-only**. Skills are installed directly into `.claude/skills/` (and `~/.claude/skills/` for global) using the `--agent claude-code` flag — no `.agents/skills/` universal location, no symlinks for other tools.

Skills are loaded automatically by Claude Code the next time a session is started in this repo. Project-local skills only activate inside this repository; global skills activate everywhere.

---

## 1. Installed skills

### Project-local — `./.claude/skills/`

Activate only inside this repository.

| Skill | Purpose |
| --- | --- |
| `vercel-react-best-practices` | React / Next.js best practices from Vercel Engineering |
| `extract-design-system` | Extract design tokens and design-system structure |
| `storybook` | Storybook story authoring guidance |
| `accessibility` | Web accessibility audits and fixes |
| `changelog-automation` | Generate and maintain CHANGELOG entries |

### Global — `~/.claude/skills/`

Activate in every project on this machine.

| Skill | Purpose |
| --- | --- |
| `code-review-pro` | Multi-pass code review |
| `webapp-testing` | Web app testing strategies (Anthropic) |
| `typescript-advanced-types` | Advanced TypeScript type patterns |

---

## 2. How skills are loaded

A skill is just a `SKILL.md` file with frontmatter. Claude Code scans `./.claude/skills/` (project) and `~/.claude/skills/` (global) at session start. It reads each skill's `description` and only loads the body when your prompt matches — they don't run by themselves and don't bloat the context window.

---

## 3. Install for Claude only

By default, the Skills CLI installs each skill to a universal `./.agents/skills/` directory and symlinks it into every supported agent's config dir (Cursor, Gemini CLI, Warp, Antigravity, Amp, Continue, Junie, etc.). To install **only for Claude Code**, pass `--agent claude-code`.

```bash
# Project-local — Claude only (run from the repo root)
npx skills add <owner/repo@skill> --agent claude-code -y

# Global — Claude only
npx skills add <owner/repo@skill> -g --agent claude-code -y

# Browse the registry
npx skills find <query>
```

Skills installed this way go straight into `.claude/skills/<skill-name>/` (or `~/.claude/skills/<skill-name>/`) as real folders — no universal copy, no extra symlinks.

### Reproducing this project's skill set

```bash
# Run from the repo root — project-local
npx skills add vercel-labs/agent-skills@vercel-react-best-practices --agent claude-code -y
npx skills add arvindrk/extract-design-system@extract-design-system    --agent claude-code -y
npx skills add dalestudy/skills@storybook                              --agent claude-code -y
npx skills add addyosmani/web-quality-skills@accessibility             --agent claude-code -y
npx skills add wshobson/agents@changelog-automation                    --agent claude-code -y

# Global
npx skills add onewave-ai/claude-skills@code-review-pro       -g --agent claude-code -y
npx skills add anthropics/skills@webapp-testing               -g --agent claude-code -y
npx skills add wshobson/agents@typescript-advanced-types      -g --agent claude-code -y
```

---

## 4. Verify installed skills

```bash
# List project skills
npx skills list

# List global skills
npx skills list -g

# Filter by agent
npx skills list -a claude-code
```

---

## 5. Update skills

```bash
# Pull the latest version of every installed skill
npx skills update

# Update a single skill
npx skills update <skill-name>

# Update only global skills
npx skills update -g
```

---

## 6. Remove a skill

```bash
# Project-local
npx skills remove <skill-name> -y

# Global
npx skills remove <skill-name> -g -y
```

If you prefer to delete by hand:

```bash
rm -rf .claude/skills/<skill-name>      # project-local
rm -rf ~/.claude/skills/<skill-name>    # global
```

---

## 7. Switching an existing universal install to Claude-only

If a skill was installed without `--agent claude-code`, it lives in `.agents/skills/` and is symlinked from `.claude/skills/`. To convert it:

```bash
# 1. Remove the universal install
npx skills remove <skill-name> -y          # add -g for global

# 2. Reinstall with Claude-only
npx skills add <owner/repo@skill> --agent claude-code -y    # add -g for global
```

After conversion, the empty `.agents/` directory can be deleted:

```bash
rmdir .agents/skills .agents 2>/dev/null
```

---

## 8. Notes

- Project-local skills live under `./.claude/skills/`. Commit this directory if you want the team to get the same skills automatically when they clone the repo.
- Always review a skill's `SKILL.md` before use — skills run with full agent permissions.
- The registry is browsable at <https://skills.sh/>.