import axiosInstance from "@/api/axiosInstance";
import { ModeToggle } from "@/components/mode-toggle";
// import { ModeSwitch } from "@/components/switch-theme";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      const token = response.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Login gagal silahkan coba lagi",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center">
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <FieldSet className=" border-2 p-4 rounded-lg">
          <h1 className="text-4xl font-medium mb-4 text-center">Login</h1>
          <div className="absolute top-4 right-4">
            <ModeToggle />
            {/* <ModeSwitch /> */}
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
          )}
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">email</FieldLabel>
              <Input
                id="email"
                type="text"
                placeholder="Max Leiter"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FieldDescription>
                Choose a unique email for your account.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </FieldSet>
      </form>
    </div>
  );
};

export default LoginPages;
