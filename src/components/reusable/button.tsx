import { HTMLAttributes } from "react";
import { UploadingIcon } from "../assets/icons/Uploading";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  readonly text: string;
  readonly type: "button" | "submit" | "reset" | undefined;
  readonly disabled?: boolean;
  readonly isLoading?: boolean;
}

function Button(props: ButtonProps) {
  const { text, type, disabled, isLoading, ...rest } = props;
  return (
    <button className="custom-button" type={type} disabled={disabled} {...rest}>
      {text} {isLoading && <UploadingIcon />}
    </button>
  );
}

export { Button };
