import { useNavigate } from "react-router-dom";
import { EscrowStore } from "../store/escrowStore";

interface CreateEscrowProps {
  id: string;
}

export default function CreateEscrow({ id }: CreateEscrowProps) {
  const navigate = useNavigate();
  const setPayeeId = EscrowStore((state) => state.assignId);
  const handleClick = () => {
    setPayeeId(id);
    navigate("/escrow");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1 px-3 rounded"
    >
      Create Escrow
    </button>
  );
}
