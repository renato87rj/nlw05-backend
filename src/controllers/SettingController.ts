import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingRepository } from "../repositories/SettingRepository";


class SettingController {
    async create(request: Request, response: Response) {
        const settingRepository = getCustomRepository(SettingRepository);
        const {chat, username} = request.body;
    
        const settings = settingRepository.create({chat, username});
    
        await settingRepository.save(settings);
    
        return response.json(settings);
    }
}

export { SettingController }