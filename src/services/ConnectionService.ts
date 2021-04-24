import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionRepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionService {
    private connectionRepository: Repository<Connection>

    constructor() {
        this.connectionRepository = getCustomRepository(ConnectionRepository);
    }

    async create(params: IConnectionCreate) {
        const connection = this.connectionRepository.create(params);

        await this.connectionRepository.save(connection);

        return connection;
    }

    async findByUserId(user_id: string) {
        const connection = await this.connectionRepository.findOne({user_id: user_id});

        return connection;
    }

    async update(connection_id: string, socket_id: string) {
        const connection = await this.connectionRepository.update(connection_id, {socket_id});

        return connection;
    }
}

export { ConnectionService }