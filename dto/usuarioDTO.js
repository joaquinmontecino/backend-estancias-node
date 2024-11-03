class UsuarioDTO {
  constructor({ nombre, apellido, rut, correo, contrasena, rol }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.rut = rut;
    this.correo = correo;
    this.contrasena = contrasena;
    this.rol = rol;
  }

  static validate(usuarioData) {
    const requiredFields = ['nombre', 'apellido', 'rut', 'correo', 'contrasena', 'rol'];

    for (let field of requiredFields) {
      if (!usuarioData[field]) {
        throw new Error(`El campo ${field} es requerido.`);
      }
    }

    // Validación específica para el rol
    const validRoles = ['Admin', 'Gestor'];
    if (!validRoles.includes(usuarioData.rol)) {
      throw new Error(`El rol debe ser uno de los siguientes: ${validRoles.join(', ')}`);
    }

    // Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuarioData.correo)) {
      throw new Error('El correo debe tener un formato válido.');
    }

    return true;
  }

  static validatePartial(usuarioData) {
    if (usuarioData.rol) {
      const validRoles = ['Admin', 'Gestor'];
      if (!validRoles.includes(usuarioData.rol)) {
        throw new Error(`El rol debe ser uno de los siguientes: ${validRoles.join(', ')}`);
      }
    }

    if (usuarioData.correo) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(usuarioData.correo)) {
        throw new Error('El correo debe tener un formato válido.');
      }
    }

    return true;
  }
}

module.exports = UsuarioDTO;
