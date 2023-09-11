import { Router } from 'express'
import User from './controllers/UserController.js'
import { validateToken } from '../config/auth.js'

const router = Router()

export default function userRoutes(app) {
    app.use('/api', router)

    router.post('/login', User.login)

    router.get('/getUserByID/:id', validateToken, User.getUserByID)
}
