import { GroceryListController } from "./controller/GroceryListController"
import { UserController } from "./controller/UserController"

export const Routes = [
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController,
        action: "remove"
    },
    {
        method: "get",
        route: "/grocerylist",
        controller: GroceryListController,
        action: "all"
    }, {
        method: "get",
        route: "/grocerylist/:id",
        controller: GroceryListController,
        action: "one"
    }, {
        method: "post",
        route: "/grocerylist",
        controller: GroceryListController,
        action: "save"
    }, {
        method: "delete",
        route: "/grocerylist/:id",
        controller: GroceryListController,
        action: "remove"
    },
]