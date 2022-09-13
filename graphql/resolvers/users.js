const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require('apollo-server');

const User = require('../models/User');
const { SECRET_KEY } = require("../../config");
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');

function genToken(user) {
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username,
    },
    SECRET_KEY, 
    {expiresIn: "1h"}        
    );
}

module.exports = {
    Mutation: {
        async register(
            _, 
            { 
                registerInput: { username, email, password, confirmPassword} 
            }
        ){
            // TODO validate user data

            const { isValid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            
            if (!isValid) {
                throw new UserInputError('Error', { errors })
            }
            // TODO make sure user doesnt exists

            const user = await User.findOne({username});

            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'this username is taken'
                    }
                })
            }
            // TODO hash password and create auth token

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = genToken(res); 
            
            return {
                ...res._doc,
                id: res._id,
                token
            };
            
        },
        async login(_, {username, password}){
            const { isValid, errors} = validateLoginInput(username, password);

            if(!isValid) {
                throw new UserInputError("Errors", {errors})
            }

            const user = await User.findOne({ username });
            if (!user) {
                errors.general = "User not found";
                throw new UserInputError("User not found", {errors});
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = "Invalid credentials";
                throw new UserInputError("Invalid credentials", {errors});
            }

            const token = genToken(user); 

            return {
                ...user._doc,
                id: user._id,
                token
            };
        }
    }
}