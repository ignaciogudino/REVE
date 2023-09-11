import User from '../services/UserService.js'
import { generateAccessToken, getLoggedUser } from '../../config/auth.js'

export default class UserController {

  static async login(req, res, next) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const login = await User.checkLogin(username, password);
        if (!login) {
        return await res.status(200).send({
            status: "error",
            message: 'Usuario no encontrado o datos incorrectos.'
        });
        } else {
          let tokenUser = await generateAccessToken(login)
          return await res.status(200)
          .json({
            user: login,
            token: tokenUser
          })
        }
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

  static async getUserByID(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.getUserByID(id);
        if (!user) {
        return await res.status(200).send({
            status: "error",
            message: 'Usuario no encontrado.'
        });
        } else {
        return await res.status(200).json(user);
        }
    } catch (err) {
      res.status(500).send(err);
      next(err);
    }
  }

}
