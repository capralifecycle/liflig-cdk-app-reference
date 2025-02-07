# liflig-cdk-app-reference

This is a companion to [webapp-baseline](https://github.com/capralifecycle/webapp-baseline).

The webapp being deployed is located in https://github.com/capraconsulting/webapp-baseline

## Checklist if using this reference

- Consider removing [LICENSE](LICENSE)
- Modify [src/config.ts](src/config.ts)
- Modify `artifactsBucket` in pipelines under `src/pipelines`
- Modify stacks under `src/stacks` to fit the application
- Modify [.ldp.json](.ldp.json) with the relevant AWS configuration for the application
- Remove `disable job`-step in [.github/workflows/ci.yml](.github/workflows/ci.yml)
- Review dependencies

## Pre-commit checklist

1. Lint

   ```bash
   npm run lint
   ```

1. Update and review snapshots

   ```bash
   npm run snapshots
   ```
