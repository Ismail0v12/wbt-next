import PinInput from "react-pin-input";
import { PinInputProps } from "react-pin-input";

export default function CustomPinInput({ ...props }: PinInputProps) {
  const ISCLIENT = typeof window !== "undefined";

  if (ISCLIENT) {
    return <PinInput {...props} />;
  }

  return <>{"  "}</>;
}
