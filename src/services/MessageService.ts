import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message"
import { MessageRepository } from "../repositories/MessageRepository"

interface IMessage {
    user_id: string;
    text: string;
    admin_id?: string;
}

class MessageService {
    private messageRepository: Repository<Message>

    constructor() {
        this.messageRepository = getCustomRepository(MessageRepository);
    }

    async create({user_id, admin_id, text}: IMessage) {
        const message = this.messageRepository.create({
            user_id, admin_id, text
        });

        await this.messageRepository.save(message);

        return message;
    }

    async listByUser(user_id: string) {
        const list = await this.messageRepository.find({
            where: {user_id}, 
            relations: ['user']
        });
        
        return list;
    }
}

export { MessageService }