import { Axios } from "../../lib/axiosInstance";
import { handleRequest } from "../handleRequest";

export const fetchServices = async () => {
  return handleRequest(
    () => Axios.get("/services"),
    "Failed to fetch services",
  );
};

export const addService = async (data: any) => {
  return handleRequest(
    () => Axios.post("/services", data),
    "Failed to add service",
  );
};
