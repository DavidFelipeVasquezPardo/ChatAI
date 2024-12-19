import axios from "axios";
import basura from "/basura.png";
import Cookies from "js-cookie";
import { prompt } from "./Prompts";
import { useState, useEffect } from "react";

export default function Chatcontainer({ onChatLoaded }) {
  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const ConsulChats = async () => {
    try {
      const res = await axios.post("http://localhost:3000/psicologia/AllChats", {
        idUsuario: Cookies.get("idUsuario"),
      });
      setData(res.data.Allchats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ConsulChats();
  }, []);

  const formatFechaHora = (fechaHora) => {
    const date = new Date(fechaHora);
    const year = date.getFullYear();
    const mes = date.toLocaleString('es-ES', { month: 'long' });
    const dia = date.getDate();
    const weekday = date.toLocaleString('es-ES', { weekday: 'long' });
    const hora = date.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' });

    return { year, mes, dia, weekday, hora };
  };

  const CargarChat = async (idchat) => {
    try {
      const res = await axios.post("http://localhost:3000/psicologia/CargarChat", {
        idchat: idchat,
      });
        localStorage.setItem("conversacion", res.data.Cargar.conversacion);
        localStorage.setItem("idchat", idchat);
        onChatLoaded();
    } catch (error) {
      console.log(error);
    }
  };

  const EliminarChat = async (idchat) => {
    try {
      const res= await axios.delete("http://localhost:3000/psicologia/delete-chat", {
        data: { chatId: idchat },
      });
      if(res.data.idchat === localStorage.getItem("idchat")) {
        localStorage.removeItem("conversacion");
        localStorage.removeItem("idchat");

        localStorage.setItem(
          "conversacion",
          JSON.stringify([prompt]));
    
        localStorage.setItem("idchat", null);
      }
      setData(data.filter(chat => chat.idchat !== idchat));
      onChatLoaded();
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const ordenarChatsPorFecha = (chats) => {
    return chats.sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
  };

  return (
    <div className="flex flex-col w-full" key={refreshKey}>
      {
        ordenarChatsPorFecha(data).map((values, index) => {
          const { year, mes, dia, weekday, hora } = formatFechaHora(values.fechaHora);
          const idchat = values.idchat;

          return (
            <div
              key={index}
              className="flex w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-2"
            >
              <button
                onClick={() => CargarChat(idchat)}
                className="flex-1 text-left"
              >
                <p className="text-sm font-medium text-blue-700">{`${weekday} ${dia} de ${mes} / ${year}`}</p>
                <p className="text-xs text-gray-500 mt-1">{hora}</p>
              </button>
              <button
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-lg transition-colors duration-300"
                onClick={() => EliminarChat(idchat)}
              >
                <img
                  src={basura}
                  className="w-6"
                  alt="Eliminar chat"
                />
              </button>
            </div>
          );
        })
      }
    </div>
);

}
