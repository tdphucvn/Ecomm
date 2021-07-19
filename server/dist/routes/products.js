"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var products_1 = require("../controllers/products");
router.get('/', products_1.getProducts);
router.get('/collection', products_1.getCollection);
router.get('/:id', products_1.getCertainItemDetails);
exports.default = router;
