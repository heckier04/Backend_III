import { Router } from 'express';
import { getMockingUsers, generateData, getMockingPets } from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingusers', getMockingUsers);
router.post('/generateData', generateData);
router.get('/mockingpets', getMockingPets);

export default router;
