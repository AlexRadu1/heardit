import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage() {
  const session = await auth();
  return (
    <div>
      <LoginForm />
    </div>
  );
}
