import dynamic from "next/dynamic";

const TermOfUsePage = dynamic(() => import("../../src/modules/term-of-usage"));

function TermOfUse() {
  return <TermOfUsePage />;
}

export default TermOfUse;
