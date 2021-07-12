import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction} from 'express';
import User from '../model/User';

const authenticateAdmin =async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    const accessTokenSecret: string = `${process.env.ACCESS_TOKEN_SECRET}`;
    const userSession: string = req.cookies.userSession;
    const authHeader = req.headers.authorization;
    if(!authHeader) {res.status(401).json({message: 'Unauthorized'}); return;}
    try {
        const accessToken = authHeader.split(' ')[1];
        const decoded: any = await jwt.verify(accessToken, accessTokenSecret);
        if(JSON.stringify(decoded.user) !== JSON.stringify(userSession)) { clearCookies(res); res.status(401).json({message: 'Unauthorized'}); return;};
        req.decoded = decoded;
    } catch (error) {
        try {
            const refreshToken: string = req.cookies.refreshToken;
            const refreshTokenSecret: string = `${process.env.REFRESH_TOKEN_SECRET}`;
            if(refreshToken == null || refreshToken == '') { console.log('empty refresh token'); clearCookies(res); res.status(401).json({message: 'Unauthorized'}); return; }
            const decoded: any = await jwt.verify(refreshToken, refreshTokenSecret);
            if(JSON.stringify(decoded.user) !== JSON.stringify(userSession)) {console.log('decoded and usersession'); clearCookies(res); console.log(decoded, userSession); res.status(401).json({message: 'Unauthorized'}); return;};
            
            const newAccessToken = jwt.sign({ user: userSession }, accessTokenSecret, {expiresIn: '10min'});
            const newRefreshToken = jwt.sign({ user: userSession }, refreshTokenSecret, {expiresIn: '1day'});

            req.accessToken = newAccessToken;
            req.decoded = decoded;
            res.cookie('refreshToken', newRefreshToken, {httpOnly: true});
        } catch (error1) {
            res.clearCookie('authorization');
            res.clearCookie('refreshToken');
            res.clearCookie('userSession');
            res.status(401).json({message: 'Unauthorized'});
            return;
        };
    };

    const { _id } = req.decoded.user;

    const user = await User.findById(_id);
    if(user == null) {console.log('Null User'); res.status(401).json({message: 'Unauthorized'}); return;};
    if(!user.admin) {console.log('Not admin'); res.status(401).json({message: 'Unauthorized'}); return;};
    next();
};

const clearCookies = (res: Response) => {
    res.clearCookie('authorization');
    res.clearCookie('refreshToken');
    res.clearCookie('userSession');
};

export default authenticateAdmin;