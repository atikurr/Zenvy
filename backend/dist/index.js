"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const projects_1 = __importDefault(require("./routes/projects"));
const testimonials_1 = __importDefault(require("./routes/testimonials"));
const services_1 = __importDefault(require("./routes/services"));
const pricing_1 = __importDefault(require("./routes/pricing"));
const contact_1 = __importDefault(require("./routes/contact"));
const settings_1 = __importDefault(require("./routes/settings"));
const upload_1 = __importDefault(require("./routes/upload"));
const errorHandler_1 = require("./middleware/errorHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
// Routes
app.use('/api/projects', projects_1.default);
app.use('/api/testimonials', testimonials_1.default);
app.use('/api/services', services_1.default);
app.use('/api/pricing', pricing_1.default);
app.use('/api/contact', contact_1.default);
app.use('/api/settings', settings_1.default);
app.use('/api/upload', upload_1.default);
// Health check
app.get('/', (req, res) => {
    res.send('Zenvy Backend Running 🚀');
});
// Error handler
app.use(errorHandler_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
