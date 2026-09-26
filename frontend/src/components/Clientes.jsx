import { useEffect, useState } from 'react';
import api from '../services/api';
import Table from 'react-bootstrap/Table';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/clientes')
      .then(response => {
        setClientes(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('No se pudo cargar la lista de clientes');
        setCargando(false);
        console.error(err);
      });
  }, []);

  if (cargando) return <div className="container"><p>Cargando clientes...</p></div>;
  if (error) return <div className="container"><p className="text-danger">{error}</p></div>;

  return (
    <div className="container">
      <h2>Listado de Clientes</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Departamento</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(c => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nomCliente}</td>
              <td>{c.contacto}</td>
              <td>{c.departamento}</td>
              <td>{c.ciudad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Clientes;