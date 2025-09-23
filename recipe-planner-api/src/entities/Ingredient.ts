import { Column, Entity, Index, OneToMany } from "typeorm";
import { Grocerylist } from "./Grocerylist";
import { IngredientRecipe } from "./IngredientRecipe";

@Index("ingredient_pkey", ["id"], { unique: true })
@Entity("ingredient", { schema: "public" })
export class Ingredient {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", { name: "type", nullable: true, length: 255 })
  type: string | null;

  @OneToMany(() => Grocerylist, (grocerylist) => grocerylist.ingredientFk)
  grocerylists: Grocerylist[];

  @OneToMany(
    () => IngredientRecipe,
    (ingredientRecipe) => ingredientRecipe.ingredientFk
  )
  ingredientRecipes: IngredientRecipe[];
}
