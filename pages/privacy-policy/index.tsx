import dynamic from "next/dynamic";

const PrivacyPolicyPage = dynamic(
  () => import("../../src/modules/privacy-policy")
);

function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}

export default PrivacyPolicy;
