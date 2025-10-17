"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const authValidators_1 = require("../validators/authValidators");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/register', (0, validation_1.validateRequest)(authValidators_1.registerSchema), authController_1.register);
router.post('/login', (0, validation_1.validateRequest)(authValidators_1.loginSchema), authController_1.login);
router.post('/refresh', (0, validation_1.validateRequest)(authValidators_1.refreshSchema), authController_1.refresh);
router.get('/profile', auth_1.authenticateToken, authController_1.profile);
router.post('/logout', auth_1.authenticateToken, authController_1.logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map