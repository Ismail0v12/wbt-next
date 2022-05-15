import dynamic from "next/dynamic";

const NotFoundPage = dynamic(() => import("../../src/modules/notfound"));

export default function Custom404() {
  return <NotFoundPage />;
}
