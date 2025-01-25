import  mongoose from 'mongoose'


const campainSchema = new mongoose.Schema({
	name: { type: String, required: true, minlength: 3, maxlength: 60,unique:true },
	kindOfCampain: {type: String,required:true},
	target: { type: Number, required: true },
	raised: { type: Number, default: 0 },
	donors: { type: Array, default: [] },
	images: [{ type: String }],
	description: {type:String ,minlength:5,maxlength:200,required:true}
})


const campainModel = mongoose.model("Campain", campainSchema);
export default campainModel;