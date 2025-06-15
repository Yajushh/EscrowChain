import axios from "axios";

export interface EscrowReleaseResponse {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  amount: number;
  currency: string;
  balance: number;
  payerId: string;
  payeeId: string;
}

export async function EscrowRelease(
  endpoint: string,
  onSuccess: (data: EscrowReleaseResponse | null) => void
) {
  try {
    const res = await axios.post<EscrowReleaseResponse>(
      `${endpoint}/release`,
      {},
      { withCredentials: true }
    );
    if (res.status === 200) {
      console.log(res.data);
      onSuccess(res.data);
    }
    onSuccess(null);
  } catch (error) {
    console.log(error);
  }
}

export async function EscrowRefund(
  endpoint: string,
  onSuccess: (data: EscrowReleaseResponse | null) => void
) {
  try {
    const res = await axios.post<EscrowReleaseResponse>(
      `${endpoint}/cancel`,
      {},
      { withCredentials: true }
    );
    if (res.status === 200) {
      console.log(res.data);
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
  }
}
