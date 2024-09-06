import express from 'express'
import asyncHandler from 'express-async-handler';
import { signupController,loginController,logoutController,getAllUsers, getCurrectUserProfile,updateCurrentUserProfile,deleteUserById,getUserById,updateUserById } from '../controllers/userController.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';
const router=express.Router();

// POST for signup and GET for getting all users by admin only
router.route('/').post(asyncHandler(signupController)).get(authenticate,isAdmin,getAllUsers);
//login
router.post('/auth', asyncHandler(loginController));
//logout
router.post('/logout', asyncHandler(logoutController));

//GET currentUser POST update currentUser
router.route('/profile').get(authenticate,asyncHandler(getCurrectUserProfile)).post(authenticate,asyncHandler(updateCurrentUserProfile));

//delete a user by id
router.route('/:id').delete(authenticate,isAdmin,asyncHandler(deleteUserById)).get(authenticate,isAdmin,asyncHandler(getUserById)).put(authenticate,isAdmin,asyncHandler(updateUserById))

export default router