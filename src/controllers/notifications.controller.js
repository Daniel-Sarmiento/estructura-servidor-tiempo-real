const Notification = require('../models/notification.model');

const getAll = async (req, res) => {
    try {
        const notifications = await Notification.find();

        return res.status(200).json({
            success: true,
            notifications,
            message: "se obtuvieron las notificaciones correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ocurrió un error al obtener las notificaciones",
            error: error.message
        });
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findById(id);

        if (!notification) {
            return res.status(404).json({
                message: "notificación no encontrada"
            });
        }

        return res.status(200).json({
            message: "se obtuvo la notificación correctamente",
            notification,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ocurrió un error al obtener la notificación",
            error: error.message
        });
    }
}

const create = async (req, res) => {
    try {
        const notification = new Notification({
            body: req.body.body,
            createdBy: req.user._id
        });

        await notification.save();

        return res.status(201).json({
            success: true,
            message: "notificación creada exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "ocurrió un error al crear la notificación",
            error: error.message
        });
    }
}

module.exports = {
    getAll,
    getById,
    create
}