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
import { useLogin } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(true);

  const { mutate: login, isPending, isError } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <FieldSet className=" border-2 p-4 rounded-lg">
          <h1 className="text-4xl font-medium mb-4 text-center">Login</h1>
          <div className="absolute top-4 right-4">
            <ModeToggle />
            {/* <ModeSwitch /> */}
          </div>
          {isError && (
            <p className="text-red-500 text-sm mb-2 text-center">
              {"Incorrect email or password."}
            </p>
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
              <div className="relative flex items-center">
                <Input
                  id="password"
                  type={viewPassword ? "password" : "text"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setViewPassword(!viewPassword)}
                  className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={
                    viewPassword ? "Tampilkan sandi" : "Sembunyikan sandi"
                  }
                >
                  {viewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </Field>
          </FieldGroup>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </Button>
        </FieldSet>
      </form>
    </div>
  );
};

export default LoginPages;
