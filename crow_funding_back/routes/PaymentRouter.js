import express from 'express'
import {pay} from '../controllers/PaymentController.js'
import EndpointHit from '../middlewares/endpointHit.js'
import isVerified from "../middlewares/isVerified.js"
const PaymentRouter = express.Router()

PaymentRouter.post('/donate',isVerified,pay)


export default PaymentRouter