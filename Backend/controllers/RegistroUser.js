import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const RegistroUser = async (req, res) => {
    
    const { 
        nombre, apellido, correo, telefonoPersonal, telefonoFamiliar,tipoDocumento,documento, 
        usuario, contrasena, 
        edad, sexo, genero, estadocivil, hijosnum, personascargo, vivienda, localidad, tipovivienda, familiaresnum, estrato, etnico, 
        hacinamiento, violencia, servicios, problemas, tipozona, 
        tipocolegio, nivelescolaridad, carrera, periodo, motivo, matedificulta, nivelingles, 
        situacion, ingresos, sector, jornada, ascenso, 
        enfermecronica, discapacidad, suspsicoactivas, alcohol, Internet, nicotina, eps, asispsicologo 
    } = req.body;
    
    if (!nombre || !correo || !telefonoPersonal || !usuario || !contrasena) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const parseIntSafe = (value) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
    };

    const hashedPassword = await bcrypt.hash(contrasena,10);

    try {

        const newUser = await prisma.informacionUsuario.create({
            data: {
                nombre,
                apellido,
                correo,
                telefonoPersonal,
                telefonoFamiliar,
                documento,
                tipoDocumento,
            }
        });

        const newCredential = await prisma.credencial.create({
            data: {
                usuario,
                contrasena: hashedPassword,
                idUsuario: newUser.idUsuario,
            }
        });

        const newinformacionPersonal = await prisma.informacionPersonal.create({
            data: {
                edad: parseIntSafe(edad),
                sexo,
                genero,
                estadocivil,
                hijosnum: parseIntSafe(hijosnum),
                personascargo: parseIntSafe(personascargo),
                vivienda,
                localidad,
                tipovivienda,
                familiaresnum: parseIntSafe(familiaresnum),
                estrato: parseIntSafe(estrato),
                etnico,
                idUsuario: newUser.idUsuario,
            }
        });

        const newcondicionesvivienda = await prisma.condicionesvivienda.create({
            data: {
                hacinamiento: hacinamiento,
                violencia: violencia,
                servicios: servicios,
                problemas: problemas,
                tipozona: tipozona,
                idUsuario: newUser.idUsuario,
            }
        });

        const neweducacion = await prisma.educacion.create({
            data: {
                tipocolegio,
                nivelescolaridad,
                carrera,
                periodo,
                motivo,
                matedificulta,
                nivelingles,
                idUsuario: newUser.idUsuario,
            }
        });

        const newsituacionlaboral = await prisma.situacionlaboral.create({
            data: {
                situacion,
                ingresos,
                sector,
                jornada,
                ascenso,
                idUsuario: newUser.idUsuario,
            }
        });

        const newsalud = await prisma.salud.create({
            data: {
                enfermecronica,
                discapacidad,
                suspsicoactivas,
                alcohol,
                Internet,
                nicotina,
                eps,
                asispsicologo,
                idUsuario: newUser.idUsuario,
            }
        });

        return res.status(201).json({
            message: 'Usuario y credencial registrados correctamente',
            user: newUser,
            credential: newCredential,
            informacionPersonal: newinformacionPersonal,
            condicionesvivienda: newcondicionesvivienda,
            educacion: neweducacion,
            situacionlaboral: newsituacionlaboral,
            salud: newsalud,
        });

    } catch (error) {
        console.error('Error al guardar los datos: ', error);
        return res.status(500).json({
            error: 'Error al guardar los datos',
            details: error.message,
        });
    }
};
