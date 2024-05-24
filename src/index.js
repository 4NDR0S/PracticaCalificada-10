import express from 'express'
import bodyParser from 'body-parser'

import { crearUsuario, listaUsuarios, actualizarUsuario, usuarioID, eliminarUser } from './controller.js'
import { manejarErrorArchivo } from './helper.js'

const app = express()

app.use(bodyParser.json())

// Crear un usuario y mandarlo a la base de datos
app.post('/users', crearUsuario, manejarErrorArchivo)

// Leer los usuarios de la base de datos
app.get('/users', listaUsuarios)

// Obeter usuario por id
app.get('/users/:id', usuarioID)

// Actualizar usuario por medio del id
app.put('/users/:id', actualizarUsuario)

// Eliminar el usuario por medio del id
app.delete('/users/:id', eliminarUser)

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
