import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MsgUser from "./Components/MsgUser";
import MsgIA from "./Components/MsgIA";
import Chatcontainer from "./Components/ChatContainer";
import FlechaDerecha from "../../public/FlechaDerecha.png";
import FlechaIzquierda from "../../public/FlechaIzquierda.png";
import axios from "axios";
import React from "react";

import Cookies from 'js-cookie'

localStorage.setItem("conversacion", JSON.stringify([]));
localStorage.setItem("idchat", null)

export function Chat() {

  const navigate = useNavigate();
  const scrollDiv = useRef(null);

  const verificacionLogin = async () => {
    if (!Cookies.get("rol")) {
      alert("Inicie sesión primero :D");
      navigate("/");
    }
  };
  verificacionLogin();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [conversacion, setConversacion] = React.useState(
    JSON.parse(localStorage.getItem("conversacion")) || []
  );

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    try {
      const conversacionAddmsgUser =
        JSON.parse(localStorage.getItem("conversacion")) || [];
      const addmessageuser = { role: "user", content: newMessage };
      conversacionAddmsgUser.push(addmessageuser);
      localStorage.setItem(
        "conversacion",
        JSON.stringify(conversacionAddmsgUser)
      );
      setConversacion([...conversacionAddmsgUser]);

      let enviarhistorial = JSON.parse(localStorage.getItem("conversacion"));

      const response = await axios.post(
        "http://localhost:3000/psicologia/ChatAI",
        { enviarhistorial }
      );
      const assistantMessage = response.data.message;

      const conversacionAddmsgIa = JSON.parse(
        localStorage.getItem("conversacion")
      );
      const addmessageIa = { role: "assistant", content: assistantMessage };
      conversacionAddmsgIa.push(addmessageIa);
      localStorage.setItem(
        "conversacion",
        JSON.stringify(conversacionAddmsgIa)
      );

      const conversacion = localStorage.getItem("conversacion")

      const responsesave = await axios.post(
        "http://localhost:3000/psicologia/ChatSave",
        {
          idchat: Cookies.get("idchat"),
          idUsuario: Cookies.get("idUsuario"),
          conversacion
        }
      )

      Cookies.set("idchat", (responsesave.data.chat.idchat),
        {
          expires: 1,
          secure: true,
          sameSite: 'Strict',
          path: '/',
        })

      setConversacion([...conversacionAddmsgIa]);
      setNewMessage("");

    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('idUsuario', "usuario", "rol", "idchat", { path: '/' });
    navigate("/Login");
  };

  const username = Cookies.get("usuario");

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
    }
  }, [conversacion]);

  return (
    <div className="bg-[#111b46] w-full h-screen flex">
      {/* Barra lateral */}
      <div
        className={`bg-[#192766] transition-all duration-300 ${isSidebarOpen ? "w-80" : "w-0"
          } h-full space-y-6 text-white shadow-lg`}
      >
        <button
          onClick={handleToggleSidebar}
          className={`text-white hover:text-gray-300 focus:outline-none transition-all duration-200 ${isSidebarOpen ? "ml-4 mt-4" : "ml-4 mt-4 absolute"
            }`}
        >
          <img
            src={isSidebarOpen ? FlechaIzquierda : FlechaDerecha}
            className="h-8"
            alt="Toggle Sidebar"
          />
        </button>

        {isSidebarOpen && (

          <div className="p-6 max-w-96 max-h-96 overflow-y-auto">
            <Chatcontainer></Chatcontainer>
          </div>

        )}

        <div className="flex flex-col items-center mt-auto p-6 space-y-4">
          {isSidebarOpen && (
            <p className="text-lg font-bold text-gray-200">{username}</p>
          )}
          <button
            onClick={handleLogout}
            className="w-full p-3 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Cerrar sesión
          </button>
          <button
            // onClick={handleLogout}
            className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Editar Datos
          </button>
        </div>
      </div>

      {/* Contenido del chat */}
      <div className="flex-1 flex flex-col justify-between bg-[#111b46] text-white">
        <div
          ref={scrollDiv}
          id="chatContainer"
          className="flex-1 overflow-y-auto space-y-4 p-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          {conversacion.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
              {message.role === "user" ? (
                <MsgUser message={message.content} />
              ) : (
                <MsgIA message={message.content} />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center bg-[#111b46] p-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-3 rounded-l-md border-none focus:outline-none bg-[#333] text-white placeholder:text-write"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md focus:outline-none"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
