const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productosSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio es requerido']
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Producto', productosSchema);