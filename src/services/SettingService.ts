import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingRepository } from "../repositories/SettingRepository";

interface ISettingCreate {
    chat: boolean;
    username: string;
}

class SettingService {
    private settingRepository: Repository<Setting>;

    constructor() {
        this.settingRepository = getCustomRepository(SettingRepository);
    }

    async create({chat, username}: ISettingCreate) {
        const usernameAlreadyExists = await this.settingRepository.findOne({username});

        if (usernameAlreadyExists) {
            throw Error('This username already exists');
        }

        const settings = this.settingRepository.create({chat, username});
    
        await this.settingRepository.save(settings);

        return settings;
    }
}

export {SettingService}