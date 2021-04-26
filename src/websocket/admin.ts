import { io } from '../http';
import { ConnectionService } from '../services/ConnectionService';
import { MessageService } from '../services/MessageService';

io.on('connect', async (socket) => {
    const connectionService = new ConnectionService();
    const messageService = new MessageService();
    
    const connectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();
    
    io.emit('users_without_admin', connectionsWithoutAdmin);

    socket.on('all_user_messages', async (params, callback) => {
        const { user_id } = params;

        const messages = await messageService.listByUser(user_id);

        callback(messages);
    });

    socket.on('admin_send_message', async (params) => {
        const { text, user_id } = params;

        await messageService.create({
            text,
            user_id,
            admin_id: socket.id
        });

        const {socket_id} = await connectionService.findByUserId(user_id);


        io.to(socket_id).emit('admin_to_client', {
            text,
            socket_id: socket.id
        });
    });

    socket.on('users_in_support', async (params) => {
        const { user_id } = params;

        await connectionService.updateAdminID(user_id, socket.id);

        const connectionsWithoutAdmin = await connectionService.findAllWithoutAdmin();
    
        io.emit('users_without_admin', connectionsWithoutAdmin);
    });
});