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
    })
})