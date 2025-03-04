import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, minlength: 3, maxlength: 30 },
        email: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            unique: true,
        },
        interests: { type: Array },
        password: { type: String, required: true, minlength: 3, maxlength: 1024 },
        isVerified: { type: Boolean, default: false },
        verificationCode: { type: String },
        codeExpiresAt: { type: Date }
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;