# body-parser Peacock Fork

Changes made:

- Clean out the package to only it's base
- Add TypeScript type definitions
- Update iconv-lite to 0.6
- Remove extra dependencies on `depd`, `debug`, `raw-body` (see `lib/raw-body.js`), `qs`
- Add prototype pollution protection to JSON body-parser middleware
- Switch dev setup to use Yarn 3, remove tests
- Require Node 12 or newer
- Add TypeScript and types packages to dev dependencies for extra IDE completion and other features

## Why does this exist?

Peacock bundles all dependencies into chunks before being distributed to users.
We want a smaller version of this library (fewer dependencies, smaller bundle size).
We are putting it as an open source project mostly for convenience, and don't suggest you use this package.
