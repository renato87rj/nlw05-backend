import { Router } from 'express';
import { MessageController } from './controllers/MessageController';
import { SettingController } from './controllers/SettingController';
import { UserController } from './controllers/UserController';

const routes = Router();

const settingController = new SettingController();
const userController = new UserController();
const messageController = new MessageController();

routes.post('/settings', settingController.create);
routes.get('/settings/:username', settingController.findByUsername);
routes.put('/settings/:username', settingController.update);

routes.post('/users', userController.create);

routes.post('/messages', messageController.create);
routes.get('/messages/list/:id', messageController.showByUser);

export { routes }