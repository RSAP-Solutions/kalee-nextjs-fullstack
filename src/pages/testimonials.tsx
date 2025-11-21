import type { NextPageWithMeta } from "./_app";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Projects Completed" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "10+", label: "Years Experience" },
  { value: "24/7", label: "Emergency Service" },
];

const testimonials = [
  {
    quote:
      "Kealee Construction transformed our outdated kitchen into a modern masterpiece. The team was professional, respectful of our home, and completed everything on schedule. We couldn't be happier with the results!",
    author: "Sarah M.",
    location: "Washington DC",
  },
  {
    quote:
      "After getting quotes from 5 contractors, Kealee offered the best value and professionalism. Our home addition looks amazing and they handled all the permits. Highly recommend!",
    author: "Michael & Jennifer T.",
    location: "Montgomery County, MD",
  },
  {
    quote:
      "When our roof started leaking during a storm, Kealee's emergency team arrived within 2 hours. They fixed it quickly and followed up with a permanent solution. True professionals!",
    author: "Robert L.",
    location: "Prince George County, MD",
  },
  {
    quote:
      "The ADA bathroom renovation they did for my mother was perfect. Wheelchair accessible, safe, and beautiful. They understood exactly what we needed.",
    author: "Patricia K.",
    location: "Northern Virginia",
  },
  {
    quote:
      "Our backyard ADU is generating great rental income and was completed on time and within budget. Kealee made the whole process easy from permits to final inspection.",
    author: "David & Lisa R.",
    location: "Baltimore, MD",
  },
  {
    quote:
      "Best contractor we've ever worked with. Clear communication, quality work, and they cleaned up every day. Our bathroom remodel exceeded our expectations!",
    author: "James W.",
    location: "Southern Maryland",
  },
  {
    quote:
      "From design to completion, Kealee Construction was amazing. Our second-story addition blends perfectly with the existing house. You can't even tell it wasn't always there.",
    author: "Amanda S.",
    location: "Washington DC",
  },
  {
    quote:
      "Transparent pricing, no surprises, excellent craftsmanship. They were patient with all our questions and changes. Our kitchen is exactly what we wanted!",
    author: "Carlos & Maria G.",
    location: "Montgomery County, MD",
  },
  {
    quote:
      "Living through a renovation can be stressful, but Kealee made it easy. Minimal disruption, clean work site, and the finished master bathroom is stunning!",
    author: "Karen H.",
    location: "Prince George County, MD",
  },
];

const TestimonialsPage: NextPageWithMeta = () => (
  <div className="space-y-16 py-12 sm:py-16">
    <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
          Client Testimonials
        </h1>
        <p className="max-w-2xl text-lg text-white/85">
          Hear from homeowners across the DMV region who trusted Kealee
          Construction with their renovations, additions, and emergency repairs.
        </p>
      </div>
    </section>

    <section className="rounded-3xl bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-8 text-center shadow-card"
            >
              <div className="text-3xl font-bold text-ocean">{stat.value}</div>
              <p className="mt-2 text-sm font-medium text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-content space-y-10">
        <div className="text-center">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real feedback from homeowners who experienced our craftsmanship and
            service.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.quote}
              className="flex h-full flex-col rounded-2xl border-l-4 border-amber bg-white p-8 shadow-card"
            >
              <div className="text-amber text-2xl tracking-widest">
                {"★★★★★"}
              </div>
              <p className="mt-4 flex-1 text-base italic text-slate-600">
                “{testimonial.quote}”
              </p>
              <footer className="mt-6">
                <p className="font-semibold text-navy">{testimonial.author}</p>
                <p className="text-sm text-slate-500">{testimonial.location}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl">
          Ready to Share Your Experience?
        </h2>
        <p className="text-lg text-white/80">
          Tell us about your project and join the homeowners who trust Kealee
          Construction with their renovations, additions, and repairs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/quote" className="btn-primary">
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className="btn-secondary border-white/40 text-white"
          >
            Contact Kealee
          </Link>
        </div>
      </div>
    </section>
  </div>
);

TestimonialsPage.meta = {
  title: "Client Testimonials & Reviews | Kealee Construction",
  description:
    "Read verified reviews from satisfied Kealee Construction clients across Washington DC, Maryland, and Virginia.",
};

export default TestimonialsPage;
