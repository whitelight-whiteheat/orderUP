"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurantController_1 = require("../controllers/restaurantController");
const auth_1 = require("../middleware/auth");
const restaurantValidators_1 = require("../validators/restaurantValidators");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.get('/', (0, validation_1.validateQuery)(restaurantValidators_1.restaurantQuerySchema), restaurantController_1.getRestaurants);
router.get('/:id', restaurantController_1.getRestaurant);
router.post('/', auth_1.authenticateToken, (0, auth_1.authorize)('RESTAURANT_OWNER', 'ADMIN'), (0, validation_1.validateRequest)(restaurantValidators_1.createRestaurantSchema), restaurantController_1.createRestaurant);
router.put('/:id', auth_1.authenticateToken, (0, auth_1.authorize)('RESTAURANT_OWNER', 'ADMIN'), (0, validation_1.validateRequest)(restaurantValidators_1.updateRestaurantSchema), restaurantController_1.updateRestaurant);
router.delete('/:id', auth_1.authenticateToken, (0, auth_1.authorize)('RESTAURANT_OWNER', 'ADMIN'), restaurantController_1.deleteRestaurant);
exports.default = router;
//# sourceMappingURL=restaurantRoutes.js.map