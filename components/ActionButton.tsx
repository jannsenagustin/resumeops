import Link from "next/link";

export type ActionButtonVariant = "primary" | "secondary" | "text" | "icon";

type ActionButtonProps = {
  href: string;
  label: string;
  variant?: ActionButtonVariant;
  external?: boolean;
};

const variantClasses: Record<ActionButtonVariant, string> = {
  primary: "atlas-button--primary",
  secondary: "atlas-button--secondary",
  text: "atlas-button--text",
  icon: "atlas-button--icon",
};

export default function ActionButton({
  href,
  label,
  variant = "primary",
  external = true,
}: ActionButtonProps) {
  const className = `atlas-button ${variantClasses[variant]}`;

  if (!external) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label}
    </a>
  );
}
