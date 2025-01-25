import express from 'express'
import { setInterests, getCampains, getFeatured, createCampain,getCampaignDetails } from '../controllers/CharityController.js'
import multer from 'multer'
import EndpointHit from '../middlewares/endpointHit.js'
import isVerified from '../middlewares/isVerified.js'
import fs from 'fs'

const upload = multer({ dest: 'uploads/' });
const CharityRouter = express.Router()

CharityRouter.post('/interests', setInterests)
CharityRouter.get('/featured', getFeatured)
CharityRouter.get('/campains', getCampains)
CharityRouter.post('/createCampain',upload.single('image'),isVerified,createCampain)
CharityRouter.post('/getCampaignDetails', getCampaignDetails)

export default CharityRouter