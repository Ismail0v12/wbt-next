import Link, { LinkProps } from "next/link";

interface LinkQueryProps extends LinkProps {
  readonly children: React.ReactNode;
  readonly to?: string;
  readonly href: string;
}

export function LinkQuery({ to, children, href, ...props }: LinkQueryProps) {
  const currentCountry =
    typeof window !== "undefined" ? localStorage.getItem("country_code") : "";
  const countryCode =
    currentCountry === null || currentCountry === undefined
      ? ""
      : currentCountry;
  return <Link href={href + `?country=${countryCode}`}>{children}</Link>;
}
