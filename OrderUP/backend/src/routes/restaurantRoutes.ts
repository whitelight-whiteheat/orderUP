import { Router } from 'express';
import {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} from '../controllers/restaurantController';
import { authenticateToken, authorize } from '../middleware/auth';
import {
    createRestaurantSchema,
    updateRestaurantSchema,
    restaurantQuerySchema,
} from '../validators/restaurantValidators';
import { validateRequest, validateQuery } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', validateQuery(restaurantQuerySchema), getRestaurants);
router.get('/:id', getRestaurant);

// Protected routes (require authentication)
router.post('/',
    authenticateToken,
    authorize('RESTAURANT_OWNER', 'ADMIN'),
    validateRequest(createRestaurantSchema),
    createRestaurant
);

router.put('/:id',
    authenticateToken,
    authorize('RESTAURANT_OWNER', 'ADMIN'),
    validateRequest(updateRestaurantSchema),
    updateRestaurant
);

router.delete('/:id',
    authenticateToken,
    authorize('RESTAURANT_OWNER', 'ADMIN'),
    deleteRestaurant
);

export default router;





