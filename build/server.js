"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connectDatabase_1 = require("./helpers/database/connectDatabase");
const customErrorHandler_1 = require("./middlewares/errors/customErrorHandler");
const fs_1 = __importDefault(require("fs"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routers_1 = __importDefault(require("./routers"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const limitAccess_1 = require("./middlewares/auth/limitAccess");
const cors_1 = __importDefault(require("cors"));
let swaggerOptions = fs_1.default.readFileSync("./swagger.json");
const swaggerDefinition = JSON.parse(swaggerOptions);
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerDefinition);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
(0, connectDatabase_1.connectDatabase)();
app.use(express_1.default.json());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, limitAccess_1.limitAccess)({
    windowMs: 10 * 60 * 1000,
    max: 500
}));
app.use(express_1.default.static("./public"));
app.use("/api", routers_1.default);
app.use(customErrorHandler_1.customErrorHandler);
app.listen(process.env.PORT, () => {
    console.log(`App started on ${process.env.PORT} Mode : ${process.env.ENV}`);
});
