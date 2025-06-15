import axios from "axios";

interface AxiosReponse {
  id: string;
  name: string;
  balance: number;
}

export async function fetchUser(
  id: string,
  onSuccess: (data: AxiosReponse) => void
) {
  const endpoint = "http://localhost:4000/api/user/fetchUser";
  try {
    const res = await axios.post<AxiosReponse>(
      endpoint,
      { id },
      {
        withCredentials: true,
      }
    );
    if (res.status === 201) {
      console.log(res.data);
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
  }
}
