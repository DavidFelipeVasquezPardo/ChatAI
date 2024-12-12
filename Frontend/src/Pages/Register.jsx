import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import BotIcon from "../../public/BotIcon.png";
import "./Components/Css.css";

const steps = [
  {
    label: "⚠ Tiempo estimado de 3 minutos a 5 minutos",
    comment: "¡ Hola 🖐 ! si deseas empezar el registro pulsa siguiente",
  },

  // Datos personales
  {
    label: "Nombres Completos",
    name: "nombre",
    type: "text",
    comment:
      "Por favor escribe tus dos nombres completos y pulsa 'Siguiente' 😊",
  },
  {
    label: "Apellidos Completos",
    name: "apellido",
    type: "text",
    comment: "Escribe tus dos apellidos completos y pulsa 'Siguiente' 😁",
  },
  {
    label: "Correo Electrónico",
    name: "correo",
    type: "email",
    comment:
      "Ingresa tu dirección de correo electrónico 📫 y pulsa 'Siguiente'",
  },
  {
    label: "Número de Teléfono Personal",
    name: "telefonoPersonal",
    type: "tel",
    comment:
      "Por favor, escribe tu número de teléfono 📱 y continúa con 'Siguiente'",
  },
  {
    label: "Número de Teléfono de Contacto",
    name: "telefonoFamiliar",
    type: "tel",
    comment:
      "Escribe el número de teléfono de un familiar cercano o amigo 🤗 y pulsa 'Siguiente'",
  },

  // Credenciales
  {
    label: "Nombre de Usuario",
    name: "usuario",
    type: "text",
    comment:
      "Crea un nombre de usuario 🧐 (Recuerda que lo necesitarás para iniciar sesión ❗) y pulsa 'Siguiente'",
  },
  {
    label: "Contraseña",
    name: "contrasena",
    type: "password",
    comment:
      "Establece tu contraseña 🙈 (Recuerda que lo necesitarás para iniciar sesión ❗) y pulsa 'Siguiente'",
  },

  // Información personal adicional
  {
    label: "Edad",
    name: "edad",
    type: "number",
    comment: "Indica tu edad actual 🎂 y pulsa 'Siguiente'",
  },
  {
    label: "Género",
    name: "genero",
    type: "select",
    comment: "Especifica tu género ⚧️ y pulsa 'Siguiente'",
    options: [
      { label: "Heterosexual", value: "heterosexual" },
      { label: "Homosexual", value: "homosexual" },
      { label: "Bisexual", value: "bisexual" },
      { label: "Pansexual", value: "pansexual" },
      { label: "Asexual", value: "asexual" },
      { label: "Demisexual", value: "demisexual" },
      { label: "Sapiosexual", value: "sapiosexual" },
      { label: "Queer", value: "queer" },
      { label: "Omnisexual", value: "omnisexual" },
      { label: "Autosexual", value: "autosexual" },
      { label: "Greysexual", value: "greysexual" },
      { label: "Skoliosexual", value: "skoliosexual" },
      { label: "Androsexual", value: "androsexual" },
      { label: "Gynesexual", value: "gynesexual" },
      { label: "Afluxsexual", value: "afluxsexual" },
      { label: "Polisexual", value: "polisexual" },
      { label: "Fluidsexual", value: "fluidsexual" },
      { label: "Otro", value: "otro" },
      { label: "Prefiero no decirlo", value: "prefiero_no_decirlo" },
    ],
  },
  {
    label: "Estado Civil",
    name: "estadocivil",
    type: "select",
    comment:
      "¿Cuál es tu estado civil actual? 💍 Por favor escribe y pulsa 'Siguiente'",
    options: [
      { label: "Solter@", value: "Soltero" },
      { label: "Casad@", value: "Casado" },
      { label: "Viud@", value: "Viudo" },
      { label: "Separad@", value: "Separado" },
      { label: "Divorciad@", value: "Divorciado" },
    ],
  },
  {
    label: "Número de Hijos",
    name: "hijosnum",
    type: "number",
    comment: "Indica cuántos hijos tienes 👶 y pulsa 'Siguiente'",
  },
  {
    label: "Personas a Cargo",
    name: "personascargo",
    type: "number",
    comment:
      "Especifica cuántas personas están bajo tu cuidado 👨‍👩‍👧 y pulsa 'Siguiente'",
  },
  {
    label: "Tipo de Vivienda",
    name: "vivienda",
    type: "select",
    comment:
      "Describe tu tipo de vivienda actual (ejemplo: casa o apartamento) 🏡 y pulsa 'Siguiente'",
    options: [
      { label: "Casa", value: "Casa" },
      { label: "Apartamento", value: "Apartamento" },
      { label: "Pieza", value: "Pieza" },
    ],
  },
  {
    label: "Localidad de Residencia",
    name: "localidad",
    type: "select",
    comment:
      "Indica la localidad donde resides actualmente 🗺️ y pulsa 'Siguiente'",
    options: [
      { label: "Usaquén", value: "Usaquén" },
      { label: "Chapinero", value: "Chapinero" },
      { label: "Santa Fe", value: "Santa Fe" },
      { label: "San Cristóbal", value: "San Cristóbal" },
      { label: "Usme", value: "Usme" },
      { label: "Tunjuelito", value: "Tunjuelito" },
      { label: "Bosa", value: "Bosa" },
      { label: "Kennedy", value: "Kennedy" },
      { label: "Fontibón", value: "Fontibón" },
      { label: "Engativá", value: "Engativá" },
      { label: "Suba", value: "Suba" },
      { label: "Barrios Unidos", value: "Barrios Unidos" },
      { label: "Teusaquillo", value: "Teusaquillo" },
      { label: "Los Mártires", value: "Los Mártires" },
      { label: "Antonio Nariño", value: "Antonio Nariño" },
      { label: "Puente Aranda", value: "Puente Aranda" },
      { label: "La Candelaria", value: "La Candelaria" },
      { label: "Rafael Uribe Uribe", value: "Rafael Uribe Uribe" },
      { label: "Ciudad Bolívar", value: "Ciudad Bolívar" },
      { label: "Sumapaz", value: "Sumapaz" },
    ],
  },
  {
    label: "Propiedad de Vivienda",
    name: "tipovivienda",
    type: "select",
    comment:
      "¿Tu vivienda es propia, rentada u otro tipo? 🏠 y pulsa 'Siguiente'",
    options: [
      { label: "Propia", value: "Propia" },
      { label: "Rentada", value: "Rentada" },
      { label: "Arrendada", value: "Arrendada" },
      { label: "Hipotecada", value: "Hipotecada" },
      { label: "Familiar", value: "Familiar" },
      { label: "De interés social", value: "De interés social" },
      { label: "Otro", value: "Otro" },
    ],
  },
  {
    label: "Número de Familiares en el Hogar",
    name: "familiaresnum",
    type: "number",
    comment:
      "Especifica cuántos familiares viven contigo 👫👭 y pulsa 'Siguiente'",
  },
  {
    label: "Estrato Social",
    name: "estrato",
    type: "select",
    comment: "Indica el estrato social de tu hogar 🏡 y pulsa 'Siguiente'",
    options: [
      { label: "1", value: "1" },
      { label: "2", value: "2" },
      { label: "3", value: "3" },
      { label: "4", value: "4" },
      { label: "5", value: "5" },
      { label: "6", value: "6" },
    ],
  },
  {
    label: "Pertenencia Étnica",
    name: "etnico",
    type: "select",
    comment:
      "Indica si perteneces a un grupo étnico (escribe NA si no aplica) 🌍 y pulsa 'Siguiente'",
    options: [
      { label: "Indígena", value: "Indígena" },
      { label: "Afrocolombiano", value: "Afrocolombiano" },
      { label: "Raizal", value: "Raizal" },
      { label: "Palenquero", value: "Palenquero" },
      { label: "Rom", value: "Rom" },
      { label: "Ninguna", value: "Ninguna" },
    ],
  },

  // Vivienda
  {
    label: "Condiciones de Espacio",
    name: "hacinamiento",
    type: "select",
    comment: (
      <>
        {" "}
        ¿Consideras que hay{" "}
        <a
          href="https://es.wikipedia.org/wiki/Hacinamiento"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          hacinamiento
        </a>{" "}
        en tu hogar? (pulsa el texto azul para consultar) 🏘️ Pulsa 'Siguiente'
        para continuar.{" "}
      </>
    ),
    options: [
      { label: "Sí", value: "si" },
      { label: "No", value: "no" },
    ],
  },
  {
    label: "Violencia Familiar",
    name: "violencia",
    type: "select",
    comment:
      "Indica si has experimentado violencia familiar en tu hogar 💔  y pulsa 'Siguiente'",
    options: [
      { label: "Sí", value: "si" },
      { label: "No", value: "no" },
    ],
  },
  {
    label: "Servicios Básicos Disponibles",
    name: "servicios",
    type: "checkbox",
    comment:
      "Describe los servicios básicos con los que cuenta tu hogar (ejemplo: agua, luz, internet) 💡  y pulsa 'Siguiente'",
    options: [
      { label: "Agua", value: "agua" },
      { label: "Luz", value: "luz" },
      { label: "Internet", value: "internet" },
      { label: "Gas", value: "gas" },
      { label: "Teléfono fijo", value: "telefono_fijo" },
      { label: "Televisión por cable", value: "tv_cable" },
      { label: "Wi-Fi", value: "wifi" },
      { label: "Calefacción", value: "calefaccion" },
      { label: "Recolección de basura", value: "basura" },
      { label: "Suministro de energía solar", value: "energia_solar" },
      { label: "Agua caliente", value: "agua_caliente" },
      { label: "Sistema de riego", value: "riego" },
    ],
  },
  {
    label: "Problemas Habitacionales",
    name: "problemas",
    type: "checkbox",
    comment:
      "Especifica si has enfrentado problemas de vivienda (ejemplo: inseguridad o inundaciones) 📋  y pulsa 'Siguiente'",
    options: [
      { label: "Inseguridad", value: "inseguridad" },
      { label: "Inundaciones", value: "inundaciones" },
      { label: "Basuras", value: "basuras" },
      { label: "Deslizamientos de tierra", value: "deslizamientos" },
      {
        label: "Falta de acceso a servicios básicos",
        value: "falta_servicios",
      },
      { label: "Vivienda en mal estado", value: "vivienda_mal_estado" },
      { label: "Problemas de humedad", value: "problemas_humedad" },
      {
        label: "Deficiencias estructurales",
        value: "deficiencias_estructurales",
      },
      { label: "Ruidos molestos", value: "ruidos_molestos" },
      { label: "Falta de espacio", value: "falta_espacio" },
      { label: "Contaminación ambiental", value: "contaminacion" },
      { label: "Acceso limitado a transporte", value: "acceso_transporte" },
    ],
  },
  {
    label: "Zona de Residencia",
    name: "tipozona",
    type: "select",
    comment:
      "¿Tu vivienda está en zona rural o urbana? 🏡  y pulsa 'Siguiente'",
    options: [
      { label: "Urbana", value: "Urbana" },
      { label: "Rural", value: "Rural" },
    ],
  },

  // Educación
  {
    label: "Tipo de Colegio",
    name: "tipocolegio",
    type: "select",
    comment:
      "¿Asististe a un colegio público o privado? (escribe NA si no aplica) 🏫  y pulsa 'Siguiente'",
    options: [
      { label: "Público", value: "Público" },
      { label: "Privado", value: "Privado" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Nivel de Escolaridad",
    name: "nivelescolaridad",
    type: "select",
    comment:
      "Indica el nivel educativo más alto que alcanzaste (escribe NA si no aplica) 🎓  y pulsa 'Siguiente'",
    options: [
      { label: "Primaria", value: "Primaria" },
      { label: "Secundaria", value: "Secundaria" },
      { label: "Técnico", value: "Técnico" },
      { label: "Tecnológico", value: "Tecnológico" },
      { label: "Profesional", value: "Profesional" },
      { label: "Posgrado", value: "Posgrado" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Carrera Universitaria",
    name: "carrera",
    type: "text",
    comment:
      "Si estudiaste o estudias una carrera, indícala aquí (escribe NA si no aplica) 📚  y pulsa 'Siguiente'",
  },
  {
    label: "Estado de la Carrera",
    name: "periodo",
    type: "select",
    comment:
      "¿En qué semestre estás o ya la terminaste? (escribe NA si no aplica) y pulsa 'Siguiente'",
    options: [
      { label: "En curso", value: "en_curso" },
      { label: "Finalizada", value: "finalizada" },
      { label: "Suspendida", value: "suspendida" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Motivo de Elección",
    name: "motivo",
    type: "text",
    comment:
      "¿Por qué elegiste esta carrera? (escribe NA si no aplica) 📖 y pulsa 'Siguiente'",
  },
  {
    label: "Materias con Dificultades",
    name: "matedificulta",
    type: "checkbox",
    comment:
      "¿Qué materias se te dificultan más? (escribe NA si no aplica) ✍️  y pulsa 'Siguiente'",
    options: [
      { label: "Matemáticas", value: "matematicas" },
      { label: "Lengua y Literatura", value: "lengua_literatura" },
      { label: "Ciencias Sociales", value: "ciencias_sociales" },
      { label: "Ciencias Naturales", value: "ciencias_naturales" },
      { label: "Inglés", value: "ingles" },
      { label: "Geografía", value: "geografia" },
      { label: "Historia", value: "historia" },
      { label: "Educación Física", value: "educacion_fisica" },
      { label: "Arte", value: "arte" },
      { label: "Química", value: "quimica" },
      { label: "Física", value: "fisica" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Nivel de Inglés",
    name: "nivelingles",
    type: "select",
    comment:
      "¿Cuál es tu nivel actual de inglés? (escribe NA si no aplica) 🌐 y pulsa 'Siguiente'",
    options: [
      { label: "Básico", value: "Básico" },
      { label: "Intermedio", value: "Intermedio" },
      { label: "Avanzado", value: "Avanzado" },
      { label: "Nativo", value: "Nativo" },
      { label: "NA", value: "NA" },
    ],
  },

  // Situación laboral
  {
    label: "Situación Laboral",
    name: "situacion",
    type: "select",
    comment:
      "Describe tu situación laboral actual (escribe NA si no aplica) 💼 y pulsa 'Siguiente'",
    options: [
      { label: "Empleado", value: "Empleado" },
      { label: "Independiente", value: "Independiente" },
      { label: "Desempleado", value: "Desempleado" },
      { label: "Estudiante", value: "Estudiante" },
      { label: "Otro", value: "Otro" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Ingresos Mensuales",
    name: "ingresos",
    type: "select",
    comment:
      "Escribe tus ingresos promedio mensuales (escribe NA si no aplica) 💰 y pulsa 'Siguiente'",
    options: [
      { label: "Menos de $1,000,000", value: "Menos de $1,000,000" },
      { label: "$1,000,000 - $2,000,000", value: "$1,000,000 - $2,000,000" },
      { label: "$2,000,000 - $3,000,000", value: "$2,000,000 - $3,000,000" },
      { label: "$3,000,000 - $5,000,000", value: "$3,000,000 - $5,000,000" },
      { label: "Más de $5,000,000", value: "Más de $5,000,000" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Sector de Trabajo",
    name: "sector",
    type: "select",
    comment:
      "¿Trabajas en el sector público, privado o como independiente? (escribe NA si no aplica) y pulsa 'Siguiente'",
    options: [
      { label: "Público", value: "Público" },
      { label: "Privado", value: "Privado" },
      { label: "Independiente", value: "Independiente" },
      { label: "Emprendedor", value: "Emprendedor" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Jornada Laboral",
    name: "jornada",
    type: "select",
    comment:
      "Indica tu tipo de jornada (tiempo completo, medio tiempo o nocturno) (escribe NA si no aplica) ⏰ y pulsa 'Siguiente'",
    options: [
      { label: "Tiempo completo", value: "Tiempo completo" },
      { label: "Medio tiempo", value: "Medio tiempo" },
      { label: "Nocturna", value: "Nocturna" },
      { label: "Freelance", value: "Freelance" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Posibilidad de Ascenso",
    name: "ascenso",
    type: "select",
    comment:
      "¿Tienes posibilidad de ascenso en tu trabajo? (escribe NA si no aplica) 📈 y pulsa 'Siguiente'",
    options: [
      { label: "Sí", value: "Sí" },
      { label: "No", value: "No" },
      { label: "No sé", value: "No sé" },
      { label: "NA", value: "NA" },
    ],
  },

  // Salud
  {
    label: "Enfermedades Crónicas",
    name: "enfermecronica",
    type: "select",
    comment:
      "Especifica si tienes alguna enfermedad crónica (escribe NA si no aplica) 🩺 y pulsa 'Siguiente'",
    options: [
      { label: "Mal de Alzheimer y demencia", value: "alzheimer_demenecia" },
      { label: "Artritis", value: "artritis" },
      { label: "Asma", value: "asma" },
      { label: "Cáncer", value: "cancer" },
      { label: "EPOC", value: "epoc" },
      { label: "Enfermedad de Crohn", value: "crohn" },
      { label: "Fibrosis quística", value: "fibrosis_quistica" },
      { label: "Diabetes", value: "diabetes" },
      { label: "Endometriosis", value: "endometriosis" },
      { label: "Epilepsia", value: "epilepsia" },
      { label: "Fibromialgia", value: "fibromialgia" },
      { label: "Enfermedad del corazón", value: "enfermedad_corazon" },
      { label: "Presión arterial alta (hipertensión)", value: "hipertension" },
      { label: "VIH/sida", value: "vih_sida" },
      { label: "Migraña", value: "migraña" },
      {
        label: "Trastornos del humor (bipolar, ciclotímico y depresión)",
        value: "trastornos_humor",
      },
      { label: "Esclerosis múltiple", value: "esclerosis_multiple" },
      { label: "Narcolepsia", value: "narcolepsia" },
      { label: "Mal de Parkinson", value: "parkinson" },
      { label: "Otra", value: "otra" },
      { label: "NA", value: "NA" },
    ],
  },
  {
    label: "Condiciones de Discapacidad",
    name: "discapacidad",
    type: "select",
    comment:
      "Indica si tienes alguna discapacidad (escribe NA si no aplica) 👨‍🦽 y pulsa 'Siguiente'",
    options: [
      { label: "Visual", value: "Visual" },
      { label: "Auditiva", value: "Auditiva" },
      { label: "Motora", value: "Motora" },
      { label: "Cognitiva", value: "Cognitiva" },
      { label: "Psíquica", value: "Psíquica" },
      { label: "No tengo discapacidad", value: "No tengo discapacidad" },
    ],
  },
  {
    label: "Consumo de Sustancias Psicoactivas",
    name: "suspsicoactivas",
    type: "select",
    comment: "¿Consumes sustancias psicoactivas? 🚭 y pulsa 'Siguiente'",
    options: [
      { label: "Sí", value: "Sí" },
      { label: "No", value: "No" },
      { label: "Ocasionalmente", value: "Ocasionalmente" },
    ],
  },
  {
    label: "Consumo de Alcohol",
    name: "alcohol",
    type: "select",
    comment: "¿Consumes alcohol regularmente? 🍷 y pulsa 'Siguiente'",
    options: [
      { label: "Sí, regularmente", value: "Sí, regularmente" },
      { label: "Sí, ocasionalmente", value: "Sí, ocasionalmente" },
      { label: "No", value: "No" },
    ],
  },
  {
    label: "Acceso a Internet",
    name: "Internet",
    type: "select",
    comment: "¿Cuantas horas usas el internet a diario? 🌐 y pulsa 'Siguiente'",
    options: [
      { label: "Menos de 1 hora", value: "Menos de 1 hora" },
      { label: "1-3 horas", value: "1-3 horas" },
      { label: "4-6 horas", value: "4-6 horas" },
      { label: "Más de 6 horas", value: "Más de 6 horas" },
      { label: "No tengo acceso", value: "No tengo acceso" },
    ],
  },
  {
    label: "Consumo de Nicotina",
    name: "nicotina",
    type: "select",
    comment: "¿Fumas o consumes productos con nicotina? 🚬 y pulsa 'Siguiente'",
    options: [
      { label: "Sí, regularmente", value: "Sí, regularmente" },
      { label: "Sí, ocasionalmente", value: "Sí, ocasionalmente" },
      { label: "No", value: "No" },
    ],
  },
  {
    label: "EPS Afiliada",
    name: "eps",
    type: "text",
    comment: "Indica a qué EPS estás afiliado 🏥 y pulsa 'Siguiente'",
  },
  {
    label: "Atención Psicológica",
    name: "asispsicologo",
    type: "select",
    comment:
      "¿Has recibido atención psicológica en el último año? 🧠 y pulsa 'Siguiente'",
    options: [
      { label: "Sí", value: "Si" },
      { label: "No", value: "No" },
    ],
  },
  {
    label: "Formulario terminado",
    comment: "Pulsa Registrar para guardar tus datos 😊",
  },
];

export function Register() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefonoPersonal: "",
    telefonoFamiliar: "",
    usuario: "",
    contrasena: "",
    edad: 0,
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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/psicologia/RegistroUser",
        formData
      );
      setResponse(res.data.message || "Datos enviados");
    } catch (error) {
      setResponse("Error al enviar datos");
      console.log(error);
    }
    // Redirecciona después de un registro exitoso
    navigate("/");
  };

  const nextStep = () => {
    const currentStep = steps[step];
    const currentValue = formData[currentStep?.name];

    // Asegurarse de que currentValue sea una cadena
    if (typeof currentValue === "string" && currentValue.trim() === "") {
      alert(
        `El campo "${
          currentStep?.label || currentStep?.name
        }" es obligatorio. Por favor complétalo.`
      );
      return;
    }

    // Si el valor es un array (como en el caso de los checkboxes), se verifica que tenga elementos seleccionados
    if (Array.isArray(currentValue) && currentValue.length === 0) {
      alert(
        `El campo "${
          currentStep?.label || currentStep?.name
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
    <div className="bg-gradient-to-b from-[#2d14ee] to-[#6241f2] w-full h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center w-full max-w-5xl p-6 rounded-lg shadow-lg bg-[#2410bd]">
        <div className="flex flex-col items-center w-full max-w-md p-6 space-y-4">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Registro de Usuario
          </h2>

          <form
            className="text-white flex flex-col space-y-4 w-full"
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor={currentStep.name} className="text-gray-300">
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
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#ffffff] text-black placeholder:text-gray-800 lg:felx-row"
                  placeholder={`Ingresa tu ${currentStep.label?.toLowerCase()}`}
                />
              )}
              {currentStep.type === "select" && (
                <select
                  name={currentStep.name}
                  value={formData[currentStep.name] || ""}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#ffffff] text-black placeholder:text-gray-800 lg:felx-row"
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
                      className="flex items-center space-x-2 text-gray-300"
                    >
                      <input
                        type="checkbox"
                        name={currentStep.name}
                        value={option.value}
                        checked={formData[currentStep.name]?.includes(
                          option.value
                        )}
                        onChange={handleChange}
                        className="h-5 w-5 checkbox"
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
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Anterior
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={handleSubmit}
                >
                  Registrar
                </button>
              )}
            </div>
          </form>

          {response && <p className="text-yellow-300 mt-4">{response}</p>}
        </div>

        <div>
          <div className="bg-white border-2 border-black shadow-lg rounded-lg p-4 relative mb-5">
            <label htmlFor={currentStep.name} className="text-black font-bold">
              {currentStep.comment}
            </label>
            <div className="absolute -bottom-4 right-20 w-8 h-8 bg-white transform rotate-45"></div>
          </div>

          <div className="hidden md:flex w-full h-full justify-center">
            <img
              src={BotIcon}
              alt="Registro"
              className="w-3/6 h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
