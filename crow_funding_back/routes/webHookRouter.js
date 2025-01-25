import express from 'express'
import {handleWebHook} from '../controllers/webHookController.js'
const WebHookRouter = express.Router()

WebHookRouter.post('/', express.json({ type: 'application/json' }), handleWebHook)

export default WebHookRouter 