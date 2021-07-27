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
exports.createPaymentIntent = void 0;
var stripe = require("stripe")("sk_test_LEj8vct22bo1OxPiVQ0jixJA00JtivUCiB");
var Products_1 = __importDefault(require("../model/Products"));
var Order_1 = __importDefault(require("../model/Order"));
var findProductsInDB = (function (productsFromClient) { return __awaiter(void 0, void 0, void 0, function () {
    var productsFromDB, _i, productsFromClient_1, product, ProductFromDB;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productsFromDB = [];
                _i = 0, productsFromClient_1 = productsFromClient;
                _a.label = 1;
            case 1:
                if (!(_i < productsFromClient_1.length)) return [3, 4];
                product = productsFromClient_1[_i];
                return [4, Products_1.default.findById(product._id)];
            case 2:
                ProductFromDB = _a.sent();
                if (ProductFromDB === null)
                    return [3, 3];
                productsFromDB.push(ProductFromDB);
                _a.label = 3;
            case 3:
                _i++;
                return [3, 1];
            case 4:
                ;
                return [2, productsFromDB];
        }
    });
}); });
var calculateTotalPrice = function (products) {
    return products.reduce(function (price, product) {
        return price + product.price;
    }, 0);
};
var getProductsIds = function (products) {
    var idObject = {};
    products.forEach(function (product, index) {
        var key = "item" + index;
        var id = product._id;
        idObject[key] = id.toString();
    });
    return idObject;
};
var updateSoldPiecesInDB = function (products) { return __awaiter(void 0, void 0, void 0, function () {
    var _i, products_1, product, UpdatedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, products_1 = products;
                _a.label = 1;
            case 1:
                if (!(_i < products_1.length)) return [3, 4];
                product = products_1[_i];
                return [4, Products_1.default.findByIdAndUpdate(product._id, { $inc: { soldPieces: 1 } })];
            case 2:
                UpdatedProduct = _a.sent();
                if (UpdatedProduct === null)
                    return [3, 3];
                UpdatedProduct.save();
                _a.label = 3;
            case 3:
                _i++;
                return [3, 1];
            case 4:
                ;
                return [2];
        }
    });
}); };
var createOrder = function (items, price, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = new Order_1.default({
                    items: items,
                    user: userId ? userId : null,
                    price: price,
                });
                console.log(order);
                return [4, order.save()];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
var createPaymentIntent = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, items, _b, city, country, address1, address2, zip, state, firstName, lastName, productsFromDB, price, paymentIntent;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, items = _a.items, _b = _a.address, city = _b.city, country = _b.country, address1 = _b.address1, address2 = _b.address2, zip = _b.zip, state = _b.state, firstName = _b.firstName, lastName = _b.lastName;
                return [4, findProductsInDB(items)];
            case 1:
                productsFromDB = _c.sent();
                if (productsFromDB === null)
                    return [2];
                price = calculateTotalPrice(productsFromDB);
                return [4, stripe.paymentIntents.create({
                        amount: price * 100,
                        currency: "usd",
                        shipping: {
                            address: {
                                city: city,
                                country: country,
                                line1: address1,
                                line2: address2,
                                postal_code: zip,
                                state: state
                            },
                            name: firstName + " " + lastName,
                        },
                        metadata: getProductsIds(productsFromDB)
                    })];
            case 2:
                paymentIntent = _c.sent();
                return [4, updateSoldPiecesInDB(productsFromDB)];
            case 3:
                _c.sent();
                return [4, createOrder(productsFromDB, price, req.cookies.userSession)];
            case 4:
                _c.sent();
                res.send({
                    clientSecret: paymentIntent.client_secret
                });
                return [2];
        }
    });
}); };
exports.createPaymentIntent = createPaymentIntent;
