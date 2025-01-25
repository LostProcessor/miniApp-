import { getUsers, findUser, login, register,  verifyCode, sendVerification  } from  '../controllers/AuthController.js'
import  express from 'express'
import EndpointHit from '../middlewares/endpointHit.js'
const AuthRouter = express.Router()


AuthRouter.post('/register', register)
AuthRouter.post('/login', login)
AuthRouter.post('/findUser', findUser)
AuthRouter.post('/getUsers', getUsers)
AuthRouter.post('/sendVerification', sendVerification)
AuthRouter.post('/verifyCode', verifyCode)


export default AuthRouter