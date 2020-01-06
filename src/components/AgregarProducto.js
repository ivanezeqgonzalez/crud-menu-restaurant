import React, { useState } from 'react';
import Error from '../components/Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function AgregarProducto({history, guardarRecargarProductos}) {
    const [ nombrePlato, guardarNombrePlato ] = useState('');
    const [ precioPlato, guardarPrecioPlato ] = useState('');
    const [ categoria, guardarCategoriaPlato ] = useState('');
    const [ error, guardarError]  = useState(false);

    const leerValorRadio = e => {
        guardarCategoriaPlato(e.target.value)
    }

    const agregarProducto = async e => {
        e.preventDefault();
        let formInvalido = nombrePlato === '' || precioPlato === '' || categoria === '';

        if(formInvalido) {
            guardarError(true)
            return;
        }

        guardarError(false);
        try {
            const resultado = await axios.post('http://localhost:4000/restaurant', {
                nombrePlato,
                precioPlato,
                categoria
            });
            if(resultado.status === 201) {
                Swal.fire(
                    'Producto creado',
                    'El producto se creo correctamente',
                    'success'
                )
            }
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, volve a intentarlo'
            })
        }
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    return (
        <div className="col-md-8 mx-auto">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {(error) ? 
                <Error mensaje='Todos los campos son obligatorios'/>
                : null }
            <form
                onSubmit={agregarProducto}
                className="mt-5"
            >
                <div className="form-group">
                    <label>Nombre Plato</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Plato"
                        onChange={e => guardarNombrePlato(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Plato</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Plato"
                        onChange={e => guardarPrecioPlato(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="postre"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="bebida"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="cortes"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="ensalada"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
    )
}

export default withRouter(AgregarProducto);