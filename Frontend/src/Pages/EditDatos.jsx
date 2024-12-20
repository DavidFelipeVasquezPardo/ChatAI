import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import steps from "./Components/Prompts.jsx";
import BotIcon from "../../public/BotIcon.png";
import "./Components/Css.css";

export function EditDatos() {

    const navigate = useNavigate();

    const verificacionLogin = async () => {
        if (!Cookies.get("rol") || Cookies.get("rol") !== "user") {
            navigate("/");
        }
    };

    const idUsuario = Cookies.get("idUsuario");

    const [data, setData] = useState({});
    
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/psicologia/ConsultaUser', { params: { idUsuario } });
            setData(response.data.user);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        verificacionLogin();
        fetchData();
    }, []);

    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        telefonoPersonal: "",
        telefonoFamiliar: "",
        tipoDocumento: "",
        documento: "",
        usuario: "",
        contrasena: "",
        edad: 0,
        sexo: "",
        genero: "",
        estadocivil: "",
        hijosnum: 0,
        personascargo: 0,
        vivienda: "",
        localidad: "",
        tipovivienda: "",
        familiaresnum: 0,
        estrato: 0,
        etnico: "",
        hacinamiento: "",
        violencia: "",
        servicios: "",
        problemas: "",
        tipozona: "",
        tipocolegio: "",
        nivelescolaridad: "",
        carrera: "",
        periodo: "",
        motivo: "",
        matedificulta: "",
        nivelingles: "",
        situacion: "",
        ingresos: "",
        sector: "",
        jornada: "",
        ascenso: "",
        enfermecronica: "",
        discapacidad: "",
        suspsicoactivas: "",
        alcohol: "",
        Internet: "",
        nicotina: "",
        eps: "",
        asispsicologo: "",
    });

    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            nombre: data.nombre || "",
            apellido: data.apellido || "",
            correo: data.correo || "",
            telefonoPersonal: data.telefonoPersonal || "",
            telefonoFamiliar: data.telefonoFamiliar || "",
            tipoDocumento: data.tipoDocumento || "",
            documento: data.documento || "",
            usuario: data.credenciales?.[0]?.usuario || "",
            contrasena:"",
            edad: data.informacionPersonal?.[0]?.edad || 0,
            sexo: data.informacionPersonal?.[0]?.sexo || "",
            genero: data.informacionPersonal?.[0]?.genero || "",
            estadocivil: data.informacionPersonal?.[0]?.estadocivil || "",
            hijosnum: data.informacionPersonal?.[0]?.hijosnum || 0,
            personascargo: data.informacionPersonal?.[0]?.personascargo || 0,
            vivienda: data.informacionPersonal?.[0]?.vivienda || "",
            localidad: data.informacionPersonal?.[0]?.localidad || "",
            tipovivienda: data.informacionPersonal?.[0]?.tipovivienda || "",
            familiaresnum: data.informacionPersonal?.[0]?.familiaresnum || 0,
            estrato: data.informacionPersonal?.[0]?.estrato || 0,
            etnico: data.informacionPersonal?.[0]?.etnico || "",
            hacinamiento: data.condicionesVivienda?.[0]?.hacinamiento || "",
            violencia: data.condicionesVivienda?.[0]?.violencia || "",
            servicios: data.condicionesVivienda?.[0]?.servicios || "",
            problemas: data.condicionesVivienda?.[0]?.problemas || "",
            tipozona: data.condicionesVivienda?.[0]?.tipozona || "",
            tipocolegio: data.educacion?.[0]?.tipocolegio || "",
            nivelescolaridad: data.educacion?.[0]?.nivelescolaridad || "",
            carrera: data.educacion?.[0]?.carrera || "",
            periodo: data.educacion?.[0]?.periodo || "",
            motivo: data.educacion?.[0]?.motivo || "",
            matedificulta: data.educacion?.[0]?.matedificulta || "",
            nivelingles: data.educacion?.[0]?.nivelingles || "",
            situacion: data.situacionlaboral?.[0]?.situacion || "",
            ingresos: data.situacionlaboral?.[0]?.ingresos || "",
            sector: data.situacionlaboral?.[0]?.sector || "",
            jornada: data.situacionlaboral?.[0]?.jornada || "",
            ascenso: data.situacionlaboral?.[0]?.ascenso || "",
            enfermecronica: data.salud?.[0]?.enfermecronica || "",
            discapacidad: data.salud?.[0]?.discapacidad || "",
            suspsicoactivas: data.salud?.[0]?.suspsicoactivas || "",
            alcohol: data.salud?.[0]?.alcohol || "",
            Internet: data.salud?.[0]?.Internet || "",
            nicotina: data.salud?.[0]?.nicotina || "",
            eps: data.salud?.[0]?.eps || "",
            asispsicologo: data.salud?.[0]?.asispsicologo || "",
        }));
    }, [data]);

    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prevData) => {
                let newValues = [...prevData[name]];

                if (checked) {
                    newValues.push(value);
                } else {
                    newValues = newValues.filter((val) => val !== value);
                }

                return {
                    ...prevData,
                    [name]: newValues,
                };
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        Cookies.remove("idUsuario");
        Cookies.remove("usuario");
        Cookies.remove("rol");
        navigate("/Login");
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Asegúrate de que `idUsuario` y `formData` estén correctamente definidos
            const dataToSend = { idUsuario, ...formData };
    
            const res = await axios.put(
                "http://localhost:3000/psicologia/updateUser",
                dataToSend
            );
            setResponse(res.data.message || "Datos enviados");
        } catch (error) {
            setResponse("Error al enviar datos");
            console.log(error);
        }
        // Redirecciona después de un registro exitoso
        navigate("");
        handleLogout();
    };
    

    const nextStep = () => {
        const currentStep = steps[step];
        const currentValue = formData[currentStep?.name];

        // Asegurarse de que currentValue sea una cadena
        if (typeof currentValue === "string" && currentValue.trim() === "") {
            alert(
                `El campo "${currentStep?.label || currentStep?.name
                }" es obligatorio. Por favor complétalo.`
            );
            return;
        }

        // Si el valor es un array (como en el caso de los checkboxes), se verifica que tenga elementos seleccionados
        if (Array.isArray(currentValue) && currentValue.length === 0) {
            alert(
                `El campo "${currentStep?.label || currentStep?.name
                }" es obligatorio. Por favor complétalo.`
            );
            return;
        }

        if (step === 0) {
            setStep(step + 1);
        } else if (step < steps.length - 1) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            nextStep();
        }
    };

    const currentStep = steps[step];

    return (
        <div className="bg-gradient-to-b from-blue-100 to-blue-300 w-full h-screen flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center w-full max-w-5xl p-6 rounded-lg bg-white shadow-xl">
                <div className="flex flex-col items-center w-full max-w-md p-6 space-y-4">
                    <h2 className="text-3xl font-semibold text-blue-700 mb-6">Actualizacion de</h2>

                    <form
                        className="text-gray-700 flex flex-col space-y-4 w-full"
                        onSubmit={handleSubmit}
                        onKeyDown={handleKeyDown}
                    >
                        <div className="flex flex-col space-y-2">
                            <label htmlFor={currentStep.name} className="font-medium text-blue-700">
                                {currentStep.label}
                            </label>
                            {(currentStep.type === "text" ||
                                currentStep.type === "email" ||
                                currentStep.type === "tel" ||
                                currentStep.type === "password" ||
                                currentStep.type === "number") && (
                                    <input
                                        type={currentStep.type}
                                        id={currentStep.name}
                                        name={currentStep.name}
                                        value={formData[currentStep.name]}
                                        onChange={handleChange}
                                        required
                                        className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                                        placeholder={`Ingresa tu ${currentStep.label?.toLowerCase()}`}
                                    />
                                )}
                            {currentStep.type === "select" && (
                                <select
                                    name={currentStep.name}
                                    value={formData[currentStep.name]}
                                    onChange={handleChange}
                                    className="p-3 rounded-md border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 placeholder-gray-400"
                                >
                                    <option value="">Selecciona una opción</option>
                                    {currentStep.options?.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {currentStep.type === "checkbox" && (
                                <div className="flex flex-col space-y-2">
                                    {currentStep.options?.map((option, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center space-x-2 text-gray-700"
                                        >
                                            <input
                                                type="checkbox"
                                                name={currentStep.name}
                                                value={option.value}
                                                checked={formData[currentStep.name]?.includes(option.value)}
                                                onChange={handleChange}
                                                className="h-5 w-5 border-gray-300 focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span>{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                                >
                                    Anterior
                                </button>
                            )}
                            {step < steps.length - 1 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
                                >
                                    Siguiente
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
                                >
                                    Registrar
                                </button>
                            )}
                        </div>
                    </form>

                    {response && <p className="text-yellow-500 mt-4">{response}</p>}
                </div>

                <div className="hidden md:flex flex-col w-full h-full items-center justify-center">
                    <div className="relative bg-white p-2 rounded-lg shadow-lg border-4 border-blue-600 text-blue-800 font-semibold mb-10 z-10">
                        <p className="px-8 py-6">{currentStep.comment}</p>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-6 h-6 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-blue-600"></div>
                    </div>

                    <img
                        src={BotIcon}
                        alt="Registro"
                        className="w-3/6 h-auto object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>
    );

}