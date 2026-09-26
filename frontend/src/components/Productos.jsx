import { useEffect, useState } from 'react';
import api from '../services/api';
import Table from 'react-bootstrap/Table';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get('/productos')
      .then(res => {
        setProductos(res.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  if (cargando) return <div className="container"><p>Cargando productos...</p></div>;

  return (
    <div className="container">
      <h2>Listado de Productos</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>{p.nomProducto}</td>
              <td>{p.cantidad}</td>
              <td>${p.precio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Productos;