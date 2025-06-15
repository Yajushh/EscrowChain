export interface CreateEscrowPayload {
  payerId: string;
  payeeId: string;
  amount: number;
  currency: string;
}
