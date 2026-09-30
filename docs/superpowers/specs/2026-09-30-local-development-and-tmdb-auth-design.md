# Local Development and TMDb Authentication Repair

## Goal

Make the existing Movie Explorer start with `npm run dev`, retrieve live TMDb data with the credential supplied for local development, and verify the principal user journeys without redesigning the application.

## Current Failures

- `package.json` has no `dev` script, so `npm run dev` fails before the application starts.
- The supplied 32-character TMDb credential is a valid v3 API key. The Axios client currently treats every configured credential as a Bearer read token, so TMDb responds with HTTP 401.
- The local server was not running during the initial check, so the open `localhost:3000` tab could not load the application.

## Design

### Development command

Add a `dev` script that invokes the existing Create React App development server. Keep the existing `start` command for backward compatibility and update the setup documentation to show either command accurately.

### Authentication compatibility

Keep a single public configuration value, `REACT_APP_TMDB_API_TOKEN`, so existing local and deployment configuration continues to work. At request time:

- Treat a 32-character hexadecimal value as a TMDb v3 API key and send it as the `api_key` query parameter.
- Treat other non-empty values as TMDb API Read Access Tokens and send them in the `Authorization: Bearer` header.
- Preserve the existing missing-credential rejection and normalized UI error handling.

This supports the provided key without breaking users who already configured a Bearer token.

### Verification

Add focused unit coverage for both authentication modes and the missing-credential case. Run the full automated test suite and production build. Start the application with `npm run dev`, confirm the local server responds, and exercise login, trending retrieval, search, filtering, movie details, favorites, theme switching, navigation, and error/empty-state behavior with the available browser automation. If browser security blocks automation of the local origin, cover the same behavior with React Testing Library plus direct HTTP and API checks, and report that browser-control limitation explicitly.

## Scope and Safety

- Do not change the visual design or product requirements.
- Do not persist or print the credential in test output.
- Do not add a backend or expose any credential beyond the existing browser-based TMDb request model.
- Keep local credential files out of version control.

