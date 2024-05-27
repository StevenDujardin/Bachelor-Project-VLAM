import { User } from "../model/user";
import userDb from "../data-access/user.db";
import * as bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const getAllUsers = (): Promise<User[]> => {
    return userDb.DBgetAllUsers();
};

const addUser = async (username: string, password: string) => {
    const encrypted = bcrypt.hash(password, 10) as unknown as string
    return await userDb.DBaddUser(username, encrypted);
}

const deleteUser = async (user_id: number) => {
    return await userDb.DBdeleteUser(user_id);
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

        ///ENCRYPT PW IN DATABASE!!!!

        throw new Error('Incorrect password');
    }

    
    return "done";
    //return generateJwtToken(user);
}

// const generateJwtToken= (user: User): string => {
//     const JWTSecret = process.env.JWT_SECRET;
//     const options ={ expiresIn : `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'whatt'};

//     try{
//         const token = jwt.sign({ nickname: user.username, user_id: user.user_id}, JWTSecret, options);
//         console.log(token);
//         return token;
//     }
//     catch(error){
//         console.log(error);
//         throw new Error('Error generating JWT token. See console for details')
//     }

// }



export default { getAllUsers, addUser, deleteUser, getUserIDByUsername, checkCredentials }
