import dynamic from "next/dynamic";
import { AuthLayout } from "../../src/layouts/auth-layout";

const ResetPasswordPage = dynamic(
  () => import("../../src/modules/reset-password")
);

export default function ResetPassword() {
  return (
    <AuthLayout>
      <ResetPasswordPage />
    </AuthLayout>
  );
}
