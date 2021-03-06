"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../model/User"));
var authenticateAdmin = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accessTokenSecret, userSession, authHeader, accessToken, decoded, error_1, refreshToken, refreshTokenSecret, decoded, newAccessToken, newRefreshToken, error1_1, _id, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessTokenSecret = "" + process.env.ACCESS_TOKEN_SECRET;
                userSession = req.cookies.userSession;
                authHeader = req.headers.authorization;
                if (!authHeader) {
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 8]);
                accessToken = authHeader.split(' ')[1];
                return [4, jsonwebtoken_1.default.verify(accessToken, accessTokenSecret)];
            case 2:
                decoded = _a.sent();
                if (JSON.stringify(decoded.user) !== JSON.stringify(userSession)) {
                    clearCookies(res);
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2];
                }
                ;
                req.decoded = decoded;
                return [3, 8];
            case 3:
                error_1 = _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                refreshToken = req.cookies.refreshToken;
                refreshTokenSecret = "" + process.env.REFRESH_TOKEN_SECRET;
                if (refreshToken == null || refreshToken == '') {
                    console.log('empty refresh token');
                    clearCookies(res);
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2];
                }
                return [4, jsonwebtoken_1.default.verify(refreshToken, refreshTokenSecret)];
            case 5:
                decoded = _a.sent();
                if (JSON.stringify(decoded.user) !== JSON.stringify(userSession)) {
                    console.log('decoded and usersession');
                    clearCookies(res);
                    console.log(decoded, userSession);
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2];
                }
                ;
                newAccessToken = jsonwebtoken_1.default.sign({ user: userSession }, accessTokenSecret, { expiresIn: '10min' });
                newRefreshToken = jsonwebtoken_1.default.sign({ user: userSession }, refreshTokenSecret, { expiresIn: '1day' });
                req.accessToken = newAccessToken;
                req.decoded = decoded;
                res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
                return [3, 7];
            case 6:
                error1_1 = _a.sent();
                res.clearCookie('authorization');
                res.clearCookie('refreshToken');
                res.clearCookie('userSession');
                res.status(401).json({ message: 'Unauthorized' });
                return [2];
            case 7:
                ;
                return [3, 8];
            case 8:
                ;
                _id = req.decoded.user._id;
                return [4, User_1.default.findById(_id)];
            case 9:
                user = _a.sent();
                if (user == null) {
                    console.log('Null User');
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2];
                }
                ;
                if (!user.admin) {
                    console.log('Not admin');
                    res.status(401).json({ message: 'Unauthorized' });
                    return [2];
                }
                ;
                next();
                return [2];
        }
    });
}); };
var clearCookies = function (res) {
    res.clearCookie('authorization');
    res.clearCookie('refreshToken');
    res.clearCookie('userSession');
};
exports.default = authenticateAdmin;
