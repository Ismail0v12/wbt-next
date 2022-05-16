import { Footer } from "../../components/footer";

interface BaseLayoutProps {
  readonly children: React.ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default BaseLayout;
