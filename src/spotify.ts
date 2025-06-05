const clientId = ""
const clientSecret = ""
const redirect_uri = "http://127.0.0.1:8787/callback"
const refreshToken = ""

const getRandomString = (length: number) => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const getLoginURL = () => {
    const state = getRandomString(16)
    const scope = "user-read-currently-playing"
    const url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`
    return url
}

const getAccessToken = async (code: string) => {
    const payload = {
        method: "POST",
        headers: {
            content_type: "application/x-www-form-urlencoded",
            Authorization: "Basic " + btoa(clientId + ":" + clientSecret)
        },
        body: new URLSearchParams({
            code : code, 
            redirect_uri : redirect_uri,
            grant_type: "authorization_code"
        }),
    }
    const body = await fetch("https://accounts.spotify.com/api/token", payload)
    const response = await body.json()
    return response
}

const getMyMusic = async (code: string) => {
    const payload = {
        headers: {
           content_type: "application/x-www-form-urlencoded",
           authorization: `Bearer ${code}`
        },
    }
    const body = await fetch("https://api.spotify.com/v1/me/player/currently-playing", payload)
    try{
        const response = await body.json()
        return {
            "status": "6",
            "data":response
        }
    }catch(err){
        return {
            "status": "QQ", 
            "data": {}
        }
    }
}

const getRefreshToken = async () => {
    const url = "https://accounts.spotify.com/api/token"
    const payload = {
        method: "POST",
        headers: {
            content_type: "application/x-www-form-urlencoded",
            authorization: "Basic " + btoa(clientId + ":" + clientSecret)
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        })
    }
    const body = await fetch(url, payload)
    const response = await body.json()
    return response
}

export { getLoginURL, getAccessToken, getMyMusic, getRefreshToken } 