export interface CreateEscrowPayload {
  payerId: string;
  payeeId: string;
  amount: number;
  currency: string;
}

export interface EscrowCreatedPayload {
  escrowId: string;
  payerId: string;
  payeeId: string;
  amount: number;
  currency: string;
  createdAt: Date;
}

export interface EscrowFundedPayload {
  escrowId: string;
  amount: number;
  fundedAt: Date;
}
export interface EscrowReleasedPayload {
  escrowId: string;
  amount: number;
  releasedAt: Date;
}
export interface EscrowRefundedPayload {
  escrowId: string;
  amount: number;
  refundedAt: Date;
}
