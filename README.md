> Notice: After March 9, 2026. Spotify WebAPI will require a premium account

# SpotStatus

If you link your discord account with spotify, discord will show what you listening on your profile.
This project let you can get what you are listening on a http API at cloudflare worker without expose your spotify API key publicly.

# Initialize

Create a project on https://developer.spotify.com/dashboard ,
Fill your clientID and clientSecret to `spotify.ts`.

```ts
const clientId = ""
const clientSecret = ""
```

Then run the init function, which will open a user consent screen.

```bash
npm run init
$ npm src/init.ts
AQBlpS********************-*******************-***********************************************************************-******BO07zM
```

After consent, you can copy the token to `spotify.ts`

```ts
const refreshToken = ""
```

# Deploy

```bash
npm run deploy
```