import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Grocerylist } from "./Grocerylist";
import { User } from "./User";
import { MealplanRecipe } from "./MealplanRecipe";

@Index("mealplan_pkey", ["id"], { unique: true })
@Entity("mealplan", { schema: "public" })
export class Mealplan {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("date", { name: "start_date", nullable: true })
  startDate: string | null;

  @Column("date", { name: "end_date", nullable: true })
  endDate: string | null;

  @OneToMany(() => Grocerylist, (grocerylist) => grocerylist.mealplanFk)
  grocerylists: Grocerylist[];

  @ManyToOne(() => User, (user) => user.mealplans)
  @JoinColumn([{ name: "user_fk", referencedColumnName: "id" }])
  userFk: User;

  @OneToMany(
    () => MealplanRecipe,
    (mealplanRecipe) => mealplanRecipe.mealplanFk
  )
  mealplanRecipes: MealplanRecipe[];
}
