import { Hono } from "hono"
import { cors } from "hono/cors"
import { getRefreshToken, getMyMusic } from "./spotify"

const app = new Hono()

app.use(
  '/api/*',
  cors({
    origin: ["http://127.0.0.1:4000", "https://xiulan.me"],
  })
)


app.get("/api/spotify", async (c) => {
  const token: TokenInfo = await getRefreshToken()
  const data = await getMyMusic(token.access_token)
  return c.json(data)
})


export default app
