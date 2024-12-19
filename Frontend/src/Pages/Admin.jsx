import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export function Admin() {

    const navigate = useNavigate();

    const verificacionLogin = async () => {
        if (!Cookies.get("rol") || Cookies.get("rol") !== "admin") {
          navigate("/");
        }
      };

    verificacionLogin();

    const [search, setSearch] = useState('');
    const [data, setData] = useState(null);

    const handleSearch = async () => {
        const params = {};
        if (search) {
            params.correo = search;
            params.documento = search;
        }

        try {
            const response = await axios.get(`http://localhost:3000/psicologia/ConsultaUser`, { params });
            setData(response.data.user);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove("idUsuario");
        Cookies.remove("usuario");
        Cookies.remove("rol");
        navigate("/Login");
      };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg mb-8 p-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Asistente Psicológico</h1>
              <p className="text-slate-500 mt-1">Sistema de Administración</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2 font-medium"
            >
              Cerrar Sesión
            </button>
          </div>
  
          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-lg mb-8 p-6">
            <div className="flex gap-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por correo o cédula"
                className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg transition-colors duration-200 font-medium"
              >
                Buscar
              </button>
            </div>
          </div>
  
          {data && (
            <div className="space-y-8">
              {/* User Information Card */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Información Usuario</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(data)
                    .filter(([key]) => !Array.isArray(data[key]))
                    .map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                        <span className="text-slate-800">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
  
              {/* Personal Information Section */}
              {data.informacionPersonal && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Información Personal</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.informacionPersonal.map((info, index) => (
                      Object.entries(info).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">{value}</span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Living Conditions Section */}
              {data.condicionesVivienda && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Condiciones de Vivienda</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.condicionesVivienda.map((condicion, index) => (
                      Object.entries(condicion).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Education Section */}
              {data.educacion && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Educación</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.educacion.map((edu, index) => (
                      Object.entries(edu).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">
                            {Array.isArray(value) ? value.join(', ') : value}
                          </span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Work Situation Section */}
              {data.situacionlaboral && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Situación Laboral</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.situacionlaboral.map((situacion, index) => (
                      Object.entries(situacion).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">{value}</span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
  
              {/* Health Section */}
              {data.salud && (
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 pb-4 border-b">Salud</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.salud.map((salud, index) => (
                      Object.entries(salud).map(([key, value]) => (
                        <div key={`${index}-${key}`} className="flex flex-col">
                          <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
                          <span className="text-slate-800">{value}</span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
}
