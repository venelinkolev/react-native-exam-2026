import apiClient from "./apiClient";
import { LoginRequest, LoginResponse } from "../types/auth.types";

// POST — login user
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/login", data);
    return response.data;
};