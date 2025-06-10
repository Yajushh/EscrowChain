import axios from "axios";
import { useEffect, useState } from "react";

import CreateEscrow from "./CreateEscrow";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  balance: number;
  createdAt: string;
}
interface AxiosResponse {
  message: string;
  users: User[];
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const url = "http://localhost:4000/api/user";

  const fetchUsers = async () => {
    try {
      const res = await axios.get<AxiosResponse>(url, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-semibold mb-4">Users</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 border border-gray-200 divide-y divide-gray-200 divide-x">
          {users.map((user, idx) => (
            <div key={idx} className="p-3 flex items-center justify-between">
              <span className="text-indigo-700 font-semibold  text-lg hover:underline   ">
                {user.name}
              </span>
              <CreateEscrow id={user.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
