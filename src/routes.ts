import { Router } from 'express';
import { SettingController } from './controllers/SettingController';

const routes = Router();
const settingController = new SettingController();

routes.get('/', (request, response) => {
    return response.json({
        message: 'Servidor node funcionando!'
    })
})

routes.post('/settings', settingController.create)

export { routes }