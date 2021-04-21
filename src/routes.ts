import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import { SettingRepository } from './repositories/SettingRepository';

const routes = Router();

routes.get('/', async (request, response) => {
    response.json({
        message: 'Servidor node funcionando!'
    })
})

routes.post('/settings', async (request, response) => {
    const settingRepository = getCustomRepository(SettingRepository);
    const {chat, username} = request.body;

    const settings = settingRepository.create({
        chat,
        username
    });

    await settingRepository.save(settings);

    return response.json(settings);
})

export { routes }