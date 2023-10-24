import { Router } from 'express'
import User from './controllers/UserController.js'
import Car from './controllers/CarController.js'
import { validateToken } from '../config/auth.js'

const router = Router()

export default function userRoutes(app) {
    app.use('/api', router)

    router.post('/login', User.login)

    router.post('/register', User.register)

    router.get('/usuario', User.getUsuario)

    router.get('/destacados', Car.getDestacados)

    router.get('/publicacion/:idPublicacion', Car.getPublicacion)

    router.post('/solicitar-alquiler', Car.solicitarAlquiler)

    router.get('/mis-publicaciones', Car.misPublicaciones)

    router.delete('/publicacion/:idPublicacion', Car.eliminarPublicacion)

    router.get('/ver-solicitud/:idPublicacion', Car.verSolicitud)

    router.put('/rechazar-solicitud/:idPublicacion', Car.rechazarSolicitud)

    router.put('/aceptar-solicitud/:idPublicacion', Car.aceptarSolicitud)

    router.get('/mis-solicitudes', Car.misSolicitudes)

    router.delete('/solicitud/:idSolicitud', Car.eliminarSolicitud)

    router.put('/pagar-solicitud/:idSolicitud', Car.pagarSolicitud)

    router.post('/crear-publicacion', Car.crearPublicacion)

    router.get('/buscar/:ciudad', Car.buscarPublicaciones)

    router.post('/nuevo-comentario', Car.nuevoComentario)

    router.put('/entregar-auto/:idPublicacion', Car.entregarAuto)

    router.put('/aceptar-entrega/:idPublicacion', Car.aceptarEntrega)

    router.put('/reiniciar/:idPublicacion', Car.reiniciar)

}
