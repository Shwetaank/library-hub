"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  Clock3,
  Library,
  Minus,
  Plus,
  Search,
  Shield,
  Star,
  Users,
  Zap,
} from "lucide-react";

const panelClass =
  "glass-panel mesh-card relative overflow-hidden rounded-3xl text-card-foreground";
const panelOverlay =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.12),transparent_24%),linear-gradient(135deg,rgba(79,70,229,0.06),transparent_45%,rgba(245,158,11,0.1))]";
const sectionTitle = "text-3xl font-semibold sm:text-4xl md:text-5xl";
const sectionCopy = "mt-4 text-sm text-muted-foreground sm:text-base";

const LandingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = React.useState<number>(0);

  const stats = [
    { label: "Libraries onboarded", value: "1,200+" },
    { label: "Active readers", value: "94K+" },
    { label: "Avg onboarding", value: "14 min" },
  ];

  const features = [
    {
      icon: Search,
      title: "Unified Search",
      description: "Find books instantly by title, author, ISBN, or keyword.",
      image: "/images/features/UnifiedSearch.png",
    },
    {
      icon: BookOpenCheck,
      title: "Fast Borrowing",
      description: "Issue, renew, return, and track due dates from one panel.",
      image: "/images/features/FastBorrowing.png",
    },
    {
      icon: Users,
      title: "Member Operations",
      description: "Manage roles, borrowing limits, and reading history clearly.",
      image: "/images/features/MemberOperation.png",
    },
    {
      icon: BarChart3,
      title: "Live Insights",
      description: "Monitor usage, overdue trends, and inventory performance.",
      image: "/images/features/LiveInsight.png",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Role-based controls with clean audit visibility by design.",
      image: "/images/features/SecureAccess.png",
    },
    {
      icon: Zap,
      title: "Workflow Automation",
      description: "Automated reminders and notifications reduce manual effort.",
      image: "/images/features/WorkflowAutomation.png",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      href: "/register",
      cta: "Start Free",
      featured: false,
      description: "Perfect for side projects and small teams.",
      core: [
        "Up to 2,000 books",
        "10 GB storage",
        "Basic analytics",
        "Email support",
        "API access",
      ],
      extra: [] as string[],
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      href: "/register",
      cta: "Get Started",
      featured: true,
      description: "For growing teams that need more power.",
      core: [
        "Up to 25,000 books",
        "100 GB storage",
        "Advanced analytics",
        "Priority support",
        "API access",
      ],
      extra: [
        "Custom integrations",
        "Team collaboration",
        "Advanced security",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      href: "/contact",
      cta: "Contact Sales",
      featured: false,
      description: "For organizations that need full control.",
      core: [
        "Unlimited catalog",
        "Unlimited storage",
        "Custom analytics",
        "24/7 support",
        "Dedicated account manager",
      ],
      extra: ["SSO + SAML", "Audit logs", "SLA guarantee"],
    },
  ];

  const faqs = [
    {
      q: "How long does setup take?",
      a: "Most libraries start the same day. Larger migrations take a few days with support.",
    },
    {
      q: "Can we migrate from our existing software?",
      a: "Yes. We support CSV imports and assisted migration for structured datasets.",
    },
    {
      q: "Is this suitable for schools and colleges?",
      a: "Yes. LibraryHub works well for schools, colleges, and multi-branch libraries.",
    },
    {
      q: "Do you support role-based access for staff?",
      a: "Yes. You can define permissions for admins, librarians, assistants, and other staff roles.",
    },
    {
      q: "Can we automate due-date and overdue reminders?",
      a: "Yes. Automated reminder workflows are included to reduce manual follow-ups.",
    },
    {
      q: "What integrations are available?",
      a: "Pro and Enterprise plans support API integrations and custom workflows with your existing systems.",
    },
    {
      q: "How secure is our data on LibraryHub?",
      a: "We use secure access controls, encrypted data handling, and audit-friendly logging capabilities.",
    },
    {
      q: "Do you offer onboarding and training?",
      a: "Yes. Every plan includes guided onboarding resources, and larger teams can request dedicated support.",
    },
    {
      q: "Can we change plans later?",
      a: "Absolutely. You can upgrade or adjust plans as your catalog size and team requirements grow.",
    },
    {
      q: "Is there a free trial?",
      a: "Yes. You can start with a free trial to evaluate workflows, performance, and team fit before subscribing.",
    },
  ];

  const people = [
    {
      src: "https://i.pravatar.cc/64?img=15",
      name: "Riya Sharma",
      role: "Head Librarian",
    },
    {
      src: "https://i.pravatar.cc/64?img=12",
      name: "Amit Kulkarni",
      role: "IT Administrator",
    },
    {
      src: "https://i.pravatar.cc/64?img=5",
      name: "Sneha Iyer",
      role: "Library Coordinator",
    },
    {
      src: "https://i.pravatar.cc/64?img=20",
      name: "Rahul Verma",
      role: "Principal",
    },
    {
      src: "https://i.pravatar.cc/64?img=32",
      name: "Priya Nair",
      role: "Head Librarian",
    },
  ];

  return (
    <div className="page-surface">
      <section className="relative overflow-hidden px-6 pb-16 pt-12 sm:pb-20 md:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(79,70,229,0.14),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(245,158,11,0.16),transparent_28%)]" />
        <div className="noise-grid pointer-events-none absolute inset-x-6 top-8 bottom-0 opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_92%)]" />
        <div className="pointer-events-none absolute -right-10 top-8 h-72 w-72 rounded-full bg-primary/12 blur-3xl md:h-96 md:w-96" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-secondary/14 blur-3xl md:h-96 md:w-96" />

        <div className="container relative mx-auto grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge
              variant="outline"
              className="mb-5 rounded-full border-primary/25 bg-background/75 px-4 py-1.5 text-primary shadow-sm backdrop-blur-sm"
            >
              <Library className="mr-1.5 h-3.5 w-3.5" />
              LibraryHub SaaS
            </Badge>

            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl">
              Manage your library with speed, clarity, and a calmer workflow
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A complete platform for catalog, borrowing, members, and
              analytics. Designed to reduce manual work and improve reader
              experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full rounded-full bg-linear-to-r from-primary to-secondary px-7 text-primary-foreground shadow-[0_18px_45px_-20px_rgba(79,70,229,0.65)] sm:w-auto"
              >
                <Link href="/register">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full rounded-full border-border/70 bg-background/70 backdrop-blur-sm sm:w-auto"
              >
                <Link href="/about">View Platform</Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 backdrop-blur-sm">
                Zero layout friction
              </span>
              <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 backdrop-blur-sm">
                Staff-friendly controls
              </span>
              <span className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 backdrop-blur-sm">
                Real-time visibility
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <Card
                  key={stat.label}
                  className="ui-card-elevated glass-panel rounded-2xl p-4"
                >
                  <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="hero-shell p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Card className="glass-panel col-span-2 rounded-[1.4rem] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">Operations Snapshot</p>
                  <span className="rounded-full border border-emerald-500/15 bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600">
                    Live
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl border border-border/60 bg-background/70 p-2 text-center shadow-sm">
                    <Clock3 className="mx-auto mb-1 h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Issue Time</p>
                    <p className="text-sm font-semibold">46s</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/70 p-2 text-center shadow-sm">
                    <Users className="mx-auto mb-1 h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Readers</p>
                    <p className="text-sm font-semibold">18.4K</p>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/70 p-2 text-center shadow-sm">
                    <BarChart3 className="mx-auto mb-1 h-4 w-4 text-primary" />
                    <p className="text-xs text-muted-foreground">Utilization</p>
                    <p className="text-sm font-semibold">93%</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Catalog sync</span>
                    <span>96%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/80">
                    <div className="h-full w-[96%] rounded-full bg-linear-to-r from-primary to-secondary" />
                  </div>
                </div>
              </Card>

              <div className="relative h-44 overflow-hidden rounded-[1.35rem] border border-border/60 shadow-[0_18px_40px_-28px_rgba(79,70,229,0.55)] sm:h-52">
                <Image
                  src="/images/clubs/fiction.png"
                  alt="Bookshelf visual"
                  fill
                  sizes="(max-width: 640px) 45vw, 220px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="relative h-44 overflow-hidden rounded-[1.35rem] border border-border/60 shadow-[0_18px_40px_-28px_rgba(245,158,11,0.55)] sm:h-52">
                <Image
                  src="/images/clubs/non-fiction.png"
                  alt="Library visual"
                  fill
                  sizes="(max-width: 640px) 45vw, 220px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y px-6 py-10 sm:py-12">
        <div className="container mx-auto grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {["Readwise", "OpenShelf", "BookNest", "EduNova", "NorthStar", "Lexora"].map(
            (brand) => (
              <div
                key={brand}
                className="rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-center text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-card hover:text-foreground hover:shadow-lg"
              >
                {brand}
              </div>
            ),
          )}
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className={sectionTitle}>
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Product features built for real library workflows
              </span>
            </h2>
            <p className={sectionCopy}>
              Purpose-built modules that help teams run operations faster with
              better visibility.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <CardContainer key={feature.title} containerClassName="h-full">
                  <CardBody className="glass-panel mesh-card h-full rounded-[1.6rem] p-5">
                    <CardItem
                      translateZ={30}
                      className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      Feature
                    </CardItem>

                    <CardItem translateZ={50} className="mb-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-[1.2rem] border border-border/60 bg-background/80 shadow-[0_18px_40px_-28px_rgba(79,70,229,0.28)]">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          quality={85}
                          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/82 px-3 py-1.5 text-xs font-medium text-primary shadow-sm backdrop-blur-md">
                          <Icon className="h-3.5 w-3.5" />
                          Preview
                        </div>
                      </div>
                    </CardItem>

                    <CardItem
                      translateZ={60}
                      className="text-lg font-semibold tracking-tight"
                    >
                      {feature.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ={40}
                      className="mt-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      {feature.description}
                    </CardItem>
                    <CardItem
                      as="div"
                      translateZ={35}
                      className="mt-5 flex items-center gap-2 text-sm font-medium text-foreground/80"
                    >
                      <span className="inline-flex h-2 w-2 rounded-full bg-primary" />
                      Explore workflow
                    </CardItem>
                  </CardBody>
                </CardContainer>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto">
          <div className={`${panelClass} px-6 py-10 sm:px-8 sm:py-12 md:px-10`}>
            <div className={panelOverlay} />
            <div className="relative mx-auto mb-10 max-w-2xl text-center">
              <h2 className={sectionTitle}>Simple, Transparent Pricing</h2>
              <p className={sectionCopy}>
                Choose a plan that works best for your team. No hidden fees.
              </p>
            </div>

            <div className="relative grid gap-0 md:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative p-6 sm:p-7 ${plan.featured ? "bg-primary/8 md:border-x md:border-border/70" : "bg-transparent"} ${!plan.featured ? "md:border-r md:border-border/70 last:md:border-r-0" : ""}`}
                >
                  {plan.featured ? (
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                  ) : null}
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <h3 className="text-3xl font-semibold tracking-tight">{plan.name}</h3>
                    {plan.featured ? (
                      <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                        Popular
                      </span>
                    ) : null}
                  </div>

                  <p className="text-sm text-muted-foreground">{plan.description}</p>

                  <p className="mt-5">
                    <span className="text-5xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-muted-foreground">{plan.period}</span>
                  </p>

                  <Button
                    asChild
                    className="mt-7 w-full rounded-full"
                    variant={plan.featured ? "secondary" : "outline"}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>

                  <ul className="mt-7 space-y-3">
                    {plan.core.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-sm text-foreground/85"
                      >
                        <Check className="h-4 w-4 text-muted-foreground" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.extra.length > 0 ? (
                    <>
                      <div className="my-5 flex items-center gap-2 text-muted-foreground">
                        <span className="h-px flex-1 bg-border" />
                        <Plus className="h-4 w-4" />
                        <span className="h-px flex-1 bg-border" />
                      </div>

                      <ul className="space-y-3">
                        {plan.extra.map((point) => (
                          <li
                            key={point}
                            className="flex items-center gap-2.5 text-sm text-foreground"
                          >
                            <Check className="h-4 w-4 text-primary" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t px-6 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto">
          <div className={`${panelClass} px-6 py-10 sm:px-10 sm:py-14`}>
            <div className={panelOverlay} />
            <div className="relative grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12">
              <div>
                <h2 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                  <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Frequently asked questions
                  </span>
                </h2>
                <p className={sectionCopy}>
                  Everything you need to know before choosing LibraryHub.
                </p>
              </div>

              <div className="divide-y divide-border/70">
                {faqs.map((item, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={item.q}
                      className={`rounded-2xl px-3 py-4 transition-colors duration-300 ${isOpen ? "bg-background/70" : "hover:bg-background/45"}`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="flex w-full items-start gap-3 text-left"
                      >
                        <span className="mt-0.5 text-primary">
                          {isOpen ? (
                            <Minus className="h-5 w-5" />
                          ) : (
                            <Plus className="h-5 w-5" />
                          )}
                        </span>
                        <span className="text-lg font-medium">{item.q}</span>
                      </button>

                      <div
                        className={`overflow-hidden pl-8 transition-all duration-300 ${
                          isOpen ? "max-h-40 pt-2 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t px-6 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto">
          <div className={`${panelClass} px-6 py-12 sm:px-10 sm:py-16`}>
            <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
              <div>
                <h2 className="max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                  Ready to run your library with product-grade operations?
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Start your free trial and streamline catalog, borrowing, and
                  reader workflows in one place.
                </p>

                <div className="mt-7 flex items-center gap-4">
                  <AvatarGroup>
                    {people.map((person, index) => (
                      <Tooltip key={person.src}>
                        <TooltipTrigger asChild>
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                              duration: 2.4,
                              delay: index * 0.12,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <Avatar className="size-11 ring-background">
                              <AvatarImage src={person.src} alt={person.name} />
                              <AvatarFallback>U{index + 1}</AvatarFallback>
                            </Avatar>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="top" sideOffset={8}>
                          <p className="font-medium">{person.name}</p>
                          <p className="text-[11px] opacity-80">{person.role}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                      Trusted by 27,000+ readers and operators
                    </p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm backdrop-blur-sm">
                    Fast onboarding
                  </div>
                  <div className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm backdrop-blur-sm">
                    Clear member journeys
                  </div>
                </div>
              </div>

              <div className="flex justify-start lg:justify-end">
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-linear-to-r from-primary to-secondary text-primary-foreground shadow-[0_18px_45px_-20px_rgba(79,70,229,0.65)] sm:w-auto"
                >
                  <Link href="/contact">
                    Book a call <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
