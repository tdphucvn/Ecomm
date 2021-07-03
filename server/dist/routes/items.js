"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var items_1 = require("../controllers/items");
router.get('/', items_1.getItems);
router.get('/:id', items_1.getCertainItemDetails);
router.post('/search', items_1.postSearchItem);
exports.default = router;
