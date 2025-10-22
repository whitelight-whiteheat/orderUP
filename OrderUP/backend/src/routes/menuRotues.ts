import { Router } from 'express';
import {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuItemsByRestaurant,
    getMenuItemById,
} from '../controllers/menuController';
import { authenticateToken, authorize } from '../middleware/auth';
import {
    menuQuerySchema,
    menuItemIdSchema,
    restaurantIdSchema,
    createMenuItemSchema,
    updateMenuItemSchema,
    menuItemsByRestaurantSchema,
} from '../validators/menuValidators';
import { validateRequest, validateQuery } from '../middleware/validation';


const router = Router();

// Public routes
router.get('/', validateQuery(menuQuerySchema), getAllMenuItems);
router.get('/:id', validateRequest(menuItemIdSchema), getMenuItemById);
router.get('/restaurant/:restaurantId', validateQuery(restaurantIdSchema), getMenuItemsByRestaurant);

// Protected routes
router.post('/',
    authenticateToken,
    authorize('RESTAURANT_OWNER', 'ADMIN'),
    validateRequest(createMenuItemSchema),
    updateMenuItem
);

router.put('/:id',
    authenticateToken,
    authorize('RESTAURANT_OWNER', 'ADMIN'),
    validateRequest(updateMenuItemSchema),
    updateMenuItem
);

router.delete('/:id',
    authenticateToken,
    authorize('RESTAURANT_OWNER', 'ADMIN'),
    validateRequest(menuItemIdSchema),
    deleteMenuItem
);

export default router;