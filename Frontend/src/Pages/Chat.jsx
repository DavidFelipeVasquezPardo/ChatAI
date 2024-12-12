import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MsgUser from "./Components/MsgUser";
import MsgIA from "./Components/MsgIA";
import Chatcontainer from "./Components/ChatContainer";
import FlechaDerecha from "../../public/FlechaDerecha.png";
import FlechaIzquierda from "../../public/FlechaIzquierda.png";
import axios from "axios";
import React from "react";

import Cookies from "js-cookie";

localStorage.setItem(
  "conversacion",
  JSON.stringify([
    {
      role: "system",
      content: `
Eres un asistente virtual de apoyo psicológico empático y respetuoso. Tu objetivo es escuchar a los usuarios, validar sus emociones y guiarlos en una conversación segura y acogedora. 

Mantienes siempre el contexto de la conversación, refiriéndote a lo que el usuario ya ha compartido, y continúas explorando sus pensamientos y sentimientos sin repetir preguntas o dar la impresión de empezar de nuevo. Utilizas un lenguaje cálido, comprensivo y no juzgador.

Nunca diagnosticas ni prescribes soluciones definitivas. En cambio, ofreces sugerencias generales y fomentas que el usuario reflexione sobre su situación. Siempre sugieres buscar ayuda profesional en caso necesario, pero sin presionar.

Cuando el usuario quiera terminar la conversación, te despides de manera amable y reafirmas que estás disponible para futuros diálogos. Aquí tienes un ejemplo de tu comportamiento:

Usuario: Me siento abrumado últimamente.
Asistente: Lamento que te sientas así. Antes mencionaste que los plazos de tu trabajo eran una fuente de estrés. ¿Cómo ha sido eso para ti últimamente?

Usuario: Creo que está igual, pero estoy tratando de manejarlo.
Asistente: Es un gran paso que estés tratando de manejarlo. ¿Hay algo que sientas que te ha ayudado un poco, aunque sea pequeño?

Usuario: Quizá escribir mis tareas.
Asistente: Esa es una excelente idea. Organizar tus pensamientos puede ser útil. ¿Te gustaría que exploremos otras maneras de apoyarte en este proceso?

Siempre actúas como este ejemplo y solo respondes a conversaciones de tipo psicologico cualquier otro tipo responde que no estas hecho para eso. Ahora el usuario continuará la conversación contigo.
`,
    },
  ])
);
localStorage.setItem("idchat", null);

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

      const conversacion = localStorage.getItem("conversacion");

      const responsesave = await axios.post(
        "http://localhost:3000/psicologia/ChatSave",
        {
          idchat: Cookies.get("idchat"),
          idUsuario: Cookies.get("idUsuario"),
          conversacion,
        }
      );

      Cookies.set("idchat", responsesave.data.chat.idchat, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
        path: "/",
      });

      setConversacion([...conversacionAddmsgIa]);
      setNewMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("idUsuario", "usuario", "rol", "idchat", { path: "/" });
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
        className={`bg-gradient-to-r from-[#2d14ee] to-[#6241f2] transition-all duration-300 flex flex-col ${
          isSidebarOpen ? "w-80" : "w-0"
        } h-full space-y-6 text-white shadow-lg`}
      >
        <div className="h-1/6">
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
        </div>

        <div className="p-6 max-w-96 max-h-96 overflow-y-auto h-3/6">
          {/* <Chatcontainer></Chatcontainer> */}
        </div>

        <div className="flex flex-col items-center mt-auto p-6 space-y-4 h-2/6">
          <p className="text-lg font-bold text-gray-200">{username}</p>
          <button
            onClick={handleLogout}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Cerrar sesión
          </button>
          <button
            // onClick={handleLogout}
            className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Editar Datos
          </button>
        </div>
      </div>

      {/* Contenido del chat */}
      <div className="flex-1 flex flex-col justify-between bg-[#4a31b7] text-white">
        <div
          ref={scrollDiv}
          id="chatContainer"
          className="flex-1 overflow-y-auto space-y-4 p-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          {conversacion.slice(1).map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
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

        <div className="flex items-center bg-[#4a31b7] p-4">
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
