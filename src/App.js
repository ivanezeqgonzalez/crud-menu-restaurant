import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './components/Productos';
import Producto from './components/Producto';
import EditarProducto from './components/EditarProducto';
import AgregarProducto from './components/AgregarProducto';
import Header from './components/Header';
import axios from 'axios';

function App() {
    const [ productos, guardarProductos ] = useState([]);
    const [ recargarProductos, guardarRecargarProductos ] = useState(true);

    useEffect(() => {
        if(recargarProductos) {
            const consultarApi = async () => {
                const resultado = await axios.get('http://localhost:4000/restaurant');
                guardarProductos(resultado.data)
            }
            consultarApi();
            guardarRecargarProductos(false); 
        }
    }, [recargarProductos]);

    return (
        <Router>
            <Header />
            <main className="container mt-5">

            </main>
            <Switch>
                <Route exact path="/productos" 
                    render={() => (
                        <Productos
                            guardarRecargarProductos={guardarRecargarProductos}
                            productos={productos}
                        />
                    )}
                />
                <Route exact path="/productos/nuevo" 
                    render={() => (
                        <AgregarProducto 
                            guardarRecargarProductos={guardarRecargarProductos}
                        />
                    )} />
                <Route exact path="/productos/:id" component={Producto} />
                <Route exact path="/productos/editar/:id" 
                    render={props => {
                        const idProducto = parseInt(props.match.params.id);
                        const producto = productos.filter(producto => producto.id === idProducto);

                        return(
                            <EditarProducto 
                                producto={producto[0]}
                                guardarRecargarProductos={guardarRecargarProductos}
                            />
                        )
                    }}
                />
            </Switch>

            <p className="mt-4 p2 text-center">-</p>
        </Router>
    );
}

export default App;
