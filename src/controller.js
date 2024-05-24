import { pool } from './db.js'

// Crear usuario
export const crearUsuario = async (req, res) => {
  const { name, email, role, picture } = req.body
  if (!name || !email || !role || !picture) {
    return res.status(400).json({ error: 'Name, email, role, picture son requeridos' })
  }

  try {
    const result = await pool.execute('INSERT INTO users (name, email, role, picture) VALUES (?, ?, ?, ?)', [name, email, role, picture])
    const newUser = {
      id: result.insertId,
      name,
      email,
      role,
      picture
    }
    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error al crear usuario:', error)
    res.status(500).json({ error: 'Error al crear usuario' })
  }
}

// Mostrar lista de usuarios
export const listaUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users')
    res.json(rows)
  } catch (error) {
    console.error('Error al obtener lista de usuarios:', error)
    res.status(500).json({ error: 'Error al obtener lista de usuarios' })
  }
}

// Actualizar usuario por medio del id
export const actualizarUsuario = async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const { name, email, role, picture } = req.body

  try {
    const [result] = await pool.execute('UPDATE users SET name = ?, email = ?, role = ?, picture = ? WHERE id = ?', [name, email, role, picture, userId])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json({ id: userId, name, email, role, picture })
  } catch (error) {
    console.error('Error al actualizar usuario:', error)
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
}

// Obtener usuario por id
export const usuarioID = async (req, res) => {
  const userId = parseInt(req.params.id, 10)

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId])
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(rows[0])
  } catch (error) {
    console.error('Error al obtener usuario por id:', error)
    res.status(500).json({ error: 'Error al obtener usuario por id' })
  }
}

// Eliminar un usuario por id
export const eliminarUser = async (req, res) => {
  const userId = parseInt(req.params.id, 10)

  try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [userId])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(204).send()
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}
