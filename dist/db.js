"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectDb;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDb() {
    try {
        await mongoose_1.default.connect(process.env.MOONGOSE_CONNECTION);
        console.log('Connection succesfull');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
//# sourceMappingURL=db.js.map