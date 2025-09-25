import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entities/User"
import { validate } from "uuid"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.id;

        if (!validate(uuid)) {
            return response.status(400).json({ error: "Invalid UUID" });
        }


        try {
            const user = await this.userRepository.findOne({
                where: { id: uuid }
            });

            if (!user) {
                return "unregistered user"
            }

            return user
        } catch (err) {
            next(err);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, email } = request.body;

        const user = Object.assign(new User(), {
            name,
            email
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.id;

        if (!validate(uuid)) {
            return response.status(400).json({ error: "Invalid UUID" });
        }

        try {
            let userToRemove = await this.userRepository.findOneBy({ id: uuid })

            if (!userToRemove) {
                return "this user not exist"
            }

            await this.userRepository.remove(userToRemove)

            return "user has been removed"

        } catch (err) {
            next(err)
        }

    }

}