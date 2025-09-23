import { Column, Entity, Index, OneToMany } from "typeorm";
import { IngredientRecipe } from "./IngredientRecipe";
import { MealplanRecipe } from "./MealplanRecipe";

@Index("recipe_pkey", ["id"], { unique: true })
@Entity("recipe", { schema: "public" })
export class Recipe {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("text", { name: "steps", nullable: true })
  steps: string | null;

  @OneToMany(
    () => IngredientRecipe,
    (ingredientRecipe) => ingredientRecipe.recipeFk
  )
  ingredientRecipes: IngredientRecipe[];

  @OneToMany(() => MealplanRecipe, (mealplanRecipe) => mealplanRecipe.recipeFk)
  mealplanRecipes: MealplanRecipe[];
}
