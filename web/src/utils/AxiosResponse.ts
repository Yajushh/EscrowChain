export interface EscrowByIdResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  amount: number;
  currency: string;
  balance: number;
  payerId: string;
  payeeId: string;
  transactions: [
    {
      id: string;
      createdAt: Date;
      type: string;
      amount: number;
      escrowId: string;
    }
  ];
}
