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
import { useState } from "react";

const LoginPages = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </Button>
        </FieldSet>
      </form>
    </div>
  );
};

export default LoginPages;
