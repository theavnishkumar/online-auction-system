import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ipAddress: String,
    userAgent: String,
    location: {
        country: String,
        region: String,
        city: String,
        isp: String,
    },
    loginAt: {
        type: Date,
        default: Date.now,
        expires: 15778463,
    },
});

const Login = mongoose.model("Login", loginSchema);
export default Login ;