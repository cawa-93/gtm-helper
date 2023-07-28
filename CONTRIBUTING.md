## Development setup

Here is a list of environment variables you should set:

- `BUILD_TARGET` : `chrome | firefox | edge`
- `VERSION_REF` : version to use due development.

Basically all environment variables may be placed into `.env.local` or `.env.[chrome|firefox|edge]`.

## Deployment

To release new version create new GitHub release with semver tag like `v0.0.0`.