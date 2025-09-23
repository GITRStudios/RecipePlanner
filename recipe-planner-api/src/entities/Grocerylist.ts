import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Mealplan } from "./Mealplan";
import { User } from "./User";

@Index("grocerylist_pkey", ["id"], { unique: true })
@Entity("grocerylist", { schema: "public" })
export class Grocerylist {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", {
    name: "quantity",
    nullable: true,
    length: 255,
  })
  quantity: string | null;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.grocerylists)
  @JoinColumn([{ name: "ingredient_fk", referencedColumnName: "id" }])
  ingredientFk: Ingredient;

  @ManyToOne(() => Mealplan, (mealplan) => mealplan.grocerylists)
  @JoinColumn([{ name: "mealplan_fk", referencedColumnName: "id" }])
  mealplanFk: Mealplan;

  @ManyToOne(() => User, (user) => user.grocerylists)
  @JoinColumn([{ name: "user_fk", referencedColumnName: "id" }])
  userFk: User;
}
