import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async create(request: Request, response: Response): Promise<Response> {
        const {email} = request.body;
        const userService = new UserService();

        try {
            const user = await userService.create(email);

            return response.json(user);
        } catch (error) {
            return response.json({message: error.message})
        }
    }
}

export { UserController }