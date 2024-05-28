// import jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { User } from '../../domain/model/user';

// export interface AuthenticatedRequest extends Request{
//     user?: User;
// }

// export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     console.log(req.headers)
//     //const token = req.cookies.token;
//     const token = req.headers.authorization?.split(" ")
//         .at(-1)
//     const allowedUrls = [/^\/api-docs(\/.*)?$/, "/user-api/user/login", "/user-api/user/register", "/status"]
//     if(allowedUrls.filter(allowedURL => req.path.match(allowedURL)).length > 0){
//         next()
//         return
//     }
//     if (!token) {
//         return res.status(401).json({ error: 'Token not found.' });
//     }

//     jwt.verify(token,process.env.JWT_SECRET, (err: jwt.VerifyErrors | null, user: User) => {
//         if (err) {
//             return res.status(403).json({ error: 'Invalid token.' });
//         }
//         console.log(user)
//         req.user = user;
//         next();
//     });
// };