# Removing `Co-Authored-By: Claude` from Git history

This note documents how to rewrite git history to:

1. Remove `Co-Authored-By: Claude ...` lines from commit messages.
2. Replace commits authored or committed by `Claude` with your own name and email.

> **Warning:** rewriting commits that are already pushed requires `push --force-with-lease`. It changes commit SHAs and impacts anyone who has a local copy of the affected branches. Coordinate with collaborators first.

---

## 1. Find the commits to rewrite

Before doing anything destructive, inspect what would change.

```bash
# Commits whose message contains the co-author trailer
git log --all --grep="Co-Authored-By: Claude" -i --format="%H %s"

# Commits whose author or committer is "Claude"
git log --all --author="Claude"   --format="%H %s"
git log --all --committer="Claude" --format="%H %s"
```

---

## 2. Back up the current state

Always create a safety branch before rewriting history.

```bash
git branch backup/pre-rewrite
```

If you ever need to abort:

```bash
git reset --hard backup/pre-rewrite
```

---

## 3. Choose a rewrite strategy

### Option A — `git filter-repo` (recommended)

Modern, fast, actively maintained. Requires installation.

```bash
brew install git-filter-repo
git filter-repo --version
```

Rewrite messages and identities in one go:

```bash
git filter-repo \
  --message-callback '
    import re
    return re.sub(rb"\n*Co-Authored-By: Claude.*", b"", message)
  ' \
  --commit-callback '
    if commit.author_name == b"Claude":
        commit.author_name = b"YOUR NAME"
        commit.author_email = b"you@example.com"
    if commit.committer_name == b"Claude":
        commit.committer_name = b"YOUR NAME"
        commit.committer_email = b"you@example.com"
  '
```

Replace `YOUR NAME` / `you@example.com` with your real identity.

> `git filter-repo` removes the `origin` remote by default after a rewrite as a safety measure. Re-add it with `git remote add origin <url>` when you are ready to push.

### Option B — `git filter-branch` (built-in, no install)

Slower and officially deprecated, but works without extra tooling.

```bash
git filter-branch -f \
  --msg-filter '
    sed "/^Co-Authored-By: Claude/d" | sed -e :a -e "/^\n*$/{$d;N;ba" -e "}"
  ' \
  --env-filter '
    if [ "$GIT_AUTHOR_NAME" = "Claude" ]; then
      export GIT_AUTHOR_NAME="YOUR NAME"
      export GIT_AUTHOR_EMAIL="you@example.com"
    fi
    if [ "$GIT_COMMITTER_NAME" = "Claude" ]; then
      export GIT_COMMITTER_NAME="YOUR NAME"
      export GIT_COMMITTER_EMAIL="you@example.com"
    fi
  ' -- --all
```

What it does:
- `--msg-filter`: deletes any line starting with `Co-Authored-By: Claude` and trims trailing blank lines.
- `--env-filter`: replaces author/committer identity when it equals `Claude`.
- `-- --all`: rewrites every local branch.

### Option C — `git rebase -i` (manual, only practical for a few commits)

```bash
git rebase -i --root
# or from a specific base commit:
git rebase -i <sha>
```

Mark each commit you want to fix as `reword` (or `r`). When the editor opens the message, delete the `Co-Authored-By: Claude ...` line and save.

This option does **not** change the author. To also change identities, add `--exec`:

```bash
git rebase -i <sha> --exec '
  if [ "$(git log -1 --format=%an)" = "Claude" ]; then
    git commit --amend --no-edit \
      --author="YOUR NAME <you@example.com>"
  fi
'
```

---

## 4. Verify the rewrite

After the rewrite finishes, both queries should return empty:

```bash
git log --all --grep="Co-Authored-By: Claude" -i --format="%H %s"
git log --all --author="Claude" --format="%H %s"
```

Inspect a few rewritten commits to confirm message and identity look correct:

```bash
git log -n 10 --format=fuller
```

---

## 5. Push the rewritten history

Only after verification, and only if you accept that the remote history will be rewritten:

```bash
git push --force-with-lease origin <branch>
```

`--force-with-lease` aborts the push if someone else pushed new commits since your last fetch — safer than a plain `--force`.

If you rewrote multiple branches, push each one explicitly. **Avoid** `git push --force --all` unless you fully understand the impact.

---

## 6. Tell collaborators

After force-pushing a rewritten branch, anyone with a local clone needs to either:

- Re-clone the repository, or
- Reset their local branch:
  ```bash
  git fetch origin
  git reset --hard origin/<branch>
  ```

Any in-progress work on the old history must be saved (cherry-pick or stash) before resetting.

---

## 7. Recovering from mistakes

If the rewrite produced a wrong result, restore from the backup branch you created in step 2:

```bash
git reset --hard backup/pre-rewrite
```

If you already deleted the backup, `git reflog` lists every recent HEAD position and is usually enough to recover:

```bash
git reflog
git reset --hard <reflog-entry>
```