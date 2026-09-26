import { useEffect, useState } from 'react';
import api from '../services/api';
import Table from 'react-bootstrap/Table';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    api.get('/ventas')
      .then(res => {
        setVentas(res.data);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, []);

  if (cargando) return <div className="container"><p>Cargando ventas...</p></div>;

  return (
    <div className="container">
      <h2>Listado de Ventas</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id_venta}>
              <td>{v.id_venta}</td>
              <td>{v.id_cliente}</td>
              <td>{v.fecha_venta}</td>
              <td>${v.total}</td>
              <td>{v.estado}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Ventas;