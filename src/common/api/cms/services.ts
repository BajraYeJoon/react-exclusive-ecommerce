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

export const updateService = async (data: FormData) => {
  const id = data.get("id");
  return handleRequest(
    () => Axios.patch(`/services/${id}`, data),
    "Failed to update service",
  );
};

export const deleteService = async (id: any) => {
  return handleRequest(
    () => Axios.delete(`/services/${id}`),
    "Failed to delete service",
  );
};