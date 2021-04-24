import { Request, Response } from "express";
import { SettingService } from "../services/SettingService";

class SettingController {
    async create(request: Request, response: Response) {
        const {chat, username} = request.body;
        const settingService = new SettingService();
    
        try {
            const settings = await settingService.create({chat, username});
        
            return response.json(settings);
        } catch(error) {
            return response.json({
                message: error.message
            })
        }
    }

    async findByUsername(request: Request, response: Response) {
        const { username } = request.params;
        const settingService = new SettingService();

        try {
            const setting = await settingService.findByUsername(username);

            return response.json(setting);
        } catch (error) {
            return response.json(error.message);
        }
    }

    async update(request: Request, response: Response) {
        const { username } = request.params;
        const { chat } = request.body;
        const settingService = new SettingService();

        try {            
            const setting = await settingService.update({username, chat});
    
            return response.json(setting);
        } catch (error) {
            return response.json(error.message);
        }
    }
}

export { SettingController }