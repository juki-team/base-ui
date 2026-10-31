# Juki Base UI

## Documentation

See https://juki-team.github.io/base-ui

## Available Scripts

This project uses [pnpm](https://pnpm.io) (see `packageManager` in `package.json`).

```shell
pnpm install --frozen-lockfile
```

### Storybook

To run storybook locally
```shell
pnpm dev
```

To build storybook
```shell
pnpm build:storybook
```

### To sync with juki commons

```shell
pnpm pull
```

### To build base ui
```shell
pnpm build:rollup
```

### To publish base ui

Commit the pending changes, bump the patch version, build, tag, publish to npm and push:
```shell
pnpm push-commit "commit message"
```

With no pending changes:
```shell
pnpm push
```
