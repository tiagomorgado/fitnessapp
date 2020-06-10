const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    async store(req, res) {
        try{
            const {email, password} = req.body;

            if(!email || !password) {
                return res.status(200).json({message: "Required Field Missing"})
            }

            const user = await User.findOne({email});
            if(!user) {
                return res.status(200).json({message: "User not found. Would you like to register?"})
            }

            if(user && await bcrypt.compare(password, user.password)) {
                const userResponse = {
                    _id:user._id,
                    email:user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
                return res.json(userResponse);
            } else {
                return res.status(200).json({message: "Email or Password do not match"})

            }
        }catch(error){
            throw Error(`Error while Authenticating the User ${error}`)
        }
    }
}