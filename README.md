# liflig-cdk-app-reference

This is a companion to https://confluence.capraconsulting.no/x/0NoBC

## Checklist if using this reference

- Modify `config.ts`
- Modify `artifactsBucket` under `src/pipelines`
- Artifact bucket and role in Jenkinsfile must be changed
- Modify pipeline names in Jenkinsfile
- Remove JOB_NAME check in Jenkinsfile

## Pre-commit checklist

1. Lint

   ```bash
   npm run lint
   ```

1. Update and review snapshots

   ```bash
   npm run snapshots
   ```
