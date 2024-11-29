import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MsgUser from "./Components/MsgUser";
import MsgIA from "./Components/MsgIA";
import FlechaDerecha from "../../public/FlechaDerecha.png";
import FlechaIzquierda from "../../public/FlechaIzquierda.png";
import axios from "axios";
import React from "react";

localStorage.setItem("conversacion", JSON.stringify([]));

export function Chat() {
  const navigate = useNavigate();
  const scrollDiv = useRef(null);

  const verificacionLogin = async () => {
    if (!localStorage.getItem("rol")) {
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
      const addmessageuser = { sender: "user", text: newMessage };
      conversacionAddmsgUser.push(addmessageuser);
      localStorage.setItem(
        "conversacion",
        JSON.stringify(conversacionAddmsgUser)
      );
      setConversacion([...conversacionAddmsgUser]);

      const response = await axios.post(
        "http://localhost:3000/psicologia/ChatAI",
        { newMessage }
      );
      const assistantMessage = response.data.message;

      const conversacionAddmsgIa = JSON.parse(
        localStorage.getItem("conversacion")
      );
      const addmessageIa = { sender: "IA", text: assistantMessage };
      conversacionAddmsgIa.push(addmessageIa);
      localStorage.setItem(
        "conversacion",
        JSON.stringify(conversacionAddmsgIa)
      );

      setConversacion([...conversacionAddmsgIa]);

      setNewMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
    // const mensajes = JSON.parse(localStorage.getItem("conversacion"));
    // console.log(mensajes);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/Login");
  };

  const username = localStorage.getItem("usuario") || "Invitado";

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
    }
  }, [conversacion]);

  return (
    <div className="bg-[#111b46] w-full h-screen flex">
      {/* Barra lateral */}
      <div
        className={`bg-[#192766] transition-all duration-300 ${
          isSidebarOpen ? "w-80" : "w-0"
        } h-full space-y-6 text-white shadow-lg`}
      >
        <button
          onClick={handleToggleSidebar}
          className={`text-white hover:text-gray-300 focus:outline-none transition-all duration-200 ${
            isSidebarOpen ? "ml-4 mt-4" : "ml-4 mt-4 absolute"
          }`}
        >
          <img
            src={isSidebarOpen ? FlechaIzquierda : FlechaDerecha}
            className="h-8"
            alt="Toggle Sidebar"
          />
        </button>

        {isSidebarOpen && (
          <div className="p-6 max-w-96 h-[500px] overflow-y-auto">
            <p className="text-lg font-semibold">Bienvenido</p>
            <p className="text-sm text-gray-400">
              Gestiona tus chats y opciones aquí.
            </p>
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
            onClick=""
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
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender === "user" ? (
                <MsgUser message={message.text} />
              ) : (
                <MsgIA message={message.text} />
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
