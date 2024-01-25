export class Expense {
  constructor(
    public category: string,
    public amount: number,
    public id: string | null,
    public color?: string
  ) {}
}

export class NewExpense {
  constructor(
    public category: string,
    public amount: number,
    public color?: string
  ) {}
}
