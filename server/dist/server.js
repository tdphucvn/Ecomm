"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
}
;
var PORT = process.env.PORT || 5000;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var products_1 = __importDefault(require("./routes/products"));
var contact_1 = __importDefault(require("./routes/contact"));
var authentication_1 = __importDefault(require("./routes/authentication"));
var productsAdmin_1 = __importDefault(require("./routes/admin/productsAdmin"));
var payment_1 = __importDefault(require("./routes/payment"));
var orders_1 = __importDefault(require("./routes/private/orders"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
app.use(cookie_parser_1.default());
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use(cors_1.default({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use('/api/products', products_1.default);
app.use('/api/products', productsAdmin_1.default);
app.use('/api/contact', contact_1.default);
app.use('/api/authentication', authentication_1.default);
app.use('/api/payment', payment_1.default);
app.use('/api/orders', orders_1.default);
app.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, 'build', 'index.html'));
});
var uri = "" + process.env.DB_CONNECTION;
var options = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.connect(uri, options).then(function () {
    app.listen(PORT, function () { return console.log("Server * running on PORT " + PORT); });
}).catch(function (err) {
    console.log('Access denied');
    console.error(err);
});
