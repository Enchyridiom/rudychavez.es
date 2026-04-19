type Props = {
  className?: string;
};

/**
 * Placeholder for missing/broken images. Renders a solid blue box
 * with 1rem rounded corners, inheriting height from its parent.
 */
export function ImagePlaceholder({ className = '' }: Props) {
  return (
    <div
      className={`w-full h-full bg-[#5576e8] rounded-[1rem] ${className}`}
      aria-label="Imagen en preparación"
      role="img"
    />
  );
}
