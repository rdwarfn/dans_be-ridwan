import { Optional } from "sequelize"
import { v1 as uuid } from "uuid"
import {
  Model, Table, Column, CreatedAt, UpdatedAt,
  DataType, PrimaryKey, IsUrl
} from "sequelize-typescript"

export interface JobAttributes {
  id?: string
  type: string
  url: string
  company: string
  company_url: string
  location: string
  title: string
  description: string
  how_to_apply: string
  company_log: string
}

export interface JobCreationAttributes extends Optional<JobAttributes, "id"> {}

@Table({
  timestamps: true,
  freezeTableName: true,
  underscored: true
})
export class Job extends Model<JobAttributes, JobCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: uuid()
  }) id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  }) type!: string;

  @IsUrl
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  }) url!: string;

  @Column({
    type: DataType.STRING
  }) company!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  }) location!: string;

  @Column({
    type: DataType.TEXT("long"),
    allowNull: true,
  }) description!: string

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  }) title!: string;

  @Column({
    type: DataType.TEXT("medium"),
    allowNull: true,
  }) how_to_apply!: string;

  @IsUrl
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  }) company_logo!: string;

  @CreatedAt
  @Column({ type: DataType.DATE }) created_at!: string;

  @UpdatedAt
  @Column({ type: DataType.DATE }) updated_at?: string;
}
