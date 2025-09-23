import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Mealplan } from "./Mealplan";
import { Recipe } from "./Recipe";
import { User } from "./User";

@Index("mealplan_recipe_pkey", ["id"], { unique: true })
@Entity("mealplan_recipe", { schema: "public" })
export class MealplanRecipe {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @ManyToOne(() => Mealplan, (mealplan) => mealplan.mealplanRecipes)
  @JoinColumn([{ name: "mealplan_fk", referencedColumnName: "id" }])
  mealplanFk: Mealplan;

  @ManyToOne(() => Recipe, (recipe) => recipe.mealplanRecipes)
  @JoinColumn([{ name: "recipe_fk", referencedColumnName: "id" }])
  recipeFk: Recipe;

  @ManyToOne(() => User, (user) => user.mealplanRecipes)
  @JoinColumn([{ name: "user_fk", referencedColumnName: "id" }])
  userFk: User;
}
