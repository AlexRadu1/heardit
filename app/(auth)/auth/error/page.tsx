import { CardWrapper } from "@/components/auth/card-wrapper";

export default function AuthErrorPage() {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Go back to login"
      headerLabel="Oops, something went wrong!"
    />
  );
}
