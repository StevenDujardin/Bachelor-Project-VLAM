import express, { Request, Response} from 'express';
import userService from "../domain/service/user.service"


const userRouter = express.Router();

//ALL USERS
userRouter.get('/all', async (req, res) => {
    try {
        console.log("users")
        const users = await userService.getAllUsers()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

//ADD
userRouter.post('/add', async (req, res) => {
    try {
        console.log("addUsers")
        const username = req.body.username;
        const password = req.body.password;
        const users = await userService.addUser(username, password);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

//DELETE
userRouter.delete('/delete', async (req, res) => {
    try {
        console.log("delete")
        const username = req.body.username;
        const password = req.body.password;
        const users = await userService.addUser(username, password);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});


//LOGIN
userRouter.post('/login', async (req, res) => {
    try {
    
        console.log("LoginUser")
        if(req.body.username){
            res.status(400).send('Nickname is required');
            return
        }
        if(req.body.password){
            res.status(400).send('Password is required');
            return
        }
        const username = req.body.username;
        const password = req.body.password;
        const token = await userService.checkCredentials(username, password);
        const user_id = await userService.getUserIDByUsername(username);
        res.status(200)
            .json({ message: "Logged in successfully", token: token, user_id: user_id });
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

//LOGOUT
userRouter.post('/logout', async (req , res) => {
    return res.clearCookie("token").status(200).json({message : `Successfully logged out`})
});


export { userRouter }