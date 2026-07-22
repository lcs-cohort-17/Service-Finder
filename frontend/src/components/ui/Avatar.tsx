type AvatarProps = {
  name: string;
  size?: "sm" | "lg";
};

const sizeClasses: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-sm",
  lg: "h-14 w-14 text-xl",
};

/**
 * Circular initial badge used next to the user's name in the nav bar
 * and on the Profile Dashboard header (see mockup).
 */
function Avatar({ name, size = "sm" }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-white ${sizeClasses[size]}`}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

export default Avatar;