"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var payment_1 = require("../controllers/payment");
var router = express_1.default.Router();
router.post('/create-payment-intent', payment_1.createPaymentIntent);
exports.default = router;
