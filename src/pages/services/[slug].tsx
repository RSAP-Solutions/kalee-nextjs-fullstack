import Link from "next/link";
import { useMemo } from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import {
  servicesContent,
  serviceSlugs,
  type ServiceContent,
  type ConsultationTier,
  type FeatureGroup,
  type PricingCard,
  type ProcessStep,
  type ServiceSlug,
} from "@/data/services";

type ServicePageProps = {
  service: ServiceContent;
  meta: {
    title: string;
    description: string;
  };
};

const SectionWrapper = ({
  children,
  bg = "bg-white",
  className,
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) => (
  <section className={cn("rounded-3xl px-4 py-16 sm:px-6 lg:px-8", bg, className)}>
    <div className="mx-auto w-full max-w-content space-y-10">{children}</div>
  </section>
);

const TitleBlock = ({
  title,
  subtitle,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) => (
  <div className={cn("space-y-4", align === "center" ? "text-center" : "text-left")}>
    <h2 className="section-title">{title}</h2>
    {subtitle ? (
      <p className="section-subtitle mx-auto">{subtitle}</p>
    ) : null}
  </div>
);

const TierCard = ({ tier }: { tier: ConsultationTier }) => (
  <div
    className={cn(
      "flex h-full flex-col rounded-2xl bg-white p-8 shadow-card transition-transform duration-200 hover:-translate-y-1",
      tier.badge ? "border-2 border-amber" : "border border-slate-100",
    )}
  >
    {tier.badge ? (
      <span className="mb-4 inline-flex w-max rounded-full bg-amber px-3 py-1 text-xs font-semibold uppercase text-navy">
        {tier.badge}
      </span>
    ) : null}
    <h3 className="text-xl font-semibold text-navy">{tier.title}</h3>
    <p className="mt-2 text-lg font-bold text-tangerine">{tier.price}</p>
    <p className="mt-3 text-sm text-slate-600">{tier.description}</p>
    {tier.highlight ? (
      <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600">
        {tier.highlight}
      </div>
    ) : null}
    {tier.features ? (
      <ul className="mt-5 space-y-2 text-sm text-slate-600">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-1 text-emerald-500">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    ) : null}
    {tier.ctaLabel ? (
      <Link
        href={tier.ctaHref ?? "/consultation-services"}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-tangerine px-5 py-3 text-sm font-semibold text-white hover:bg-amber"
      >
        {tier.ctaLabel}
      </Link>
    ) : null}
  </div>
);

const FeatureCard = ({ feature }: { feature: FeatureGroup }) => (
  <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-card">
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-navy">
        {feature.title}
      </h3>
      {feature.price ? (
        <p className="text-sm font-semibold text-tangerine">{feature.price}</p>
      ) : null}
      {feature.subtitle ? (
        <p className="text-sm text-slate-500">{feature.subtitle}</p>
      ) : null}
      {feature.description ? (
        <p className="text-sm text-slate-600">{feature.description}</p>
      ) : null}
    </div>
    {feature.items ? (
      <ul className="mt-5 space-y-2 text-sm text-slate-600">
        {feature.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 text-ocean">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ) : null}
  </div>
);

const PricingCardBlock = ({ card }: { card: PricingCard }) => (
  <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-card">
    <h3 className="text-lg font-semibold text-navy">{card.title}</h3>
    <p className="mt-2 text-xl font-bold text-tangerine">{card.price}</p>
    {card.subtitle ? (
      <p className="mt-1 text-sm font-medium text-slate-500">
        {card.subtitle}
      </p>
    ) : null}
    {card.description ? (
      <p className="mt-3 text-sm text-slate-600">{card.description}</p>
    ) : null}
    {card.features ? (
      <ul className="mt-5 space-y-2 text-sm text-slate-600">
        {card.features.map((feature) => (
          <li key={feature} className="flex gap-2">
            <span className="mt-1 text-ocean">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    ) : null}
  </div>
);

const ProcessTimeline = ({ steps }: { steps: ProcessStep[] }) => (
  <div className="grid gap-6 md:grid-cols-2">
    {steps.map((step, index) => (
      <div
        key={step.title}
        className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean/10 text-lg font-semibold text-ocean">
            {index + 1}
          </div>
          <div>
            <h3 className="text-base font-semibold text-navy">{step.title}</h3>
            {step.duration ? (
              <p className="text-xs font-semibold uppercase text-amber">
                {step.duration}
              </p>
            ) : null}
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">{step.description}</p>
      </div>
    ))}
  </div>
);

const FAQBlock = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h3 className="text-base font-semibold text-navy">{question}</h3>
    <p className="mt-3 text-sm text-slate-600">{answer}</p>
  </div>
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: serviceSlugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({
  params,
}) => {
  const slug = params?.slug as ServiceSlug;
  const service = servicesContent[slug];

  return {
    props: {
      service,
      meta: {
        title: service.metaTitle,
        description: service.metaDescription,
      },
    },
  };
};

const ServicePage = ({
  service,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const heroStats = useMemo(
    () => service.hero.stats ?? [],
    [service.hero.stats],
  );

  return (
    <div className="space-y-20 py-12 sm:py-16">
      <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10 text-center lg:text-left">
          <div className="space-y-4">
            {service.hero.badge ? (
              <span className="badge bg-white/10 text-sm font-semibold uppercase tracking-wide text-amber">
                {service.hero.badge}
              </span>
            ) : null}
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              {service.hero.title}
            </h1>
            <p className="text-lg font-semibold text-amber">
              {service.hero.subtitle}
            </p>
            <p className="max-w-3xl text-base text-white/85 lg:text-lg">
              {service.hero.description}
            </p>
          </div>

          {(service.hero.ctaPrimary || service.hero.ctaSecondary) && (
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              {service.hero.ctaPrimary ? (
                <Link
                  href={service.hero.ctaPrimary.href}
                  className="btn-primary"
                >
                  {service.hero.ctaPrimary.label}
                </Link>
              ) : null}
              {service.hero.ctaSecondary ? (
                <a
                  href={service.hero.ctaSecondary.href}
                  className="btn-secondary border-white/40 text-white hover:border-white/60"
                >
                  {service.hero.ctaSecondary.label}
                </a>
              ) : null}
            </div>
          )}

          {heroStats.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 p-6 backdrop-blur"
                >
                  <p className="text-2xl font-bold text-amber">{stat.value}</p>
                  <p className="mt-2 text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <SectionWrapper>
        <div className="space-y-6 text-left">
          <h2 className="section-title text-left">{service.intro.title}</h2>
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-5 text-base text-slate-700">
              {service.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {service.intro.highlight ? (
              <div className="rounded-2xl border border-amber/40 bg-amber/10 p-6 text-sm text-navy shadow-inner">
                <h3 className="text-lg font-semibold text-navy">
                  {service.intro.highlight.title}
                </h3>
                <p className="mt-3 text-slate-700">
                  {service.intro.highlight.description}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </SectionWrapper>

      {service.consultation ? (
        <SectionWrapper
          bg="bg-slate-50"
          className="border border-slate-100"
        >
          <TitleBlock
            title={service.consultation.title}
            subtitle={service.consultation.description}
            align="left"
          />
          {service.consultation.recommendation ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-amber">
              {service.consultation.recommendation}
            </p>
          ) : null}
          <div className="grid gap-6 lg:grid-cols-2">
            {service.consultation.tiers.map((tier) => (
              <TierCard key={tier.title} tier={tier} />
            ))}
          </div>
          {service.consultation.footer ? (
            <p className="text-sm text-slate-600">{service.consultation.footer}</p>
          ) : null}
          {service.consultation.ctaLabel ? (
            <Link
              href={service.consultation.ctaHref ?? "/consultation-services"}
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-tangerine shadow-card hover:bg-amber/20"
            >
              {service.consultation.ctaLabel}
            </Link>
          ) : null}
        </SectionWrapper>
      ) : null}

      {service.featureGroups.length ? (
        <SectionWrapper
          bg={service.consultation ? "bg-white" : "bg-slate-50"}
          className={service.consultation ? undefined : "border border-slate-100"}
        >
          <TitleBlock
            title="What We Deliver"
            subtitle="Comprehensive services tailored to your project."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {service.featureGroups.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {service.benefits?.length ? (
        <SectionWrapper bg="bg-slate-50" className="border border-slate-100">
          <TitleBlock
            title="Why Homeowners Choose Kealee"
            subtitle="Benefits that add measurable value to your project."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl bg-white p-6 shadow-card"
              >
                <h3 className="text-base font-semibold text-navy">
                  {benefit.title}
                </h3>
                {benefit.description ? (
                  <p className="mt-2 text-sm text-slate-600">
                    {benefit.description}
                  </p>
                ) : null}
                {benefit.items ? (
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {benefit.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 text-ocean">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {service.pricing ? (
        <SectionWrapper>
          <TitleBlock
            title={service.pricing.title}
            subtitle={service.pricing.description}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {service.pricing.cards.map((card) => (
              <PricingCardBlock key={card.title} card={card} />
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {service.additionalSections?.map((section) => (
        <SectionWrapper
          key={section.title}
          bg="bg-slate-50"
          className="border border-slate-100"
        >
          <TitleBlock title={section.title} subtitle={section.description} />
          <div className="grid gap-6 lg:grid-cols-2">
            {section.cards.map((card) => (
              <FeatureCard key={card.title} feature={card} />
            ))}
          </div>
        </SectionWrapper>
      ))}

      {service.process ? (
        <SectionWrapper>
          <TitleBlock
            title={service.process.title}
            subtitle={service.process.description}
          />
          <ProcessTimeline steps={service.process.steps} />
        </SectionWrapper>
      ) : null}

      {service.booking ? (
        <SectionWrapper
          bg="bg-slate-900"
          className="border border-slate-800 text-white"
        >
          <TitleBlock
            title={service.booking.title}
            subtitle={service.booking.description}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {service.booking.tiers.map((tier) => (
              <div
                key={tier.title}
        className={cn(
          "flex h-full flex-col rounded-2xl bg-white/10 p-8 backdrop-blur",
          tier.badge ? "border border-amber/60" : "border border-white/10",
        )}
              >
                {tier.badge ? (
                  <span className="mb-4 inline-flex w-max rounded-full bg-amber px-3 py-1 text-xs font-semibold uppercase text-navy">
                    {tier.badge}
                  </span>
                ) : null}
                <h3 className="text-xl font-semibold text-white">
                  {tier.title}
                </h3>
                <p className="mt-2 text-lg font-bold text-amber">{tier.price}</p>
                <p className="mt-3 text-sm text-white/80">{tier.description}</p>
                {tier.highlight ? (
                  <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100">
                    {tier.highlight}
                  </div>
                ) : null}
                {tier.ctaLabel ? (
                  <Link
                    href={tier.ctaHref ?? "/consultation-services"}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-navy hover:bg-amber"
                  >
                    {tier.ctaLabel}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      {service.faqs ? (
        <SectionWrapper>
          <TitleBlock title={service.faqs.title} />
          <div className="grid gap-6 lg:grid-cols-2">
            {service.faqs.items.map((faq) => (
              <FAQBlock
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </SectionWrapper>
      ) : null}

      <SectionWrapper
        bg="bg-gradient-to-r from-ocean via-navy to-slate-850"
        className="text-white"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            {service.cta.title}
          </h2>
          <p className="max-w-2xl text-lg text-white/85">
            {service.cta.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href={service.cta.primary.href} className="btn-primary">
              {service.cta.primary.label}
            </Link>
            {service.cta.secondary ? (
              <a
                href={service.cta.secondary.href}
                className="btn-secondary border-white/40 text-white hover:border-white/60"
              >
                {service.cta.secondary.label}
              </a>
            ) : null}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default ServicePage;
const cn = (...classes: Array<string | null | undefined | false>) =>
  classes.filter(Boolean).join(" ");
