// Serve para a validação de regras de negócio

export class List {
  id: number;
  name: string;

  constructor(name: string, id?: number) {
    this.name = name;
    this.id = id;
  }
}
