import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const UpdateUser = async (req, res) => {
    const { 
        idUsuario,
        nombre, apellido, correo, telefonoPersonal, telefonoFamiliar, tipoDocumento, documento, 
        usuario, contrasena, 
        edad, sexo, genero, estadocivil, hijosnum, personascargo, vivienda, localidad, tipovivienda, familiaresnum, estrato, etnico, 
        hacinamiento, violencia, servicios, problemas, tipozona, 
        tipocolegio, nivelescolaridad, carrera, periodo, motivo, matedificulta, nivelingles, 
        situacion, ingresos, sector, jornada, ascenso, 
        enfermecronica, discapacidad, suspsicoactivas, alcohol, Internet, nicotina, eps, asispsicologo 
    } = req.body;

    // Validación de datos
    if (!idUsuario || !nombre || !correo || !telefonoPersonal || !usuario) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const parseIntSafe = (value) => {
        const parsed = parseInt(value);
        return isNaN(parsed) ? null : parsed;
    };

    const hashedPassword = contrasena ? await bcrypt.hash(contrasena, 10) : undefined;

    try {

        const formatPhoneNumber = (phoneNumber) => {
            return phoneNumber.startsWith('57') ? phoneNumber : '57' + phoneNumber;
        };
        // Actualizar Información de Usuario
        const updatedUser = await prisma.informacionUsuario.update({
            where: { idUsuario: idUsuario },
            data: {
                nombre,
                apellido,
                correo,
                telefonoPersonal: formatPhoneNumber(telefonoPersonal),
                telefonoFamiliar,
                documento,
                tipoDocumento,
            }
        });

        // Actualizar Credenciales
        const updatedCredential = contrasena 
            ? await prisma.credencial.update({
                where: { idUsuario: idUsuario },
                data: {
                    usuario,
                    contrasena: hashedPassword,
                }
            })
            : await prisma.credencial.update({
                where: { idUsuario: idUsuario },
                data: {
                    usuario,
                }
            });

        // Actualizar Información Personal
        const updatedInformacionPersonal = await prisma.informacionPersonal.update({
            where: { idUsuario },
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
            }
        });

        // Actualizar Condiciones de Vivienda
        const updatedCondicionesVivienda = await prisma.condicionesvivienda.update({
            where: { idUsuario },
            data: {
                hacinamiento,
                violencia,
                servicios,
                problemas,
                tipozona,
            }
        });

        // Actualizar Educación
        const updatedEducacion = await prisma.educacion.update({
            where: { idUsuario },
            data: {
                tipocolegio,
                nivelescolaridad,
                carrera,
                periodo,
                motivo,
                matedificulta,
                nivelingles,
            }
        });

        // Actualizar Situación Laboral
        const updatedSituacionLaboral = await prisma.situacionlaboral.update({
            where: { idUsuario },
            data: {
                situacion,
                ingresos,
                sector,
                jornada,
                ascenso,
            }
        });

        // Actualizar Salud
        const updatedSalud = await prisma.salud.update({
            where: { idUsuario },
            data: {
                enfermecronica,
                discapacidad,
                suspsicoactivas,
                alcohol,
                Internet,
                nicotina,
                eps,
                asispsicologo,
            }
        });

        return res.status(200).json({
            message: 'Usuario y credencial actualizados correctamente',
            user: updatedUser,
            credential: updatedCredential,
            informacionPersonal: updatedInformacionPersonal,
            condicionesvivienda: updatedCondicionesVivienda,
            educacion: updatedEducacion,
            situacionlaboral: updatedSituacionLaboral,
            salud: updatedSalud,
        });

    } catch (error) {
        console.error('Error al actualizar los datos: ', error);
        return res.status(500).json({
            error: 'Error al actualizar los datos',
            details: error.message,
        });
    }
};
