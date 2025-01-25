import  userModel from '../mongodb/Models/userModel.js'
import jwt  from  'jsonwebtoken'
import formidable from 'formidable'

const isAuthAndVerified = async (req, res, next) => {
    console.log(req.body)
    const { email } = req.body
    const authHeader = req.headers.authorization
    console.log(email)
    console.log(authHeader)
    const user = await userModel.findOne({ email })
    const token = authHeader.split(' ')[1]

    if (!user) {
        return res.status(400).json('user does not exists ')
    }
    console.log(user)
    if (user.isVerified==false) {
        return res.status(400).json('please verify your account before visitin other pages')
    }

    const verified =  jwt.verify(token,process.env.JWT_SECRET_KEY)
    if (!verified) {
        return res.status(400).json('the token has expired')
    }
    if (verified._id !== user._id.toString()) {

        return res.status(400).json('you send a token that was not yours')
    }
  
    next()

}

export default isAuthAndVerified