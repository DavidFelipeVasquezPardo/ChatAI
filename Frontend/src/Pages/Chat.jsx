import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MsgUser from "./Components/MsgUser";
import MsgIA from "./Components/MsgIA";
import Chatcontainer from "./Components/ChatContainer";
import FlechaDerecha from "/FlechaDerecha.png";
import FlechaIzquierda from "/FlechaIzquierda.png";
import NuevoChat from "/NuevoChat.png"
import NuecoChatAzul from "/NuevoChatAzul.png"
import EnviarIcon from "/iconEnviar.png";
import axios from "axios";
import React from "react";

import Cookies from "js-cookie";
import { prompt } from "./Components/Prompts";

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
    JSON.parse(localStorage.getItem("conversacion"))
  );
  const [isCooldown, setIsCooldown] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChatUpdate = () => {
    const updatedConversacion = JSON.parse(localStorage.getItem("conversacion"));
    setConversacion(updatedConversacion);
    setRefreshKey(prev => prev + 1);
  };

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
      if (isCooldown) return;
      if (newMessage.trim() === "") return;
      const conversacionAddmsgUser =
        JSON.parse(localStorage.getItem("conversacion"));
      const addmessageuser = { role: "user", content: newMessage };
      conversacionAddmsgUser.push(addmessageuser);
      localStorage.setItem(
        "conversacion",
        JSON.stringify(conversacionAddmsgUser)
      );
      setConversacion([...conversacionAddmsgUser]);

      setNewMessage("");
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 3000);

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

      const idchat =
        localStorage.getItem("idchat") === "null"
          ? null
          : localStorage.getItem("idchat");
      const conversacion = localStorage.getItem("conversacion");

      const responsesave = await axios.post(
        "http://localhost:3000/psicologia/ChatSave",
        {
          idchat: idchat,
          idUsuario: Cookies.get("idUsuario"),
          conversacion,
        }
      );

      const idchatRes = responsesave.data.chat.idchat;

      localStorage.setItem("idchat", idchatRes);

      setConversacion([...conversacionAddmsgIa]);
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("idUsuario", "usuario", "rol", "idchat");
    navigate("/Login");
  };

  const NewChat = () => {
    localStorage.clear();
    setConversacion([]);

    localStorage.setItem(
      "conversacion",
      JSON.stringify([prompt]));

    localStorage.setItem("idchat", null);

    // setRefreshKey((prevKey) => prevKey + 1);
  }

  const username = Cookies.get("usuario");

  useEffect(() => {
    if (scrollDiv.current) {
      scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
    }
  }, [conversacion]);

  return (
    <div className="bg-blue-50 w-full h-screen flex">
      {/* Sidebar */}
      <div
  className={`bg-gradient-to-b from-blue-500 to-blue-700 duration-300 flex flex-col justify-around ${
    isSidebarOpen ? "w-80" : "w-0"
  } h-screen space-y-6 text-white shadow-xl`}
>
  <div className="h-20 flex flex-row items-start">
    <button
      onClick={handleToggleSidebar}
      className={`transform duration-300 ${
        isSidebarOpen ? "ml-4 mt-4 absolute" : "ml-4 mt-4 absolute"
      }`}
    >
      <img
        src={isSidebarOpen ? FlechaIzquierda : FlechaDerecha}
        className="h-8"
        alt="Toggle Sidebar"
      />
    </button>
    <button
      onClick={NewChat}
      className={`transform duration-300 ${
        isSidebarOpen ? "ml-64 mt-3 absolute" : "ml-14 mt-3 absolute"
      }`}
    >
      <img src={isSidebarOpen ? NuevoChat : NuecoChatAzul} className="h-10" />
    </button>
  </div>

  <div className="p-6 max-w-96 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-600">
    <Chatcontainer key={refreshKey} onChatLoaded={handleChatUpdate}></Chatcontainer>
  </div>

  <div className="flex flex-col items-center mt-auto p-6 space-y-4 h-52 bg-blue-900 bg-opacity-30">
    <p className="text-lg font-semibold text-blue-50">{username}</p>
    <button
      onClick={handleLogout}
      className="w-full p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-colors duration-200"
    >
      Cerrar sesión
    </button>
    <button
      className={`w-full p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg shadow-lg transition-colors duration-200" ${ isSidebarOpen ? "w-full p-3" : "w-2 h-2"}`}
    >
      Editar Datos
    </button>
  </div>
</div>


      {/* Chat content */}
      <div className="flex-1 flex flex-col justify-between bg-gradient-to-br from-blue-50 to-blue-200">
        <div
          ref={scrollDiv}
          id="chatContainer"
          className="flex-1 overflow-y-auto space-y-6 p-8 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 ml-24 mr-24"
        >
          {conversacion.slice(1).map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "user" ? (
                <MsgUser message={message.content} />
              ) : (
                <MsgIA message={message.content} />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center bg-white bg-opacity-90 p-6 border-t border-blue-100 shadow-inner ml-24 mr-24 rounded-3xl mb-4">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 p-4 rounded-l-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-blue-800 placeholder:text-blue-400"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <img
              src={EnviarIcon}
              className="w-6 mr-1"
              alt="Enviar mensaje"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
