import { Router } from 'express'
import bookRoutes from './features/book/book.controller'

const router = Router()

router.use('/books', bookRoutes)

export default router
