const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
  token?: string;
}

export async function apiRequest(
  endpoint: string,
  options: RequestOptions = {},
) {
  const { method = "GET", body, headers = {} } = options;

  let token = options.token;
  if (!token && typeof window !== "undefined") {
    token = localStorage.getItem("accessToken") || undefined;
  }

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Handle 401 Unauthorized globally if needed (e.g., redirect to login)
    if (response.status === 401 && typeof window !== "undefined") {
      window.location.href = "/login";
      return;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error("API Request Failed:", error);
    throw error;
  }
}
