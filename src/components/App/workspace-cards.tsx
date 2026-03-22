import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  helper,
  tone = "default",
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "default" | "primary" | "secondary" | "success" | "warning";
}) {
  const toneClass = {
    default: "border-border/70 bg-card/80",
    primary: "border-primary/20 bg-primary/10",
    secondary: "border-secondary/20 bg-secondary/10",
    success: "border-emerald-500/20 bg-emerald-500/10",
    warning: "border-amber-500/20 bg-amber-500/10",
  }[tone];

  return (
    <div
      className={cn(
        "rounded-[1.8rem] border p-5 shadow-sm backdrop-blur-xl",
        toneClass,
      )}
    >
      <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-foreground">{value}</div>
      {helper && <div className="mt-2 text-sm text-muted-foreground">{helper}</div>}
    </div>
  );
}

export function Surface({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-[2rem] border border-border/70 bg-card/80 p-5 shadow-sm backdrop-blur-xl sm:p-6",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        {eyebrow && (
          <div className="text-sm font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </div>
        )}
        <h3 className="mt-1 text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
          {title}
        </h3>
        {description && (
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function ListItem({
  title,
  description,
  meta,
  badge,
  action,
}: {
  title: string;
  description: string;
  meta?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="font-medium text-foreground">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{description}</div>
          {meta && (
            <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
              {meta}
            </div>
          )}
        </div>
        {badge && <div className="shrink-0 self-start">{badge}</div>}
      </div>
      {action && <div className="mt-4 flex justify-end">{action}</div>}
    </div>
  );
}
