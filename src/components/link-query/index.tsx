import Link, { LinkProps } from "next/link";
import { useContext } from "react";
import CountrySelectContext from "../../providers/country-select-context";

interface LinkQueryProps extends LinkProps {
  readonly children: React.ReactNode;
  readonly to?: string;
  readonly href: string;
}

export function LinkQuery({ to, children, href, ...props }: LinkQueryProps) {
  const { selectedCountry } = useContext(CountrySelectContext);

  return <Link href={href + `?country=${selectedCountry}`}>{children}</Link>;
}
