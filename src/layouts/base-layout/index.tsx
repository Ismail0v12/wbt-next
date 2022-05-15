interface BaseLayoutProps {
  readonly children: React.ReactNode;
}

function BaseLayout({ children }: BaseLayoutProps) {
  return <>{children}</>;
}

export default BaseLayout;
