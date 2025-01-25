import userModel from "../mongodb/Models/userModel.js"
import campainModel from '../mongodb/Models/campainModel.js'
import cloudinary  from 'cloudinary'
import multer from 'multer'
import fs from 'fs'
import Stripe from 'stripe'


cloudinary.config({
    cloud_name: "dicmixl5l",
    api_key: "442332846527398",
    api_secret: "CY7oU9PtPSfoCoCWtj_F1ygDKXM",
});

const setInterests = async (req, res) => {
    try {
        console.log(req.body)
        const { interests, email } = req.body
        const user = await userModel.findOne({ email })
        user.interests = interests
        await user.save()
        return res.status(200).json('0K')
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
    }
   

}


const getFeatured = async (req, res) => {
    try {
        const featured = await campainModel.aggregate([{ $sample: { size: 4 } }]);
        return res.status(200).json(featured)
    } catch (e) {   
        console.log(e)
        return res.status(500).json('error occured in server')
    }
    
}

const getCampains = async (req, res) => {
    try {
        const campains = await campainModel.find({})
        return res.status(200).json(campains)
    } catch (e) {
        console.log(e)
        return res.status(500).json('error occured')
    }
  
}


const createCampain = async (req, res) => {
    try {
        console.log('he')
        const { kindOfCampain, name, target, description } = req.body;
        const file = req.file;
        if (!file) {
            console.log('hihihih')
            return res.status(400).json({ message: 'Image file is required' });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path);

        // Clean up local file
        fs.unlinkSync(file.path);

        const campain = new campainModel({
            name,
            target,
            description,
            images: [result.secure_url],
            kindOfCampain,
        });

        await campain.save();
        return res.status(200).json('good');
    } catch (e) {
        console.error(e);
        return res.status(500).json('internal server error');
    }
};

const getCampaignDetails = async (req, res) => {
    try {
        console.log('it did happend')
        const {name} = req.body
        const searched = await campainModel.findOne({ name })
        console.log(searched)
        return res.status(200).json(searched)
    }catch(e) {
        console.log(e)
        return res.status(500)
    }
  
}

const makePayment = async (res,req) => {
     const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid donation amount" });
    }
    const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: "Charity Donation",
                },
                unit_amount: amount * 100, // Stripe requires amount in cents
              },
              quantity: 1,
            },
          ],
          success_url: `${process.env.CLIENT_URL}/success.html`,
          cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
        });

        res.json({ url: session.url })
}


export { setInterests, getFeatured, getCampains, createCampain, getCampaignDetails }


