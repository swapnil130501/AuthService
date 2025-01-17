const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_KEY } = require('../config/serverConfig');
const  UserRepository  = require('../repository/user-repository');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async deleteUser(userId, token){
        try {
            const user = await this.userRepository.getById(userId);
            if(!user){
                throw {error: 'User not found'};
            }
            let verificationResponse = this.verifyToken(token);
            if(!verificationResponse){
                throw {error: 'Token verification error'};
            }
            await this.userRepository.destroy(userId);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, data){
        try {
            const user = await this.userRepository.getById(userId);
            if(!user){
                throw {error: 'User not found'};
            }
            // let verificationResponse = this.verifyToken(token);
            // if(!verificationResponse){
            //     throw {error: 'Token verification error'};
            // }
            const response = await this.userRepository.update(userId, data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getUser(userId) {
        try {
            const user = await this.userRepository.getById(userId);
        
            if (!user) {
                throw new Error('User not found');
            }

            // const verificationResponse = this.verifyToken(token);
            // if (!verificationResponse) {
            //     throw new Error('Token verification error');
            // }

             return user;

        } catch (error) {
            throw error;
        }
    } 
    
    async getAllUsers() {
        try {
            // const verificationResponse = this.verifyToken(token);
            // if (!verificationResponse) {
            //     throw new Error('Token verification error');
            // }

            const users = this.userRepository.getAll();
            return users;
             
        } catch (error) {
            throw error;
        }
    } 

    async signIn(email, plainPassword) {
        try {
            // step 1-> fetch the user using the email
            const user = await this.userRepository.getByEmail(email);
            // step 2-> compare incoming plain password with stored encrypted password
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: 'Incorrect password'};
            }
            // step 3-> if passwords match then create a token and send it to the user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }

    async isAuthenticated(token){
        try {
            const response = await this.verifyToken(token);
            if(!response){
                throw {error: 'Invalid token'};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error: 'No user with corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in authentication");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw error;
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison");
            throw error;
        }
    }

    isAdmin(userId){
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }
}

module.exports = UserService;