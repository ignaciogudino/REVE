import Car from '../services/CarService.js'
import { getLoggedUser } from '../../config/auth.js'
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ruta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const filename = Date.now() + extname;
    cb(null, filename);
  },
});

const upload = multer({ storage }).single('imagen'); // Asegúrate de que 'imagen' coincida con el campo del formulario

export default class CarController {

  static async getDestacados(req, res, next) {
    try {
       
        const idUser = await getLoggedUser(req)
        const cars = await Car.getDestacados(idUser);
         
        return await res.status(200)
        .json({
          cars: cars,
        })
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async getPublicacion(req, res, next) {
    try {
        const id = req.params.idPublicacion

        const publicacion = await Car.getPublicacion(id);
        
        if (!publicacion) {
          return await res.status(400).send({
              status: "error",
              message: 'Publicacion no encontrada'
          });
        }
         
        return await res.status(200).json(publicacion)
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async solicitarAlquiler(req, res, next) {
    try {
      const idUser = await getLoggedUser(req)

      const solicitud = {
        idPublicacion: req.body.idPublicacion,
        fechaRetiro: req.body.fechaRetiro,
        fechaEntrega: req.body.fechaEntrega,
        costo: req.body.costo,
        idSolicitante: idUser
      }
        await Car.solicitarAlquiler(solicitud);
         
        return await res.status(200)
        .json({
          message: "Solicitud de alquiler enviada",
        })
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async misPublicaciones(req, res, next) {
    try {

        const idUser = await getLoggedUser(req)
        const publicaciones = await Car.misPublicaciones(idUser);
         
        return await res.status(200).json(publicaciones)
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async eliminarPublicacion(req, res, next) {
    try {
        const id = req.params.idPublicacion
        await Car.eliminarPublicacion(id);
        
        return await res.status(200).json({message: "PUBLICACIÓN ELIMINADA"})
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async verSolicitud(req, res, next) {
    try {
        const id = req.params.idPublicacion
        const solicitud = await Car.verSolicitud(id);
        
        return await res.status(200).json(solicitud)
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async rechazarSolicitud(req, res, next) {
    try {
        const id = req.params.idPublicacion
        const motivo = req.body.motivo
        await Car.rechazarSolicitud(id, motivo);
        
        return await res.status(200).json({message: "SOLICITUD RECHAZADA"})
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async aceptarSolicitud(req, res, next) {
    try {
        const id = req.params.idPublicacion
        await Car.aceptarSolicitud(id);
        
        return await res.status(200).json({message: "SOLICITUD ACEPTADA"})
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }


  static async misSolicitudes(req, res, next) {
    try {

        const idUser = await getLoggedUser(req)
        const solicitudes = await Car.misSolicitudes(idUser);
         
        return await res.status(200).json(solicitudes)
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }


  static async eliminarSolicitud(req, res, next) {
    try {
        const id = req.params.idSolicitud
        await Car.eliminarSolicitud(id);
        
        return await res.status(200).json({message: "SOLICITUD ELIMINADA"})
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async pagarSolicitud(req, res, next) {
    try {
        const id = req.params.idSolicitud
        await Car.pagarSolicitud(id);
        
        return await res.status(200).json({message: "PAGO REALIZADO", text: "Coordiná la entrega del auto con el propietario."})
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async crearPublicacion(req, res, next) {

    try {
        await upload(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Error al cargar la imagen.' });
        }

        const idUser = await getLoggedUser(req);
        const { marca, modelo, color, capacidad, puertas, km, ubicacion, precio, comentario } = req.body;
        const imagen = req.file.path;

        await Car.crearPublicacion({
          idPropietario: idUser,
          marca,
          modelo,
          color,
          capacidad,
          puertas,
          km,
          ubicacion,
          precio,
          comentario,
          imagen
        });

        return res.status(200).json({ message: 'Publicación Creada', text: 'Puedes verla desde la sección "Mis Publicaciones"' });
      });
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }


  static async buscarPublicaciones(req, res, next) {
    try {

        const ciudad = req.params.ciudad
        const publicaciones = await Car.buscarPublicaciones(ciudad);
         
        return await res.status(200).json(publicaciones)
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async nuevoComentario(req, res, next) {
    try {

        const calificacion = req.body.calificacion
        const comentario = req.body.comentario
        const vehiculo = req.body.vehiculo

        await Car.nuevoComentario(calificacion, comentario, vehiculo);
         
        return await res.status(200).json({message: "Comentario creado."})
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }


  static async entregarAuto(req, res, next) {
    try {
        const id = req.params.idPublicacion
        await Car.entregarAuto(id);
        
        return await res.status(200).json({message: "Auto entregado", text: "Indicaste que el auto ya fue entregado al propietario"})
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }


  static async aceptarEntrega(req, res, next) {
    try {
        const id = req.params.idPublicacion
        await Car.aceptarEntrega(id);
        
        return await res.status(200).json({message: "Alquiler finalizado", text: "Como ambas partes marcaron el auto fue entregado, damos el alquiler como finalizado"})
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async reiniciar(req, res, next) {
    try {
        const id = req.params.idPublicacion
        await Car.reiniciar(id);
        
        return await res.status(200).json({message: "La publicación fue reactivada", text: "Los demás usuarios podrán ver dicha publicación desde la pagina principal de REVE"})
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }
}
