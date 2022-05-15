import dynamic from "next/dynamic";

const UserPageForm = dynamic(
  () => import("../../../src/modules/profile/profile-parts/user-form")
);

export default function ProfileEdit() {
  return <UserPageForm />;
}
