import { Table, Model, Column } from 'sequelize-typescript';

export type ListAttributes = {
  name: string;
};

// Serve apena para mapear o banco de dados, com preocupação apenas no armazenamento
@Table
export class ListModel extends Model<ListAttributes> {
  @Column
  name: string;
}
