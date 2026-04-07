import { UserSchema } from "@/schema/user.schema";
import api from "@/api/axiosInstance";
import z from "zod";

export const getUser = async () => {
  try {
    const response = await api.get("/user");
    const schema = z.array(UserSchema);
    return schema.parse(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/user/${id}`);
    const schema = UserSchema;
    return schema.parse(response.data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
