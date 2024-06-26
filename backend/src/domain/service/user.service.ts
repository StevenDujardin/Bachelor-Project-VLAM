import { User } from "../model/user";
import userDb from "../data-access/user.db";
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.DBgetAllUsers();
};

const addUser = async (username: string, password: string) => {
    const encrypted = bcrypt.hash(password, 10) as unknown as string
    return userDb.DBaddUser(username, encrypted);
}

const deleteUser = async (username: string) => {
    const user_id = await getUserIDByUsername(username);
    return userDb.DBdeleteUser(user_id);
}


const getUserIDByUsername = async (username: string) => {
    const users = await getAllUsers();
    const user = users.find((user) => user.username === username);

    if (!user) {
        throw new Error("User not found");
    }

    return user.user_id;
};

const checkCredentials = async ( username: string, password: string ): Promise<string> =>{
    const user = await userDb.DBgetUserByUsername( username );
    
    if(!user){
        throw new Error('Username is not known to the system');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {

        throw new Error('Incorrect password');
    }

    return generateJwtToken(user);
}

const generateJwtToken = (user: User): string => {
    const JWTSecret = process.env.JWT_SECRET;
    const options = { expiresIn: `${process.env.TOKEN_EXPIRES}h`, issuer: 'whatt' };

    if (!JWTSecret) {
        throw new Error('JWT_SECRET is not defined');
    }

    try {
        const token = jwt.sign({ nickname: user.username, user_id: user.user_id }, JWTSecret, options);
        
        return token;
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token. See console for details');
    }
};






export default { getAllUsers, addUser, deleteUser, getUserIDByUsername, checkCredentials };
