/**
 * @file API routes definition
 * @author Daniela Cordoba
 */

import express from "express";
import { getOrdersService, getOrderbyIdService } from "../services/ordersService.js";
import { seedDB } from "../services/fakerService.js";

const router = express.Router();

/**
 * Endpoint Get order by id
 */
router.get('/orders/:orderId', getOrderbyIdService)

/**
 * Endpoint Get all orders
 */
router.get('/orders', getOrdersService)

/**
 * Endpoint Get order by id
 */
router.get('/seed', seedDB)

export default router;