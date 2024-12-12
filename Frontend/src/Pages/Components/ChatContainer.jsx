import axios from "axios";
import basura from "../../../public/basura.png";
import Cookies from "js-cookie";

export default function Chatcontainer() {
  const onDelete = async () => {
    return localStorage.setItem("conversacion", "xde");
  };

  const ConsulChats = async () => {
    try {
      const res = await axios.post("http://localhost:3000/psicologia", {
        idUsuario: Cookies.get("idUsuario"),
      });
      const Data = response.data;
    } catch (error) {
      //   alert("Por favor, ingresa tanto usuario como contraseña correctos");
      //   console.log(error);
    }
  };

  ConsulChats();

  return (
    <div className="h-12 flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg mb-3 border border-gray-700">
      <div className="flex flex-col">
        <span className="text-sm">15/10/2024</span>
        <span className="text-sm">Me siento mal</span>
      </div>
      <button
        className="text-white border-none py-1 px-3 rounded cursor-pointer text-sm hover:bg-red-600"
        onClick={onDelete}
      ></button>
      <img src={basura} className="h-6 w-6"></img>
    </div>
  );
}
