import Image from "next/image";
import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit";
  title: string;
  icon?: string;
  variant: string;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

const Button = ({
  type,
  title,
  icon,
  variant,
  href,
  onClick,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const baseClasses = "flexCenter gap-3 rounded-full border";
  const widthClass = fullWidth ? "w-full" : "";
  const buttonClasses = `${baseClasses} ${variant} ${widthClass}`;

  if (href) {
    return (
      <Link href={href} className={buttonClasses} onClick={onClick}>
        {icon && (
          <Image
            src={icon}
            alt={title}
            width={24}
            height={24}
            className="object-contain"
          />
        )}
        <span className="bold-16 whitespace-nowrap cursor-pointer">
          {title}
        </span>
      </Link>
    );
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick} {...props}>
      {icon && (
        <Image
          src={icon}
          alt={title}
          width={24}
          height={24}
          className="object-contain"
        />
      )}
      <span className="bold-16 whitespace-nowrap cursor-pointer">{title}</span>
    </button>
  );
};

export default Button;
