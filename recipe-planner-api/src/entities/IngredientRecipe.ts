import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";

@Index("ingredient_recipe_pkey", ["id"], { unique: true })
@Entity("ingredient_recipe", { schema: "public" })
export class IngredientRecipe {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.ingredientRecipes)
  @JoinColumn([{ name: "ingredient_fk", referencedColumnName: "id" }])
  ingredientFk: Ingredient;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredientRecipes)
  @JoinColumn([{ name: "recipe_fk", referencedColumnName: "id" }])
  recipeFk: Recipe;
}
