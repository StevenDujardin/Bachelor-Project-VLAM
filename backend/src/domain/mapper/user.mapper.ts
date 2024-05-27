import { User as UserPrisma } from "@prisma/client"
import { User } from "../model/user";

const mapToUser = ({
    user_id,
       username,
       password,
     }: UserPrisma): User => {
return new User({
user_id,
username,
password,
});
};

const mapToUsers = (users: UserPrisma[]): User[] => users.map(mapToUser);

export { mapToUser, mapToUsers };