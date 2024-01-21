const Notification = require('../models/notification.model');

module.exports = (io, socket) => {


    const getAllNotifications = async () => {
        try {
            const notifications = await Notification.find();

            socket.emit("notification:get_all_success", notifications);
        } catch (error) {
            const data = {
                message: "ocurrió un error al obtener las notificaciones",
                error: error.message
            }

            socket.emit("notification:get_all_error", data);
        }
    }

    const readNotification = async (notificactionId) => {
        try {
            const notification = await Notification.findById(notificactionId);

            if (!notification) {
                socket.emit("notification:not_found", "la notificación no fue encontrada");
                return
            }

            socket.emit("notification:read_success", notification);
        } catch (error) {
            const data = {
                message: "ocurrió un error al obtener notificación",
                error: error.message
            }

            socket.emit("notification:read_error", data);
        }
    }

    const createNotification = async (payload) => {
        try {
            const notification = new Notification({...payload, createdBy: socket._id});
            await notification.save();

            // emite evento al cliente que creó la notificación
            socket.emit("notification:create_success", notification);

            // emite evento a todos los clientes
            io.emit('notification:created', notification);
        } catch (error) {
            const data = {
                message: "ocurrió un error al crear la notificación",
                error: error.message
            }

            socket.emit("notification:create_error", data);
        }
    }

    socket.on("notification:get_all", getAllNotifications);
    socket.on("notification:read", readNotification);
    socket.on("notification:create", createNotification);
}