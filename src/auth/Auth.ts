import { Optional } from "sequelize";
import {
  Model, Table, Column, CreatedAt, UpdatedAt,
  DataType, ForeignKey, BelongsTo
} from "sequelize-typescript";
import { User } from "../users/User";

export interface AuthAttributes {
  id: number
  user_id: number
  token: string
  expiry_date: Date
  created_at?: Date
  updated_at?: Date
}

export interface AuthForm {
  id?: number
  user_id: number
  token: string
  refresh_token?: string
  expiry_date: Date
}

export interface AuthFormAttributes extends Optional<AuthForm, "id" | "refresh_token" | "expiry_date"> {}

export interface AuthCreationAttributes extends Optional<AuthAttributes, "id" | "created_at" | "updated_at"> {}

@Table({
  timestamps: true,
  freezeTableName: true,
  underscored: true
})
export class Auth extends Model<AuthAttributes, AuthCreationAttributes> {
  @ForeignKey(() => User)
  @Column user_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  }) token!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  }) expiry_date!: Date;

  @BelongsTo(() => User) user!: User;

  @CreatedAt
  @Column created_at?: Date;

  @UpdatedAt
  @Column updated_at?: Date;
}
