import React, { useState, useRef } from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function EditarProducto(props) {
    const {history, producto, guardarRecargarProductos} = props;
    const nombrePlatoRef = useRef('');
    const precioPlatoRef = useRef('');

    const [ categoria, guardarCategoriaPlato ] = useState('');
    const [ error, guardarError]  = useState(false);
    
    const editarProducto = async e => {
        e.preventDefault();
        const nuevoNombrePlato = nombrePlatoRef.current.value,
              nuevoPrecioPlato = precioPlatoRef.current.value;

        if(nuevoNombrePlato === '' || nuevoPrecioPlato === '' ) {
            guardarError(true);
            return;
        }

        guardarError(false);
        
        let categoriaPlato = (categoria === '') ? producto.categoria : categoria;

        const editarPlato = {
            precioPlato: nuevoPrecioPlato,
            nombrePlato: nuevoNombrePlato,
            categoria: categoriaPlato
        }

        const url = `http://localhost:4000/restaurant/${producto.id}`;
        try {
            const resultado = await axios.put(url, editarPlato);
            if(resultado.status === 200) {
                Swal.fire(
                    'Producto editado',
                    'El producto se edito correctamente',
                    'success'
                )
            }
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, volve a intentarlo'
            })
            console.error(error);
        }
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    const leerValorRadio = e => {
        guardarCategoriaPlato(e.target.value)
    }


    return (
        <div className="col-md-8 mx-auto">
            <h1 className="text-center">Editar Producto</h1>
            {(error) ? 
                <Error mensaje='Todos los campos son obligatorios'/>
                : null }
            <form
                onSubmit={editarProducto}
                className="mt-5"
            >
                <div className="form-group">
                    <label>Nombre Plato</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Plato"
                        ref={nombrePlatoRef}
                        defaultValue={producto.nombrePlato}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Plato</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        placeholder="Precio Plato"
                        ref={precioPlatoRef}
                        defaultValue={producto.precioPlato}
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
                        defaultChecked={(producto.categoria === 'postre')}
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
                        defaultChecked={(producto.categoria === 'bebida')}
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
                        defaultChecked={(producto.categoria === 'cortes')}
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
                        defaultChecked={(producto.categoria === 'ensalada')}
                        value="ensalada"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditarProducto);