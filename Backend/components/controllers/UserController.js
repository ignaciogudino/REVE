import User from '../services/UserService.js'
import { generateAccessToken, getLoggedUser } from '../../config/auth.js'

export default class UserController {

  static async login(req, res, next) {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const login = await User.checkLogin(email, password);
        
        if (!login) {
          return await res.status(400).send({
              status: "error",
              message: 'Usuario no encontrado o datos incorrectos.'
          });
        }
         
        let tokenUser = await generateAccessToken(login)
        return await res.status(200)
        .json({
          user: login,
          token: tokenUser
        })
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }


  static async register(req, res, next) {
    try {
        const newUser = {
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          dni: req.body.dni,
          domicilio: req.body.domicilio,
          wsp: req.body.wsp,
          cbu: req.body.cbu,
          mail: req.body.mail,
          password: req.body.password
        }

        await User.register(newUser);

        return await res.status(200)
        .json({
          message: "Usuario registrado."
        })
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }


  static async getUsuario(req, res, next) {
    try {

        const idUser = await getLoggedUser(req)
        const user = await User.getUsuario(idUser);

        return await res.status(200).json(user)
        
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }
}
