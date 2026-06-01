import { UserSchema } from "@/schema/user.schema";
import api from "@/api/axiosInstance";
import z from "zod";
import axios from "axios";
import { toast } from "sonner";

export const getUser = async () => {
  try {
    const response = await api.get("/users");
    const schema = z.array(UserSchema);
    return schema.parse(response.data.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}`);
    const schema = UserSchema;
    return schema.parse(response.data.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export interface CreateUserPayload {
  username: string;
  name: string;
  email: string;
  angkatan_id: number;
  nim: string;
}
export const createUser = async (payload: CreateUserPayload) => {
  try {
    const response = await api.post("/users", payload);
    toast.success("Berhasil membuat user baru", {
      position: "top-center",
    });
    return response.data;
  } catch (error) {
     console.error(error);

     let errorMessage = "Terjadi kesalahan pada server.";

     // Memeriksa jika error berasal dari respon API Axios
     if (axios.isAxiosError(error) && error.response?.data) {
       errorMessage = error.response.data.message || errorMessage;
     } else if (error instanceof Error) {
       errorMessage = error.message;
     }

     toast.error(errorMessage, {
       position: "top-center",
     });
  }
};
export const deleteUser = async (id:number)=>{
  try {
    await api.delete(`/users/${id}`);
    toast.success('Delete User Success',{position:'top-center'})
    return true
  } catch (error) {
    console.error(error);
    let message = "Terjadi kesalahan sistem";

    // Validasi apakah error berasal dari Axios
    if (axios.isAxiosError(error)) {
        // TypeScript sekarang tahu 'error' memiliki properti response
        message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
        // Jika error javascript biasa
        message = error.message;
    }
    toast.error(message,{position:'top-center'})
    return false
  }
}