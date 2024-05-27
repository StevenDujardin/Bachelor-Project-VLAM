import { User } from "../model/user"
import { mapToUser, mapToUsers } from "../mapper/user.mapper";
import database from  "../../../util/database"


const DBgetAllUsers = async (): Promise<User[]> => {
    try {
        const users = await database.user.findMany();
        return mapToUsers(users);
    } catch (error) {
        throw new Error('Error');
    }
};


const DBaddUser = async (username: string, password: string) => {
    try {
        const user = await database.user.create({
            data: {
                username: username,
                password: password
            }
        });
        return mapToUser(user)
    } catch (error) {
        throw new Error('Error');
    }
};


const DBdeleteUser = async (user_id: number) => {
    try {
        const user = await database.user.delete({
            where: {
                user_id: user_id
            }
        });
        return mapToUser(user)
    } catch (error) {
        throw new Error('Error');
    }
};

const DBgetUserByUsername = async (username: string): Promise<User> => {
    try {
        const user = await database.user.findFirstOrThrow({
            where: {
                    username: username,
            }
        })
        return mapToUser(user);
    } catch (error) {
        throw new Error('Error');
    }
};

const DBgetUserByID = async (user_id: number): Promise<User> => {
    try {
        const user = await database.user.findFirstOrThrow({
            where: {
                    user_id: user_id,
            }
        })
        return mapToUser(user);
    } catch (error) {
        throw new Error('Error');
    }
};





export default { DBgetAllUsers, DBaddUser, DBdeleteUser, DBgetUserByUsername, DBgetUserByID}



