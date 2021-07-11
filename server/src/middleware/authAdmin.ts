import jwt from 'jsonwebtoken';
import express, {Application, Request, Response, NextFunction} from 'express';

const authenticateAdmin =async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    const accessTokenSecret: string = `${process.env.ACCESS_TOKEN_SECRET}`;
    const authHeader = req.headers.authorization;
    const cookies = req.cookies;
    if(!authHeader) {res.status(401).json({message: 'Unauthorized'}); return;}
    try {
        const accessToken = authHeader.split(' ')[1];
        const decoded = await jwt.verify(accessToken, accessTokenSecret);
        console.log(decoded, '2');
    } catch (error) {
        try {
            const refreshToken: string = req.cookies.refreshToken;
            const refreshTokenSecret: string = `${process.env.REFRESH_TOKEN_SECRET}`;
            if(refreshToken == null || refreshToken == '') { res.status(401).json({message: 'Unauthorized'}); return; }
            const decoded = await jwt.verify(refreshToken, refreshTokenSecret);
            console.log(decoded, 45);
        } catch (error) {
            console.log(error)
            console.log('error');
            res.clearCookie('authorization');
            res.clearCookie('refreshToken');
            res.clearCookie('userSession');
        };
    };
    next();
};

export default authenticateAdmin;