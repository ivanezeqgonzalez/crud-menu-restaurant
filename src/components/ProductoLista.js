import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function ProductoLista({producto, guardarRecargarProductos}) {
    const eliminarProducto = (id) => {
        console.log(id);
        Swal.fire({
            title: 'Estás seguro?',
            text: "Este cambio no se puede revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar Producto',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) { 
                try {
                    const url = `http://localhost:4000/restaurant/${producto.id}`;
                    const resultado = await axios.delete(url);
                    if(resultado.status === 200){
                        Swal.fire(
                            'Eliminado',
                            'El producto ha sido eliminado',
                            'success'
                        )
                    }
                    guardarRecargarProductos(true);
                } catch (error) {
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Hubo un error, volve a intentarlo'
                    });
                    console.error(error)
                }
            }
        })
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <p data-categoria={producto.categoria}>
                {producto.nombrePlato} 
                <span className="font-weight-bold"> ${producto.precioPlato}</span>
            </p>
            <div>
                <Link
                    to={`/productos/editar/${producto.id}`}
                    className="btn btn-success mr-2"
                >Editar</Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarProducto(producto.id)}
                >Eliminar &times;</button>
            </div>
        </li>
    )
}

export default ProductoLista;