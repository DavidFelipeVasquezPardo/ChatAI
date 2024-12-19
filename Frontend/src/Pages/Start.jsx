import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import { prompt } from "./Components/Prompts";

import BotIcon from "/BotIcon.png";

export function Start() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!usuario || !contrasena) {
      alert("Por favor, ingresa tanto usuario como contraseña.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/psicologia/Login", {
        usuario,
        contrasena,
      });

      Cookies.set("idUsuario", res.data.usuario.idUsuario, {
        expires: 7, // Expira en 7 días
        secure: true, // Solo se envía por HTTPS
        sameSite: "Strict", // Evita el envío en solicitudes de terceros
        path: "/", // Disponible en todo el dominio
      });

      Cookies.set("usuario", res.data.usuario.usuario, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      Cookies.set("rol", res.data.usuario.rol, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });
      
      localStorage.setItem(
        "conversacion",
        JSON.stringify([prompt]));
      
      localStorage.setItem("idchat", null);

      if (Cookies.get("rol") === "user") {
        navigate("/Chat");
      } else if (rol === "admin") {
        navigate("/Admin");
      }
    } catch (error) {
      alert("Por favor, ingresa tanto usuario como contraseña correctos");
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 w-full h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center w-full max-w-5xl p-6 rounded-lg bg-white shadow-xl">
        <div className="flex flex-col items-center w-full max-w-md p-6 space-y-4">
          <h2 className="text-3xl font-semibold text-blue-700 mb-6">
            ¡Bienvenido!
          </h2>

          <form
            className="text-gray-700 flex flex-col space-y-4 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-2">
              <p className="font-medium text-blue-700">Usuario:</p>
              <input
                type="text"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <p className="font-medium text-blue-700">Contraseña:</p>
              <input
                type="password"
                required
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6 text-blue-700 text-center">
            <p>¡Si no tienes cuenta, créala!</p>
            <Link to="/Register">
              <button className="mt-2 py-2 px-6 bg-transparent border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-700 rounded-md transition-all duration-300">
                Crear cuenta
              </button>
            </Link>
          </div>
        </div>

        <div className="flex w-full h-full justify-center">
          <img
            src={BotIcon}
            alt="Bienvenida"
            className="w-4/6 h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );


}
