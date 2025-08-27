import axios from "axios";
import { env } from "../config/env";
import type { HttpClient } from "./HttpClient";

const baseURL = env.API_BASE_URL || import.meta.env.VITE_API_BASE_URL || "/";

export class AxiosHttpClient implements HttpClient {
  private client = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 10_000,
  });

  async get<T>(url: string): Promise<T> {
    const { data } = await this.client.get(url);
    return data as T;
  }

  async post<T, B = unknown>(url: string, body: B): Promise<T> {
    const { data } = await this.client.post(url, body);
    return data as T;
  }
}
