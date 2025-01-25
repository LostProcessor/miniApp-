import campainModel from '../mongodb/Models/campainModel.js'

const handleWebHook = async (req, res) => {
    const event = req.body
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            const charity = paymentIntent.metadata.charity; // Assuming charity is stored in metadata
            const donor = paymentIntent.metadata.donorName;
            let amount = paymentIntent.metadata.amount
            
            const campain = await campainModel.findOne({ name: charity })
            amount = Number(amount)
            if (!campain) {
                console.error('there is not campaign with this name')
            } else {
                if (!campain.donors.includes(donor)) {
                    campain.donors.push(donor);
                    await campain.save(); // Save the updated donor list
                }

                await campainModel.updateOne(
                    { name: charity },
                    { $inc: { raised: amount } }
                );
            }
    }

    return res.json({ received: true })
}
export {handleWebHook}