"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidId = void 0;
const IsValidId = (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send('El id no existe');
        }
        next();
    }
    catch (error) {
        res.status(500).send('Error del servidor');
    }
};
exports.IsValidId = IsValidId;
//# sourceMappingURL=IsValidId.js.map