export class User {
    readonly user_id: number;
    readonly username: string;
    readonly password: string;
    

    constructor(user: {
            user_id: number;
            username: string;
            password: string;
           
    }) {
        this.user_id = user.user_id;
        this.username = user.username;
        this.password = user.password;
    
    }

}

export default User;