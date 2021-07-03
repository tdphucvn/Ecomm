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
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var items_1 = __importDefault(require("./routes/items"));
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use('/items', items_1.default);
var uri = "" + process.env.DB_CONNECTION;
var options = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.connect(uri, options).then(function () {
    app.listen(PORT, function () { return console.log("Server running on PORT " + PORT); });
}).catch(function (err) {
    console.log('Access denied');
    console.error(err);
});
