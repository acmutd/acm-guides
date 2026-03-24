export function GradientText({
  children,
  gradient = 'bg-development-gradient',
}: {
  children: React.ReactNode;
  gradient?: string;
}) {
  return (
    <span
      className={`${gradient} bg-clip-text text-transparent bg-size-200 animate-gradient inline-block px-1 py-1 leading-tight`}
    >
      {children}
    </span>
  );
}
