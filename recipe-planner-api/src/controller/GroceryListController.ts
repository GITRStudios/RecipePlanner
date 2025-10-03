import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { validate } from "uuid"
import { Grocerylist } from "../entities/Grocerylist"

export class GroceryListController {

    private groceryListRepository = AppDataSource.getRepository(Grocerylist)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.groceryListRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.id;

        if (!validate(uuid)) {
            return response.status(400).json({ error: "Invalid UUID" });
        }


        try {
            const groceryList = await this.groceryListRepository.findOne({
                where: { id: uuid }
            });

            if (!groceryList) {
                return "unregistered groceryList"
            }

            return groceryList
        } catch (err) {
            next(err);
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, email } = request.body;

        const groceryList = Object.assign(new Grocerylist(), {
            name,
            email
        })

        return this.groceryListRepository.save(groceryList)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const uuid = request.params.id;

        if (!validate(uuid)) {
            return response.status(400).json({ error: "Invalid UUID" });
        }

        try {
            let groceryListToRemove = await this.groceryListRepository.findOneBy({ id: uuid })

            if (!groceryListToRemove) {
                return "this groceryList not exist"
            }

            await this.groceryListRepository.remove(groceryListToRemove)

            return "groceryList has been removed"

        } catch (err) {
            next(err)
        }

    }

}