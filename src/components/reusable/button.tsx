import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  readonly text: string;
  readonly type: "button" | "submit" | "reset" | undefined;
  readonly disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { text, type, disabled, ...rest } = props;
  return (
    <button className="custom-button" type={type} disabled={disabled} {...rest}>
      {text}
    </button>
  );
}

export { Button };
