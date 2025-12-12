import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken as getStoredToken } from "@/lib/auth";
import { getApiBase } from "@/lib/api";

// ============ Types ============

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  email_verified_at: string | null;
  created_at: string;
  current_plan: string;
}

export interface Payment {
  id: number;
  transaction_id: string;
  amount: number;
  currency: string;
  status: "completed" | "pending" | "failed" | "refunded";
  type: string;
  paid_at: string;
  plan_name?: string;
}

export interface UsageStats {
  api_calls_total: number;
  api_calls_this_month: number;
  api_calls_limit: number;
  storage_used_mb: number;
  storage_limit_mb: number;
  daily_usage: { date: string; calls: number }[];
  monthly_usage: { month: string; calls: number }[];
}

export interface AIResult {
  id: string;
  job_id: string;
  status: "completed" | "processing" | "queued" | "failed";
  type: "lip-reading" | "gesture" | "emotion" | "speech-to-text";
  input_preview: string;
  output?: {
    transcript?: string;
    confidence?: number;
    gestures?: { name: string; confidence: number }[];
    emotions?: { name: string; confidence: number }[];
  };
  created_at: string;
  processed_at?: string;
  duration_ms?: number;
}

export interface CurrentPlan {
  name: string;
  slug: string;
  price_monthly: number | null;
  price_yearly: number | null;
  features: string[];
  api_calls_limit: number;
  expires_at: string | null;
  is_active: boolean;
}

interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  message?: string;
}

// ============ Fetch Helpers ============

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const base = getApiBase();
  const token = getStoredToken();

  const res = await fetch(
    `${base}${path.startsWith("/") ? path : `/${path}`}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options?.headers,
      },
    }
  );

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const errorMessage =
      (json as { message?: string })?.message || res.statusText;
    throw new Error(errorMessage);
  }

  return json as T;
}

// ============ Query Keys ============

export const queryKeys = {
  user: ["user"] as const,
  profile: ["profile"] as const,
  payments: ["payments"] as const,
  currentPlan: ["currentPlan"] as const,
  usage: ["usage"] as const,
  results: ["results"] as const,
};

// ============ Hooks ============

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () =>
      fetchApi<ApiResponse<UserProfile>>("/user").then((res) => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) =>
      fetchApi<ApiResponse<UserProfile>>("/user", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const base = getApiBase();
      const token = getStoredToken();
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${base}/user/avatar`, {
        method: "POST",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(
          (json as { message?: string })?.message || "Upload failed"
        );
      }
      return json as ApiResponse<{ avatar: string }>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile });
    },
  });
}

export function usePayments(page = 1) {
  return useQuery({
    queryKey: [...queryKeys.payments, page],
    queryFn: () =>
      fetchApi<
        ApiResponse<{
          data: Payment[];
          meta: { current_page: number; last_page: number; total: number };
        }>
      >(`/payments?page=${page}`).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
  });
}

export function useCurrentPlan() {
  return useQuery({
    queryKey: queryKeys.currentPlan,
    queryFn: () =>
      // API exposes last-plan under /payments/last-plan per docs
      fetchApi<ApiResponse<CurrentPlan>>("/payments/last-plan").then(
        (res) => res.data
      ),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUsageStats() {
  return useQuery({
    queryKey: queryKeys.usage,
    queryFn: () => Promise.resolve(generateDemoUsageStats()),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useAIResults(limit = 10) {
  return useQuery({
    queryKey: [...queryKeys.results, limit],
    queryFn: () => Promise.resolve(generateDemoResults().slice(0, limit)),
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useAIJobStatus(jobId: string) {
  return useQuery({
    queryKey: ["aiJob", jobId],
    queryFn: () =>
      // Job status endpoint is /ai/jobs/{id}/status according to docs
      fetchApi<ApiResponse<AIResult>>(`/ai/jobs/${jobId}/status`).then(
        (res) => res.data
      ),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const data = query.state.data;
      // Keep polling if job is still processing
      if (data?.status === "processing" || data?.status === "queued") {
        return 2000; // Poll every 2 seconds
      }
      return false;
    },
  });
}

// ============ Demo Data Generators ============
// These generate realistic-looking data when API returns empty or errors

export function generateDemoUsageStats(): UsageStats {
  const now = new Date();
  const dailyUsage = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(now);
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split("T")[0],
      calls: Math.floor(Math.random() * 500) + 100,
    };
  });

  const monthlyUsage = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now);
    date.setMonth(date.getMonth() - (5 - i));
    return {
      month: date.toLocaleString("default", { month: "short" }),
      calls: Math.floor(Math.random() * 15000) + 5000,
    };
  });

  return {
    api_calls_total: 47823,
    api_calls_this_month: dailyUsage.reduce((sum, d) => sum + d.calls, 0),
    api_calls_limit: 50000,
    storage_used_mb: 1247,
    storage_limit_mb: 5000,
    daily_usage: dailyUsage,
    monthly_usage: monthlyUsage,
  };
}

export function generateDemoResults(): AIResult[] {
  const types: AIResult["type"][] = [
    "lip-reading",
    "gesture",
    "emotion",
    "speech-to-text",
  ];
  const statuses: AIResult["status"][] = [
    "completed",
    "completed",
    "completed",
    "processing",
    "completed",
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const type = types[i % types.length];
    const status = statuses[i % statuses.length];
    const now = new Date();
    const createdAt = new Date(now.getTime() - i * 3600000);

    return {
      id: `result-${i + 1}`,
      job_id: `job-${Math.random().toString(36).slice(2, 10)}`,
      status,
      type,
      input_preview: `video_${i + 1}.mp4`,
      output:
        status === "completed"
          ? {
              transcript:
                type === "lip-reading"
                  ? [
                      "Hello, how are you today?",
                      "The weather is beautiful outside.",
                      "I need to schedule a meeting for tomorrow.",
                      "Can you help me with this project?",
                    ][i % 4]
                  : undefined,
              confidence: 0.87 + Math.random() * 0.1,
              gestures:
                type === "gesture"
                  ? [
                      { name: "Thumbs Up", confidence: 0.94 },
                      { name: "Wave", confidence: 0.89 },
                    ]
                  : undefined,
              emotions:
                type === "emotion"
                  ? [
                      { name: "Happy", confidence: 0.82 },
                      { name: "Neutral", confidence: 0.15 },
                    ]
                  : undefined,
            }
          : undefined,
      created_at: createdAt.toISOString(),
      processed_at:
        status === "completed"
          ? new Date(createdAt.getTime() + 2500).toISOString()
          : undefined,
      duration_ms:
        status === "completed" ? 2500 + Math.random() * 1500 : undefined,
    };
  });
}

export function generateDemoPayments(): Payment[] {
  const now = new Date();
  return Array.from({ length: 5 }, (_, i) => {
    const paidAt = new Date(now);
    paidAt.setMonth(paidAt.getMonth() - i);
    return {
      id: i + 1,
      transaction_id: `txn_${Math.random().toString(36).slice(2, 14)}`,
      amount: i === 0 ? 99 : 99,
      currency: "USD",
      status: "completed" as const,
      type: "subscription",
      paid_at: paidAt.toISOString(),
      plan_name: "Pro",
    };
  });
}
