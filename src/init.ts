import * as SpotAPI from "./spotify"

/* * * * * * * * * * * * * * * * * * * * * * * * *
 * NOTE
 * 1. register a project on spotify developer
 * 2. fill clientId, clientSecret to spotify.ts
 * 3. add redirectURI on both spotify developer and spotify.ts
 * 4. to get refresh_token you can read below description
 * 5. deploy to cloudflare worker
* * * * * * * * * * * * * * * * * * * * * * * * */

const first = () => {
    // get code
    // you should login with this url
    return SpotAPI.getLoginURL()
}

const second = async (code: string) => {
    // input the code from first function
    // you can get refresh token from this
    const request = await SpotAPI.getAccessToken(code)
    return request
}