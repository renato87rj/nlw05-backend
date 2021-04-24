import { io } from '../http';
import { ConnectionService } from '../services/ConnectionService';
import { MessageService } from '../services/MessageService';
import { UserService } from '../services/UserService';

interface IParams {
    email: string;
    text: string;
}

io.on('connect', (socket) => {
    const connectionService = new ConnectionService();
    const userService = new UserService();
    const messageService = new MessageService();

    socket.on('client_first_access', async (params) => {
        const { text, email } = params as IParams;
        const socket_id = socket.id;
        
        const userExists = await userService.findByEmail(email);
        let user_id: string;

        if (!userExists) {
            const user = await userService.create(email);
            user_id = user.id;
        } else {
            user_id = userExists.id;
        }

        const connection = await connectionService.findByUserId(user_id);

        if (connection) {
            await connectionService.update(connection.id, socket_id);
        } else {
            await connectionService.create({
                socket_id, 
                user_id
            });
        }

        await messageService.create({user_id, text});
    })
})