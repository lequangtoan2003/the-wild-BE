"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGGO_URI || 'mongodb://localhost:27017/menn';
app.use(express_1.default.json());
mongoose_1.default.connect(MONGOURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
app.get('/', (req, res) => {
    res.send('Hello, Node.js with TypeScript!');
});
// Start server
app.listen(PORT, () => {
    console.log(`✅Server is running on port ${PORT}`);
});
