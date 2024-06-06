import express, { Request, Response} from 'express';
import userService from "../domain/service/user.service"
import jwt from 'jsonwebtoken';

const userRouter = express.Router();

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       '200':
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 12345
 *                   username:
 *                     type: string
 *                     example: john_doe
 *                   email:
 *                     type: string
 *                     example: john_doe@exampl.com
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *     tags:
 *       - Users
 */
userRouter.get('/all', async (req, res) => {
    try {
        console.log("users")
        const users = await userService.getAllUsers()
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       '200':
 *         description: The user was successfully added
 *         content:
 *           application/json:
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *     tags:
 *       - Users
 */
userRouter.post('/add', async (req, res) => {
    try {
        console.log("addUser")
        const username = req.body.username;
        const password = req.body.password;
        const users = await userService.addUser(username, password);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *     responses:
 *       '200':
 *         description: The user was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deleted user john_doe
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *     tags:
 *       - Users
 */
userRouter.delete('/delete', async (req, res) => {
    try {
        console.log("delete")
        const username = req.body.username;
        const user = await userService.deleteUser(username);
        res.status(200).json({message: "Deleted user ${username}"});
    } catch (error) {
        res.status(500).json({ status: 'error'});
    }
});



/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       '200':
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: john_doe
 *       '400':
 *         description: Bad request
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Username is required
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Gebruikersnaam of wachtwoord is niet juist
 *     tags:
 *       - Users
 */
userRouter.post('/login', async (req, res) => {
    try {
        console.log("LoginUser")
        if(!req.body.username){
            res.status(400).send('Username is required');
            return
        }
        if(!req.body.password){
            res.status(400).send('Password is required');
            return
        }
        const username = req.body.username;
        const password = req.body.password;
        const token = await userService.checkCredentials(username, password);
        const user_id = await userService.getUserIDByUsername(username);
        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200)
            .json({ message: "Logged in successfully",user_id: user_id, username: username });
    } catch (error: Error | any) {
        res.status(500).json({"error": "Gebruikersnaam of wachtwoord is niet juist"});
    }
});

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out a user
 *     responses:
 *       '200':
 *         description: The user was successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 *     tags:
 *       - Users
 */
userRouter.post('/logout', async (req , res) => {
    res.clearCookie('token'); // Ensure you clear the appropriate cookie
    res.status(200).json({message : `Successfully logged out`})
});


// AUTH STATUS
userRouter.get('/auth/status', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        console.log("not logged in")
        return res.status(401).json({ isLoggedIn: false });
    }
    const JWTSecret = process.env.JWT_SECRET;

    if (!JWTSecret) {
        return res.status(500).json({ error: 'JWT secret is not defined' });
    }

    try {

    jwt.verify(token, JWTSecret) 

    console.log("logged in")
        res.status(200).json({ isLoggedIn: true });
    } catch (err) {
        
            console.log("not logged in")
            res.status(401).json({ isLoggedIn: false });
        
        
    };
});

export { userRouter }