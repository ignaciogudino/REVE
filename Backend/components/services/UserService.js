import DB from '../../config/mysql.js';

const db = new DB();

export default class UserService {

  static async checkLogin(email, pass) {
    try {
      const user = await db.query(
        `SELECT * FROM USUARIO WHERE EMAIL = ? AND CONTRASENA = ? `, [email, pass]
      );
      if(user.length > 0){
        return {
          id_usuario: user[0].ID_USUARIO,
          nombre: user[0].NOMBRE,
          apellido: user[0].APELLIDO,
          dni: user[0].DNI,
          domicilio: user[0].DOMICILIO,
          email: user[0].EMAIL,
          cbu: user[0].CBU
        }
      }
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error buscando usuario.'
    });
    }
  }


  static async register(newUser) {
    try {
      await db.query(
        `INSERT INTO USUARIO (NOMBRE, APELLIDO, DNI, DOMICILIO, EMAIL, CONTRASENA, CBU, WSP)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [newUser.nombre, newUser.apellido, newUser.dni, newUser.domicilio, newUser.mail, newUser.password, newUser.cbu, newUser.wsp]
      );
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error registrando usuario.'
    });
    }
  }

  static async getUsuario(idUser) {
    try {
      const user = await db.query(
        `SELECT * FROM USUARIO WHERE ID_USUARIO = ?`, [idUser]
      );
      if(user.length > 0){
        return {
          id_usuario: user[0].ID_USUARIO,
          nombre: user[0].NOMBRE,
          apellido: user[0].APELLIDO,
          dni: user[0].DNI,
          domicilio: user[0].DOMICILIO,
          email: user[0].EMAIL,
          cbu: user[0].CBU,
          wsp: user[0].WSP
        }
      }
    } catch (err) {
      console.log(err)
      return ({
        status: "error",
        message: 'Error buscando usuario.'
    });
    }
  }

}
