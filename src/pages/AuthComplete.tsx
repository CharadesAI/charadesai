import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { getApiBase } from "@/lib/api";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

type AuthStatus = "loading" | "success" | "error";

export default function AuthComplete() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const completeAuth = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setErrorMessage("No authentication token provided.");
        setTimeout(() => navigate("/signin"), 3000);
        return;
      }

      try {
        // Fetch user profile with the token
        const res = await fetch(`${getApiBase()}/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const json = await res.json();
        const user = json.data || json.user || json;

        // Store token and user in auth context
        login(token, user);

        setStatus("success");

        // Clean the URL to remove the token from browser history
        window.history.replaceState({}, document.title, "/auth/complete");

        // Redirect to dashboard after a brief success message
        setTimeout(() => navigate("/dashboard"), 1500);
      } catch (error) {
        console.error("Auth completion error:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Authentication failed"
        );
        setTimeout(() => navigate("/signin"), 3000);
      }
    };

    completeAuth();
  }, [searchParams, login, navigate]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='text-center space-y-6 p-8'>
        {status === "loading" && (
          <>
            <Loader2 className='w-16 h-16 mx-auto text-primary animate-spin' />
            <div>
              <h1 className='text-2xl font-bold'>Completing Sign In...</h1>
              <p className='text-muted-foreground mt-2'>
                Please wait while we verify your authentication.
              </p>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className='w-16 h-16 mx-auto text-green-500' />
            <div>
              <h1 className='text-2xl font-bold'>Sign In Successful!</h1>
              <p className='text-muted-foreground mt-2'>
                Redirecting you to your dashboard...
              </p>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className='w-16 h-16 mx-auto text-red-500' />
            <div>
              <h1 className='text-2xl font-bold'>Authentication Failed</h1>
              <p className='text-muted-foreground mt-2'>
                {errorMessage || "Something went wrong."}
              </p>
              <p className='text-sm text-muted-foreground mt-1'>
                Redirecting to sign in page...
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
