export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T, B = unknown>(url: string, body: B): Promise<T>;
}
