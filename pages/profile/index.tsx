import dynamic from "next/dynamic";
import { ProfileLayout } from "../../src/layouts/profile-layout";
const UserPage = dynamic(() => import("../../src/modules/profile"));

export default function ProfilePage() {
  return (
    <ProfileLayout>
      <UserPage />
    </ProfileLayout>
  );
}
