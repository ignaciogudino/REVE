import DB from '../../config/mysql.js';

const db = new DB();

export default class UserService {

  static async checkLogin(username, pass) {
    try {
      const user = await db.query(
        `SELECT * FROM USUARIO WHERE DNI = ? AND DELETED = 0`, [username]
      );
      if(user && pass === user[0]?.CONTRASENA){
        return {
          ID_USER: user[0].ID_USER,
          NOMBRE: user[0].NOMBRE,
          APELLIDO: user[0].APELLIDO,
          DNI: user[0].DNI,
          ID_ROL: user[0].ID_ROL,
          VENCIMIENTO: user[0].VENCIMIENTO
        }
      }
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Usuario no encontrado.'
    });
    }
  }
  
  static async getUserByID(idUser) {
    try {
      const user = await db.query(
        `SELECT ID_USER,NOMBRE,APELLIDO,DNI,ID_ROL,VENCIMIENTO FROM USUARIO WHERE ID_USER = ?`, [idUser]
      );
      return user[0]
    } catch (err) {
      console.log(err)
      return ({
        message: 'Error getting rutinas.'
      });
    }
  }

  
}
