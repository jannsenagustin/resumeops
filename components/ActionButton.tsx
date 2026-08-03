import Link from "next/link";

export type ActionButtonVariant = "primary" | "secondary";

type ActionButtonProps = {
  href: string;
  label: string;
  variant?: ActionButtonVariant;
  external?: boolean;
};

const variantClasses: Record<ActionButtonVariant, string> = {
  primary:
    "border-green-400/30 text-green-300 hover:border-green-400 hover:bg-green-400/10",
  secondary:
    "border-white/15 text-gray-300 hover:border-green-400/60 hover:text-green-300",
};

export default function ActionButton({
  href,
  label,
  variant = "primary",
  external = true,
}: ActionButtonProps) {
  const className = `motion-button rounded-md border px-4 py-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${variantClasses[variant]}`;

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
