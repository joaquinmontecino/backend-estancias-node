const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { simpleExecute } = require('../config/database');

class UsuarioModel {

  static async getAllUsuarios(){
    const query = `SELECT nombre, apellido, rut, correo, rol FROM Usuario`;
    const result = await simpleExecute(query);
    return result;
  }

  static async getUsuarioById(id){
    const query = `SELECT nombre, apellido, rut, correo, rol FROM Usuario WHERE id_usuario = $1`;
    const result = await simpleExecute(query, [id]);
    return result[0];
  }

  static async registerUsuario(usuarioData) {
    const { nombre, apellido, rut, correo, contrasena, rol } = usuarioData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    const query = `
          INSERT INTO Usuario (Nombre, Apellido, RUT, Correo, Contrasena, Rol)
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING ID_Usuario`;

    const binds = [nombre, apellido, rut, correo, hashedPassword, rol];
    const result = await simpleExecute(query, binds);
    return result[0];
  }


  static async loginUsuario({ correo, contrasena }) {
    const statement = `SELECT * FROM Usuario WHERE Correo = $1`;
    const binds = [correo];

    const result = await simpleExecute(statement, binds);
    const usuario = result[0];

    if (!usuario || !await bcrypt.compare(contrasena, usuario.contrasena)) {
      throw new Error('Correo o contraseña incorrectos');
    }
    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    console.log("here 6");
    return { token, rol: usuario.rol };
  }

  static async updateUsuario(id, usuarioData){
    const { nombre, apellido, rut, correo, contrasena, rol } = usuarioData;
    const query= `
      UPDATE Usuario
      SET nombre = $1, apellido = $2, rut = $3, correo = $4, rol = $5
      WHERE id_usuario = $6 RETURNING *
    `;
    const binds = [nombre, apellido, rut, correo, contrasena, rol, id];
    const result = await simpleExecute(query, binds);
    return result[0];
  }

  static async deleteUsuario(id){
    const query = `DELETE FROM Usuario WHERE id_usuario = $1`;
    await simpleExecute(query, [id]);
    return { message: 'Usuario eliminado correctamente'};
  }

}

module.exports = UsuarioModel;