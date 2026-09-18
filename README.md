# dawid.tziamtzis.com

Astro site configured for deployment as a Cloudflare Worker at
[`dawid.tziamtzis.com`](https://dawid.tziamtzis.com). Requests to
`david.tziamtzis.com` permanently redirect to the canonical hostname while
preserving the path and query string.

## Local development

```sh
pnpm install
pnpm dev
```

Build and validate the Cloudflare Worker locally:

```sh
pnpm build
pnpm wrangler deploy --dry-run
```

## Code quality

Run `pnpm lint` for Oxlint, ESLint, Astro/TypeScript diagnostics, and formatting
checks. Use `pnpm format` and `pnpm lint:fix` to apply automatic fixes. Husky
runs lint-staged before commits and enforces conventional commit messages.

## Cloudflare and GitHub setup

The `tziamtzis.com` zone must be active in the Cloudflare account used for
deployment. Before the first deploy, inspect the DNS records and Redirect Rules
for the two exact hostnames `dawid.tziamtzis.com` and `david.tziamtzis.com`.
If either hostname has a CNAME, confirm what it serves before removing it for
the cutover; Cloudflare cannot attach a Worker Custom Domain over an existing
CNAME. Wrangler will create the Custom Domain DNS records and certificates.
Leave the iCloud Mail records and the `damian.tziamtzis.com` redirect alone.

Create a Cloudflare API token from the **Edit Cloudflare Workers** template,
scoped to the account and `tziamtzis.com` zone. Add these GitHub Actions
repository secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

Push to `main` to run the first production deployment. Pull requests from this
repository receive a Cloudflare preview URL in a bot comment; fork pull requests
only run the build because secrets are unavailable.

For a manual deployment after authenticating Wrangler:

```sh
pnpm deploy
```

Both this command and the GitHub Actions deployment label the Cloudflare Worker
version with the latest commit subject.
