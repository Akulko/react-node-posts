import * as http from 'http'
import fetch from 'node-fetch'
import { config } from 'dotenv'
import user from './user'
import * as jwt from 'jsonwebtoken'

config()
const hostname = process.env.HOST
const port = +process.env.PORT

const createRoute = (handler: any, isPrivate: Boolean = false) => (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept')
  res.setHeader('Access-Control-Expose-Headers', 'Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  if (isPrivate) {
    const token = req.headers.authorization
    const user = getUserByToken(token)
    if (user) {
      handler(req, res)
      return
    }
    res.writeHead(401)
    res.end()
  }

  handler(req, res)
}

const createRouter = routes => (req: http.IncomingMessage, res: http.ServerResponse) => {
  if (!routes[req.url]) {
    res.statusCode = 404
    res.end(
      JSON.stringify({
        error: `Page doesn't exists`,
      })
    )
    return
  }
  routes[req.url](req, res)
}

const server = http.createServer(
  createRouter({
    '/posts': createRoute(async (req: http.IncomingMessage, res: http.ServerResponse) => {
      try {
        const posts = await fetchPosts()
        res.end(JSON.stringify(posts))
      } catch (e) {
        console.error(e)
        res.end(
          JSON.stringify({
            error: `An error occurred during the fetch: ${e}`,
          })
        )
      }
    }, true),
    '/login': createRoute(async (req: http.IncomingMessage, res: http.ServerResponse) => {
      try {
        const user = await login(req, res)
        if (!user) {
          res.end(
            JSON.stringify({
              error: 'Incorrect credentials',
            })
          )
        }
        res.end(JSON.stringify(user))
      } catch (e) {
        console.error(e)
        res.end(
          JSON.stringify({
            error: `An error occurred during the login: ${e}`,
          })
        )
      }
    }),
    '/get-user': createRoute(async (req: http.IncomingMessage, res: http.ServerResponse) => {
      try {
        const { token } = await bodyParser<{ token: string }>(req)
        const user = getUserByToken(token)
        res.end(JSON.stringify(user))
      } catch (e) {
        console.error(e)
        res.end(
          JSON.stringify({
            error: `An error occurred during the login: ${e}`,
          })
        )
      }
    }),
  })
)

const fetchPosts = () => {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
}

const login = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const credentials = await bodyParser<{ email: string; password: string }>(req)
  if (!(user.email === credentials.email && user.password === credentials.password)) {
    return null
  }
  const token = jwt.sign({ sub: user.email }, process.env.JWT_SECRET)
  return {
    user,
    token,
  }
}

const getUserByToken = (token: string) => {
  if (!token) return
  const { sub: email } = jwt.verify(token, process.env.JWT_SECRET)
  if (user.email === email) {
    return { user, token: token }
  }
  return {
    error: `An error occurred during the login`,
  }
}

type BodyParser = <T = any>(req: http.IncomingMessage) => Promise<T>

const bodyParser: BodyParser = req => {
  return new Promise(resolve => {
    let data = []
    let body = ''
    req.on('data', chunk => {
      data.push(chunk)
    })
    req.on('end', () => {
      body = data.join('').toString()
      resolve(JSON.parse(body))
    })
  })
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
