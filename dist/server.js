"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const CarRouter_1 = __importDefault(require("./routes/CarRouter"));
const AdminRouter_1 = __importDefault(require("./routes/AdminRouter"));
const corsConfig_1 = require("./config/corsConfig");
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsConfig_1.corsOptions));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api/cars', CarRouter_1.default);
app.use('/admin', AdminRouter_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map