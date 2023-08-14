import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  root_dir: process.cwd(),
}
