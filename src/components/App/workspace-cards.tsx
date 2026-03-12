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
    default:
      "before:from-white/80 before:to-white/20 dark:before:from-white/8 dark:before:to-transparent",
    primary:
      "before:from-primary/25 before:to-primary/5 dark:before:from-primary/18 dark:before:to-transparent",
    secondary:
      "before:from-secondary/25 before:to-secondary/5 dark:before:from-secondary/18 dark:before:to-transparent",
    success:
      "before:from-emerald-500/22 before:to-emerald-500/5 dark:before:from-emerald-500/18 dark:before:to-transparent",
    warning:
      "before:from-amber-500/22 before:to-amber-500/5 dark:before:from-amber-500/18 dark:before:to-transparent",
  }[tone];

  return (
    <div
      className={cn(
        "glass-panel mesh-card relative overflow-hidden rounded-[1.75rem] p-5 before:absolute before:inset-0 before:bg-linear-to-br",
        toneClass,
      )}
    >
      <div className="relative">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-foreground">
          {value}
        </div>
        {helper ? <div className="mt-2 text-sm text-muted-foreground">{helper}</div> : null}
      </div>
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
        "glass-panel mesh-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />
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
        {eyebrow ? (
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            {eyebrow}
          </div>
        ) : null}
        <h3 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-foreground">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function ListItem({
  title,
  description,
  meta,
  badge,
}: {
  title: string;
  description: string;
  meta?: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="ui-card-elevated rounded-[1.4rem] p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-medium text-foreground">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">{description}</div>
          {meta ? <div className="mt-3 text-xs text-muted-foreground">{meta}</div> : null}
        </div>
        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>
    </div>
  );
}
