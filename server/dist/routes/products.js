"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var products_1 = require("../controllers/products");
router.get('/', products_1.getProducts);
router.get('/:id', products_1.getCertainItemDetails);
router.post('/search', products_1.postSearchItem);
router.post('/addProduct', products_1.addProduct);
router.post('/delete', products_1.deleteProducts);
exports.default = router;
