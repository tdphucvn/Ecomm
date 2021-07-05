"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var authentication_1 = require("../controllers/authentication");
var router = express_1.default.Router();
exports.router = router;
router.post('/login', authentication_1.loginRequest);
router.post('/register', authentication_1.registerRequest);
router.delete('/logout', authentication_1.logoutRequest);
