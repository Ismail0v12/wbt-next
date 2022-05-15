import { InputHTMLAttributes } from "react";
import { toast } from "react-toastify";
import EyeOpenIcon from "../assets/icons/EyeOpenIcon";
import EyeCloseIcon from "../assets/icons/EyeCloseIcon";
import CopyIcon from "../assets/icons/CopyIcon";
import CalendarIcon from "../assets/icons/CalendarIcon";
import ShareIcon from "../assets/icons/ShareIcon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly name: string;
  readonly label: string;
  readonly errorName?: string;
  readonly type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "datalist";
  readonly isTypePassword?: boolean;
  readonly setShowPassword?: (falsy: boolean) => void;
  readonly copyText?: boolean;
  readonly isCalendar?: boolean;
  readonly link?: string;
  readonly generatedLink?: string;
  readonly labelClass?: any;
}

function Input(props: InputProps) {
  const {
    name,
    label,
    type,
    errorName,
    isTypePassword = false,
    setShowPassword,
    isCalendar,
    copyText,
    link,
    generatedLink,
    labelClass,
    ...rest
  } = props;

  return (
    <label htmlFor={name} className={`custom-input ${labelClass}`}>
      <span>{label}</span>
      <input id={name} name={name} placeholder={label} type={type} {...rest} />
      {isTypePassword && type === "password" && (
        <EyeOpenIcon onClick={() => setShowPassword && setShowPassword(true)} />
      )}
      {isTypePassword && type !== "password" && (
        <EyeCloseIcon
          onClick={() => setShowPassword && setShowPassword(false)}
        />
      )}
      {copyText && (
        <i>
          <a href={link} target="_blank" rel="noreferrer">
            <ShareIcon />
          </a>
          <CopyIcon
            onClick={() => {
              if (generatedLink) {
                navigator.clipboard.writeText(generatedLink);
                toast("Copied", {
                  position: "bottom-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  type: "success",
                });
              }
            }}
          />
        </i>
      )}
      {isCalendar && <CalendarIcon />}
      {errorName && <div className="errors">{errorName}</div>}
    </label>
  );
}

export { Input };
