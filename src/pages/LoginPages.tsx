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

const LoginPages = () => {
  return (
    <div className="w-full h-screen bg-background flex flex-col items-center justify-center">
      <FieldSet className="w-full max-w-sm border-2 p-4 rounded-lg">
        <h1 className="text-4xl font-medium mb-4 text-center">Login</h1>
        <div className="absolute top-4 right-4">
          <ModeToggle />
          {/* <ModeSwitch /> */}
        </div>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" type="text" placeholder="Max Leiter" />
            <FieldDescription>
              Choose a unique username for your account.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
        </FieldGroup>
        <Button>Login</Button>
      </FieldSet>
    </div>
  );
};

export default LoginPages;
