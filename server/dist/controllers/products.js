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
exports.getCollection = exports.editProduct = exports.deleteProducts = exports.addProduct = exports.getCertainItemDetails = exports.getProducts = void 0;
var Products_1 = __importDefault(require("../model/Products"));
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY,
});
var getProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sort, filter, query, sortQuery, fetchedProducts, numberOfProducts, numberOfPages, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.query, sort = _a.sort, filter = _a.filter;
                query = {};
                sortQuery = {};
                switch (filter) {
                    case 'all':
                        query = {};
                        break;
                    case 'electronics':
                        query = { category: 'electronics' };
                        break;
                    case 'homeDecor':
                        query = { category: 'homeDecor' };
                        break;
                    case 'grocery':
                        query = { category: 'grocery' };
                        break;
                    default:
                        break;
                }
                ;
                switch (sort) {
                    case 'none':
                        sortQuery = {};
                        break;
                    case 'alpha':
                        sortQuery = { 'name': 1 };
                        break;
                    case 'price':
                        sortQuery = { 'price': -1 };
                        break;
                    case 'popularity':
                        sortQuery = { 'rating': 1 };
                        break;
                    default:
                        break;
                }
                ;
                return [4, Products_1.default.find(query).sort(sortQuery)];
            case 1:
                fetchedProducts = _b.sent();
                return [4, Products_1.default.countDocuments()];
            case 2:
                numberOfProducts = _b.sent();
                numberOfPages = Math.ceil(numberOfProducts / 6);
                res.json({ message: "Success fetch", fetchedProducts: fetchedProducts, numberOfPages: numberOfPages });
                return [3, 4];
            case 3:
                error_1 = _b.sent();
                console.log(error_1);
                return [3, 4];
            case 4:
                ;
                return [2];
        }
    });
}); };
exports.getProducts = getProducts;
var getCertainItemDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, product, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4, Products_1.default.findById(id)];
            case 1:
                product = _a.sent();
                res.json({ message: 'Item finded in DB', product: product });
                return [3, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                res.status(400).json({ message: 'Something went wrong' });
                return [3, 3];
            case 3:
                ;
                return [2];
        }
    });
}); };
exports.getCertainItemDetails = getCertainItemDetails;
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, price, description, file, category, uploadResponse, url, public_id, newProduct, savedProduct, accessToken, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, name = _a.name, price = _a.price, description = _a.description, file = _a.file, category = _a.category;
                return [4, cloudinary.uploader.upload(file, {
                        upload_preset: 'products',
                    })];
            case 1:
                uploadResponse = _b.sent();
                url = uploadResponse.url, public_id = uploadResponse.public_id;
                newProduct = new Products_1.default({
                    name: name,
                    price: parseInt(price),
                    description: description,
                    image: {
                        url: url,
                        public_id: public_id,
                    },
                    category: category,
                });
                return [4, newProduct.save()];
            case 2:
                savedProduct = _b.sent();
                accessToken = req.accessToken;
                if (!accessToken) {
                    res.json({ message: 'Product added', savedProduct: savedProduct });
                    return [2];
                }
                res.json({ message: 'Product added', savedProduct: savedProduct, accessToken: accessToken });
                return [3, 4];
            case 3:
                error_3 = _b.sent();
                console.error(error_3);
                res.status(500).json({ err: 'Something went wrong' });
                return [3, 4];
            case 4:
                ;
                return [2];
        }
    });
}); };
exports.addProduct = addProduct;
var deleteProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken_1, arrayOfProductsIDs_1, arrayOfProducts_1, error;
    return __generator(this, function (_a) {
        try {
            accessToken_1 = req.accessToken;
            arrayOfProductsIDs_1 = req.body.products;
            arrayOfProducts_1 = [];
            error = arrayOfProductsIDs_1.forEach(function (productId, index) { return __awaiter(void 0, void 0, void 0, function () {
                var product, imageId, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4, Products_1.default.findById(productId)];
                        case 1:
                            product = _a.sent();
                            if (product === null)
                                throw Error('Item is not in the database');
                            if (!(product !== null)) return [3, 3];
                            arrayOfProducts_1.push(product);
                            imageId = product.image.public_id;
                            cloudinary.uploader.destroy(imageId, function (err, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                if (err) {
                                    throw err;
                                }
                                ;
                                console.log(res);
                                return [2];
                            }); }); });
                            return [4, product.remove()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            console.log(index, arrayOfProductsIDs_1, arrayOfProductsIDs_1.length - 1);
                            if (index == arrayOfProductsIDs_1.length - 1) {
                                console.log('Deleted everything');
                                if (!accessToken_1) {
                                    res.json({ message: 'Deleted', arrayOfProductsIDs: arrayOfProductsIDs_1 });
                                    return [2];
                                }
                                res.json({ message: 'Deleted', arrayOfProductsIDs: arrayOfProductsIDs_1, accessToken: accessToken_1 });
                                return [2];
                            }
                            ;
                            return [3, 5];
                        case 4:
                            error_4 = _a.sent();
                            res.status(400).json({ message: error_4.message });
                            return [2];
                        case 5: return [2];
                    }
                });
            }); });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: error });
        }
        ;
        return [2];
    });
}); };
exports.deleteProducts = deleteProducts;
var editProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, productID, name, price, description, category, product, accessToken, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, productID = _a.productID, name = _a.name, price = _a.price, description = _a.description, category = _a.category;
                return [4, Products_1.default.findByIdAndUpdate(productID, { name: name, price: price, description: description, category: category }, function (err, docs) {
                        if (err)
                            console.log(err);
                        else
                            console.log('Updated user: ', docs);
                    })];
            case 1:
                product = _b.sent();
                accessToken = req.accessToken;
                if (!accessToken) {
                    res.json({ message: 'Succesfully updated', product: product });
                    return [2];
                }
                res.json({ message: 'Succesfully updated', product: product, accessToken: accessToken });
                return [3, 3];
            case 2:
                error_5 = _b.sent();
                console.log(error_5);
                res.status(400).json({ message: 'Product is not in the database' });
                return [3, 3];
            case 3:
                ;
                return [2];
        }
    });
}); };
exports.editProduct = editProduct;
var getCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, collectionProducts, _a, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                query = req.query;
                collectionProducts = void 0;
                _a = query.category;
                switch (_a) {
                    case 'ontheedge': return [3, 1];
                    case 'masterofthenight': return [3, 3];
                    case 'nevermore': return [3, 5];
                }
                return [3, 7];
            case 1: return [4, Products_1.default.find({ category: 'homeDecor' }).sort({ "price": -1 }).limit(3)];
            case 2:
                collectionProducts = _b.sent();
                return [3, 9];
            case 3: return [4, Products_1.default.find({ category: 'electronics' }).sort({ "price": -1 }).limit(3)];
            case 4:
                collectionProducts = _b.sent();
                return [3, 9];
            case 5: return [4, Products_1.default.find({ category: 'grocery' }).sort({ "price": -1 }).limit(3)];
            case 6:
                collectionProducts = _b.sent();
                return [3, 9];
            case 7: return [4, Products_1.default.find(query).sort({ "soldPieces": -1 }).limit(3)];
            case 8:
                collectionProducts = _b.sent();
                return [3, 9];
            case 9:
                res.json({ products: collectionProducts });
                return [3, 11];
            case 10:
                error_6 = _b.sent();
                console.log(error_6);
                return [3, 11];
            case 11:
                ;
                return [2];
        }
    });
}); };
exports.getCollection = getCollection;
