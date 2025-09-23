import { Column, Entity, Index, OneToMany } from "typeorm";
import { Grocerylist } from "./Grocerylist";
import { Mealplan } from "./Mealplan";
import { MealplanRecipe } from "./MealplanRecipe";

@Index("user_email_key", ["email"], { unique: true })
@Index("user_pkey", ["id"], { unique: true })
@Index("user_idp_sub_key", ["idpSub"], { unique: true })
@Entity("user", { schema: "public" })
export class User {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("character varying", {
    name: "email",
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @Column("character varying", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("character varying", {
    name: "idp_sub",
    nullable: true,
    unique: true,
    length: 255,
  })
  idpSub: string | null;

  @OneToMany(() => Grocerylist, (grocerylist) => grocerylist.userFk)
  grocerylists: Grocerylist[];

  @OneToMany(() => Mealplan, (mealplan) => mealplan.userFk)
  mealplans: Mealplan[];

  @OneToMany(() => MealplanRecipe, (mealplanRecipe) => mealplanRecipe.userFk)
  mealplanRecipes: MealplanRecipe[];
}
