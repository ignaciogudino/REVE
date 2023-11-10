import { getLoggedUser } from '../../config/auth.js';
import DB from '../../config/mysql.js';

const db = new DB();

export default class CarService {

  static async getDestacados(idUser) {
    try {
      const cars = await db.query(
        `SELECT * FROM PUBLICACION P
        INNER JOIN VEHICULO V ON P.ID_VEHICULO = V.ID_VEHICULO
        WHERE P.ID_ESTADO_PUBLICACION = 1 AND V.ID_PROPIETARIO != ?`, [idUser]
      );
      if(cars.length > 0){
        return cars
      }
    } catch (err) {
      return ({
        status: "error",
        message: 'Error bsucando vehiculos destacados.'
    });
    }
  }

  static async getPublicacion(idPublicacion) {
    try {
      let cars = await db.query(
        `SELECT * FROM PUBLICACION P
        INNER JOIN VEHICULO V ON P.ID_VEHICULO = V.ID_VEHICULO
        INNER JOIN USUARIO U ON U.ID_USUARIO = V.ID_PROPIETARIO
        WHERE P.ID_ESTADO_PUBLICACION = 1 AND P.ID_PUBLICACION = ?`, [idPublicacion]
      );

      if(cars.length > 0){
        const opiniones = await db.query(
          `SELECT * FROM OPINION WHERE ID_VEHICULO = ?`, [cars[0].ID_VEHICULO]
        );

        return {car: cars[0], opiniones: opiniones}
      }
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error buscando publicacion.'
    });
    }
  }

  static async solicitarAlquiler(solicitud) {
    try {
      await db.query(
        `INSERT INTO ALQUILER (ID_PUBLICACION, ID_SOLICITANTE, FECHA_RETIRO, FECHA_ENTREGA, ID_ESTADO_ALQUILER, COSTO)
        VALUES (?, ?, ?, ?, 1, ?)`, [solicitud.idPublicacion, solicitud.idSolicitante, solicitud.fechaRetiro, solicitud.fechaEntrega, solicitud.costo]
      );

      await db.query(`
        UPDATE PUBLICACION SET ID_ESTADO_PUBLICACION = 2 WHERE ID_PUBLICACION = ?
      `, [solicitud.idPublicacion]);
    } catch (err) {
      return ({
        status: "error",
        message: 'Error solicitando alquiler.'
    });
    }
  }


  static async misPublicaciones(idUser) {
    try {
      const publicaciones = await db.query(
        `SELECT * FROM PUBLICACION P 
        INNER JOIN VEHICULO V ON P.ID_VEHICULO = V.ID_VEHICULO
        WHERE V.ID_PROPIETARIO = ? AND P.ID_ESTADO_PUBLICACION != 0`, [idUser]
      );
      if(publicaciones.length > 0){
        return publicaciones
      }
    } catch (err) {
      return ({
        status: "error",
        message: 'Error buscando publicaciones.'
    });
    }
  }


  static async eliminarPublicacion(idPublicacion) {
    try {
      await db.query(
        `UPDATE PUBLICACION SET ID_ESTADO_PUBLICACION = 0 WHERE ID_PUBLICACION = ?`, [idPublicacion]
      );
    } catch (err) {
      return ({
        status: "error",
        message: 'Error eliminando publicacion.'
    });
    }
  }
  
  static async verSolicitud(idPublicacion) {
    try {
      const solicitud = await db.query(
        `SELECT * FROM ALQUILER A 
        INNER JOIN PUBLICACION P ON P.ID_PUBLICACION = A.ID_PUBLICACION
        INNER JOIN USUARIO U ON U.ID_USUARIO = A.ID_SOLICITANTE 
        WHERE P.ID_PUBLICACION = ? AND (A.ID_ESTADO_ALQUILER = 1 OR A.ID_ESTADO_ALQUILER = 3)`, [idPublicacion]
      );

      return solicitud[0]

    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error buscando solicitud.'
    });
    }
  }

  static async rechazarSolicitud(idPublicacion, motivo) {
    try {

      await db.query(
        `UPDATE ALQUILER SET MOTIVO_RECHAZO = ? WHERE ID_PUBLICACION = ? AND ID_ESTADO_ALQUILER = 1`, [motivo, idPublicacion]
      );

      await db.query(
        `UPDATE PUBLICACION SET ID_ESTADO_PUBLICACION = 1 WHERE ID_PUBLICACION = ? `, [idPublicacion]
      );

      await db.query(
        `UPDATE ALQUILER SET ID_ESTADO_ALQUILER = 0 WHERE ID_PUBLICACION = ? `, [idPublicacion]
      );



    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error rechazando solicitud.'
    });
    }
  }

  static async aceptarSolicitud(idPublicacion) {
    try {
      await db.query(
        `UPDATE PUBLICACION SET ID_ESTADO_PUBLICACION = 3 WHERE ID_PUBLICACION = ? AND ID_ESTADO_PUBLICACION = 2`, [idPublicacion]
      );

      await db.query(
        `UPDATE ALQUILER SET ID_ESTADO_ALQUILER = 2 WHERE ID_PUBLICACION = ? AND ID_ESTADO_ALQUILER = 1`, [idPublicacion]
      );


    } catch (err) {
      return ({
        status: "error",
        message: 'Error aceptada solicitud.'
    });
    }
  }

  static async misSolicitudes(idUser) {
    try {
      const solicitudes = await db.query(
        `SELECT * FROM ALQUILER A 
        INNER JOIN PUBLICACION P ON A.ID_PUBLICACION = P.ID_PUBLICACION
        INNER JOIN VEHICULO V ON P.ID_VEHICULO = V.ID_VEHICULO
        INNER JOIN USUARIO U ON V.ID_PROPIETARIO = U.ID_USUARIO
        WHERE A.ID_SOLICITANTE = ? AND A.ID_ESTADO_ALQUILER != 4`, [idUser]
      );
      if(solicitudes.length > 0){
        return solicitudes
      }
    } catch (err) {
      return ({
        status: "error",
        message: 'Error buscando solicitudes.'
    });
    }
  }

  static async eliminarSolicitud(idSolicitud) {
    try {
      await db.query(
        `UPDATE ALQUILER SET ID_ESTADO_ALQUILER = 4 WHERE ID_ALQUILER = ?`, [idSolicitud]
      );
    } catch (err) {
      return ({
        status: "error",
        message: 'Error eliminando solicitud.'
    });
    }
  }


  static async pagarSolicitud(idSolicitud) {
    try {
      await db.query(
        `UPDATE PUBLICACION P
        SET P.ID_ESTADO_PUBLICACION = 4
        WHERE P.ID_PUBLICACION IN (
            SELECT A.ID_PUBLICACION
            FROM ALQUILER A
            WHERE A.ID_ALQUILER = ? AND A.ID_ESTADO_ALQUILER = 2
          )`, [idSolicitud]
      );

      await db.query(
        `UPDATE ALQUILER SET ID_ESTADO_ALQUILER = 3 WHERE ID_ALQUILER = ? AND ID_ESTADO_ALQUILER = 2`, [idSolicitud]
      );


    } catch (err) {
      return ({
        status: "error",
        message: 'Error aceptada solicitud.'
    });
    }
  }

  static async crearPublicacion(p) {
    try {
      await db.query(
        `INSERT INTO VEHICULO (ID_PROPIETARIO, MARCA, COLOR, MODELO, PUERTAS, CAPACIDAD, KILOMETRAJE, IMG_URL) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [p.idPropietario, p.marca, p.color, p.modelo, p.puertas, p.capacidad, p.km, p.imagen]
      );

      const idVehiculo = await db.query(
        `SELECT LAST_INSERT_ID() AS ID_VEHICULO;`
      );

      let id =  JSON.parse(JSON.stringify(idVehiculo))[0].ID_VEHICULO

      await db.query(
        `INSERT INTO PUBLICACION (ID_VEHICULO, UBICACION_RETIRO, PRECIO_DIA, ID_ESTADO_PUBLICACION, COMENTARIO)
        VALUES (?, ?, ?, 1, ?)`, [id, p.ubicacion, p.precio, p.comentario])


    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error creando publicación.'
    });
    }
  }

  static async buscarPublicaciones(ciudad) {
    try {

      ciudad = '%' + ciudad + '%'
      const publicaciones = await db.query(
        `SELECT *, P.ID_PUBLICACION FROM PUBLICACION P
        INNER JOIN VEHICULO V ON V.ID_VEHICULO = P.ID_VEHICULO
        INNER JOIN USUARIO U ON V.ID_PROPIETARIO = U.ID_USUARIO 
        LEFT JOIN ALQUILER A ON A.ID_PUBLICACION = P.ID_PUBLICACION
        WHERE UBICACION_RETIRO LIKE ? AND (P.ID_ESTADO_PUBLICACION = 1 OR P.ID_ESTADO_PUBLICACION = 4)`, [ciudad]
      );

      return publicaciones
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error buscando publicaciones.'
    });
    }
  }

  static async nuevoComentario(calificacion, comentario, vehiculo) {
    try {

      await db.query(
        `INSERT INTO OPINION (CALIFICACION, OPINION, ID_VEHICULO) 
        VALUES (?, ?, ?)`, [calificacion, comentario, vehiculo]
      );

      const idSol =  await db.query(
        `SELECT A.ID_ALQUILER FROM ALQUILER A
         INNER JOIN PUBLICACION P ON A.ID_PUBLICACION = P.ID_PUBLICACION
         INNER JOIN VEHICULO V ON V.ID_VEHICULO = P.ID_VEHICULO
         WHERE V.ID_VEHICULO = ?`, [vehiculo]
      ); 

     await db.query(
        `UPDATE ALQUILER SET ID_ESTADO_ALQUILER = 4 WHERE ID_ALQUILER = ?`, [idSol[0].ID_ALQUILER]
      );


    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error creando comentario.'
    });
    }
  }


  static async entregarAuto(idPublicacion) {
    try {
      
      await db.query(
        `UPDATE ALQUILER SET ID_ESTADO_ALQUILER = 6 WHERE ID_PUBLICACION = ? AND ID_ESTADO_ALQUILER = 3`, [idPublicacion]
      );

      await db.query(
        `UPDATE PUBLICACION SET ID_ESTADO_PUBLICACION = 6 WHERE ID_PUBLICACION = ? AND ID_ESTADO_PUBLICACION = 4`, [idPublicacion]
      );

    } catch (err) {
      return ({
        status: "error",
        message: 'Error entregando auto.'
    });
    }
  }

  static async aceptarEntrega(idPublicacion) {
    try {
      
      await db.query(
        `UPDATE ALQUILER SET ID_ESTADO_ALQUILER = 5 WHERE ID_PUBLICACION = ? AND ID_ESTADO_ALQUILER = 6`, [idPublicacion]
      );

      await db.query(
        `UPDATE PUBLICACION SET ID_ESTADO_PUBLICACION = 5 WHERE ID_PUBLICACION = ? AND ID_ESTADO_PUBLICACION = 6`, [idPublicacion]
      );

    } catch (err) {
      return ({
        status: "error",
        message: 'Error aceptando entrega del auto.'
    });
    }
  }


  static async reiniciar(idPublicacion) {
    try {
      
      await db.query(
        `UPDATE PUBLICACION SET ID_ESTADO_PUBLICACION = 1 WHERE ID_PUBLICACION = ? AND ID_ESTADO_PUBLICACION = 5`, [idPublicacion]
      );

    } catch (err) {
      return ({
        status: "error",
        message: 'Error reiniciando .'
    });
    }
  }

}
