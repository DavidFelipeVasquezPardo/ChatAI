import axios from "axios";
import basura from "/basura.png";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function Chatcontainer() {
  const [data, setData] = useState([]);

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

  const CargarChat = async () => {
    alert("xd");
  };

  const ordenarChatsPorFecha = (chats) => {
    return chats.sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));
  };

  return (
    <div className="flex flex-col">
      {ordenarChatsPorFecha(data).map((values, index) => {
        const { year, mes, dia, weekday, hora } = formatFechaHora(values.fechaHora);

        return (
          <div key={index} className="w-full h-16 p-2 flex flex-row bg-gray-500 mb-4 rounded-lg">
            <button onClick={CargarChat} className="w-3/4">
              <p className="text-xs text-center">{`${weekday} ${dia} de ${mes} ${year}`}</p>
              <p className="text-sm text-start ml-3">{hora}</p>
            </button>
            <button className="w-1/4 flex content-center justify-center items-center bg-gray-700 rounded-lg">
              <img
                src={basura}
                className="w-6"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
