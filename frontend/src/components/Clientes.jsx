import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://peticioneshttpv2.onrender.com';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id_cliente: null,
    nomCliente: '',
    contacto: '',
    departamento: '',
    ciudad: ''
  });
  const [editando, setEditando] = useState(false);

  // Obtener la lista
  const cargarClientes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/clientes`);
      if (!res.ok) throw new Error('Error al conectar con la API');
      const data = await res.json();
      setClientes(data);
      setError(null);
    } catch (err) {
      setError('No se pudo cargar la lista de clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guardar (Agregar o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await fetch(`${API_URL}/clientes/${form.id_cliente}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      } else {
        await fetch(`${API_URL}/clientes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
      }
      limpiarFormulario();
      cargarClientes();
    } catch (err) {
      alert('Error al guardar datos');
    }
  };

  const handleEditar = (cliente) => {
    setForm(cliente);
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Deseas eliminar este cliente?')) return;
    try {
      await fetch(`${API_URL}/clientes/${id}`, { method: 'DELETE' });
      cargarClientes();
    } catch (err) {
      alert('Error al eliminar cliente');
    }
  };

  const limpiarFormulario = () => {
    setForm({ id_cliente: null, nomCliente: '', contacto: '', departamento: '', ciudad: '' });
    setEditando(false);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Gestión de Clientes</h2>

      {/* FORMULARIO AGREGAR / EDITAR */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input
          type="text"
          name="nomCliente"
          placeholder="Nombre del Cliente"
          value={form.nomCliente}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contacto"
          placeholder="Teléfono / Contacto"
          value={form.contacto}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="departamento"
          placeholder="Departamento"
          value={form.departamento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={form.ciudad}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ backgroundColor: editando ? '#f0ad4e' : '#5cb85c', color: '#fff', border: 'none', padding: '6px 12px', cursor: 'pointer' }}>
          {editando ? 'Actualizar' : 'Agregar'}
        </button>
        {editando && (
          <button type="button" onClick={limpiarFormulario} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            Cancelar
          </button>
        )}
      </form>

      {/* LISTADO */}
      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.id_cliente}>
                <td>{cli.id_cliente}</td>
                <td>{cli.nomCliente}</td>
                <td>{cli.contacto}</td>
                <td>{cli.departamento}</td>
                <td>{cli.ciudad}</td>
                <td>
                  <button
                    onClick={() => handleEditar(cli)}
                    style={{ marginRight: '5px', backgroundColor: '#0275d8', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(cli.id_cliente)}
                    style={{ backgroundColor: '#d9534f', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
