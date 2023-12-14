import { Optional } from "sequelize";
import { Model, Table, Column, DataType, HasOne, CreatedAt, UpdatedAt } from "sequelize-typescript";
import { Auth } from "../auth/Auth";

export interface UserAttributes {
  id: number
  username: string
  hashed_password: string
  created_at?: Date
  updated_at?: Date
}

export interface UserFormAttributes {
  id?: number
  username: string
  password: string
}

export interface UserSignInAttributes extends Optional<UserFormAttributes, "id"> {}

export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "hashed_password" | "created_at" | "updated_at"> {}

@Table({
  timestamps: true,
  freezeTableName: true,
  underscored: true
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  }) username!: string;

  @Column({
    type: DataType.STRING(62)
  }) hashed_password!: string;

  @HasOne(() => Auth) auth!: Auth;

  @CreatedAt
  @Column created_at?: Date;

  @UpdatedAt
  @Column updated_at?: Date;
}
