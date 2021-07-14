"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var products_1 = require("../../controllers/products");
var authAdmin_1 = __importDefault(require("../../middleware/authAdmin"));
router.use(authAdmin_1.default);
router.post('/addProduct', products_1.addProduct);
router.post('/delete', products_1.deleteProducts);
router.put('/edit', products_1.editProduct);
exports.default = router;
