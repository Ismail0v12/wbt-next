import PinInput from "react-pin-input";
// @ts-ignore

import { PinInputProps } from "react-pin-input";

export default function CustomPinInput({ ...props }: PinInputProps) {
  const ISCLIENT = typeof window !== "undefined";

  if (ISCLIENT) {
    // @ts-ignore
    return <PinInput {...props} />;
  }

  return <>{"  "}</>;
}
