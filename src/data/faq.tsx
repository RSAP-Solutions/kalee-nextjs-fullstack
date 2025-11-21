import Link from "next/link";
import type { ReactNode } from "react";

export type FAQEntry = {
  question: string;
  answer: ReactNode;
};

export type FAQCategory = {
  id: string;
  title: string;
  icon?: string;
  entries: FAQEntry[];
};

const Paragraph = ({ children }: { children: ReactNode }) => (
  <p className="mt-3 text-sm text-slate-600 first:mt-0">{children}</p>
);

const BulletList = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-600">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

export const faqCategories: FAQCategory[] = [
  {
    id: "consultation",
    title: "📋 Consultation Services",
    entries: [
      {
        question: "What's included in the Tier 1 free virtual consultation?",
        answer: (
          <Paragraph>
            The Tier 1 consultation is a 15-20 minute phone or video call where
            we discuss your project scope, provide a preliminary budget range,
            offer a general timeline, and help you understand next steps. It’s
            perfect for initial exploration but intentionally limited to
            encourage booking a more comprehensive consultation for detailed
            planning.
          </Paragraph>
        ),
      },
      {
        question: "Why should I pay for a Tier 2 or Tier 3 consultation?",
        answer: (
          <>
            <Paragraph>
              <strong>Every dollar is 100% credited to your project contract.</strong>{" "}
              It’s essentially a risk-free investment. The paid consultations
              provide detailed estimates, material specifications, design
              concepts, and comprehensive planning that save you time and money
              in the long run. Plus, clients who invest in proper planning
              typically have smoother projects with fewer surprises.
            </Paragraph>
          </>
        ),
      },
      {
        question: "How does the 100% credit work?",
        answer: (
          <Paragraph>
            When you proceed with us for your construction project, we deduct
            the full amount you paid for Tier 2 or Tier 3 consultation from your
            contract total. For example, if you paid $299 for a Tier 2
            consultation and your project total is $50,000, your balance due is
            $49,701. It’s that simple.
          </Paragraph>
        ),
      },
      {
        question: "Can I upgrade from Tier 1 to Tier 2 or Tier 3?",
        answer: (
          <Paragraph>
            Absolutely! Many clients start with a free Tier 1 consultation, then
            upgrade. You’ll only pay the difference between tiers, and
            everything remains 100% creditable to your project.
          </Paragraph>
        ),
      },
      {
        question: "What's the difference between Tier 2 and Tier 3?",
        answer: (
          <Paragraph>
            Tier 2 ($199-$299) includes a site visit, measurements, and detailed
            written estimate—perfect for straightforward projects. Tier 3
            ($499-$999) adds preliminary design concepts, 3D renderings,
            detailed floor plans, complete material selections, and a
            comprehensive project roadmap—ideal for complex projects or clients
            who want to visualize everything before committing.
          </Paragraph>
        ),
      },
      {
        question: "How quickly can I get a consultation?",
        answer: (
          <Paragraph>
            Tier 1 virtual consultations can typically be scheduled within 1-2
            business days. Tier 2 site visits are usually available within 3-5
            business days. Tier 3 comprehensive packages require more time and
            are scheduled within 5-7 business days.
          </Paragraph>
        ),
      },
      {
        question: "What if I don't proceed with the project?",
        answer: (
          <Paragraph>
            You keep all the deliverables from your consultation (estimates,
            designs, plans, etc.) with no obligation to proceed. While the fee
            isn’t refundable, you’ve received valuable professional guidance and
            documentation you can use however you wish.
          </Paragraph>
        ),
      },
    ],
  },
  {
    id: "pricing",
    title: "💰 Pricing & Costs",
    entries: [
      {
        question: "How much does a typical home addition cost?",
        answer: (
          <Paragraph>
            <strong>$80-$200 per square foot</strong> depending on complexity. A
            400 sq ft addition typically costs $32,000-$80,000. Factors include
            foundation type, second story vs. ground level, number of windows,
            plumbing/electrical needs, and finish quality. Book a Tier 2
            consultation for an accurate estimate specific to your project.
          </Paragraph>
        ),
      },
      {
        question: "What's the average cost of a kitchen renovation?",
        answer: (
          <>
            <Paragraph>
              <strong>Budget-friendly:</strong> $12,000-$18,000 (cabinet
              refacing, laminate counters, basic fixtures)
            </Paragraph>
            <Paragraph>
              <strong>Mid-range:</strong> $18,000-$25,000 (new cabinets, quartz
              counters, mid-grade appliances)
            </Paragraph>
            <Paragraph>
              <strong>High-end:</strong> $25,000-$35,000+ (custom cabinets,
              premium stone, luxury appliances)
            </Paragraph>
            <Paragraph>
              Size, layout changes, and appliance selections significantly
              impact total cost. See our{" "}
              <Link
                href="/consultation-services"
                className="text-ocean underline decoration-ocean/40 hover:decoration-ocean"
              >
                Consultation Services
              </Link>{" "}
              to get your exact estimate.
            </Paragraph>
          </>
        ),
      },
      {
        question: "How much does bathroom remodeling cost?",
        answer: (
          <>
            <Paragraph>
              <strong>Powder room:</strong> $8,000-$12,000
            </Paragraph>
            <Paragraph>
              <strong>Full bathroom:</strong> $12,000-$18,000
            </Paragraph>
            <Paragraph>
              <strong>Master bathroom:</strong> $18,000-$25,000+
            </Paragraph>
            <Paragraph>
              Costs vary based on fixture quality, tile selections, whether
              you’re keeping the existing layout, and any accessibility features
              needed.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What factors affect project costs?",
        answer: (
          <>
            <Paragraph>Major cost factors include:</Paragraph>
            <BulletList
              items={[
                <>
                  <strong>Project size</strong> – Larger square footage equals
                  higher costs
                </>,
                <>
                  <strong>Material quality</strong> – Budget vs. premium
                  selections
                </>,
                <>
                  <strong>Structural changes</strong> – Wall removal, beam
                  installation adds cost
                </>,
                <>
                  <strong>Permits</strong> – Some jurisdictions charge more than
                  others
                </>,
                <>
                  <strong>Access</strong> – Difficult site access increases labor
                </>,
                <>
                  <strong>Timeline</strong> – Rush projects may cost more
                </>,
                <>
                  <strong>Current conditions</strong> – Existing damage or code
                  violations to fix
                </>,
              ]}
            />
          </>
        ),
      },
      {
        question: "Do your estimates include all costs?",
        answer: (
          <Paragraph>
            Yes! Our Tier 2 and Tier 3 consultations provide comprehensive
            estimates including labor, materials, permits, inspections, debris
            removal, and project management. We’re transparent about potential
            additional costs (like unforeseen issues found during demolition) and
            include contingency recommendations.
          </Paragraph>
        ),
      },
      {
        question: "Can you work within my budget?",
        answer: (
          <Paragraph>
            Absolutely. During consultations, we discuss your budget openly and
            provide options at different price points. We can often phase
            projects or suggest alternative materials to fit your budget while
            maintaining quality. A Tier 3 consultation is especially helpful for
            budget-conscious projects as we can explore multiple approaches.
          </Paragraph>
        ),
      },
      {
        question: "Why do some contractors quote much lower prices?",
        answer: (
          <Paragraph>
            Beware of quotes that seem too good to be true. Common red flags
            include: unlicensed contractors, estimates missing permits/
            inspections, low-quality materials, inexperienced labor, or
            incomplete scope. Our pricing is competitive AND comprehensive—you
            get quality work, proper permitting, experienced crews, and warranty
            protection.
          </Paragraph>
        ),
      },
      {
        question: "How much should I budget for unexpected costs?",
        answer: (
          <Paragraph>
            <strong>We recommend 10-15% contingency</strong> for renovation
            projects. Older homes often reveal hidden issues during demolition—
            outdated wiring, plumbing problems, structural concerns, or code
            violations. Our Tier 2 and 3 consultations include thorough
            assessments to minimize surprises.
          </Paragraph>
        ),
      },
    ],
  },
  {
    id: "timeline",
    title: "⏱️ Timeline & Process",
    entries: [
      {
        question: "How long does a typical project take?",
        answer: (
          <>
            <Paragraph>
              <strong>Kitchen renovation:</strong> 4-8 weeks
            </Paragraph>
            <Paragraph>
              <strong>Bathroom remodel:</strong> 2-4 weeks
            </Paragraph>
            <Paragraph>
              <strong>Room addition (400 sq ft):</strong> 3-4 months
            </Paragraph>
            <Paragraph>
              <strong>Second story addition:</strong> 5-6 months
            </Paragraph>
            <Paragraph>
              <strong>Whole house renovation:</strong> 3-6 months
            </Paragraph>
            <Paragraph>
              Timeline depends on project complexity, permit processing (2-6
              weeks), material availability, and weather for exterior work. Your
              consultation includes a detailed timeline.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What's your typical project process?",
        answer: (
          <>
            <Paragraph>
              <strong>1. Consultation</strong> – Book your tier and discuss
              project details
            </Paragraph>
            <Paragraph>
              <strong>2. Design & Estimate</strong> – Receive detailed plans and
              pricing (3-5 days)
            </Paragraph>
            <Paragraph>
              <strong>3. Contract & Deposits</strong> – Review contract, sign,
              pay deposit
            </Paragraph>
            <Paragraph>
              <strong>4. Permits</strong> – We handle applications and approvals
              (2-6 weeks)
            </Paragraph>
            <Paragraph>
              <strong>5. Pre-Construction</strong> – Material ordering,
              scheduling, site prep
            </Paragraph>
            <Paragraph>
              <strong>6. Construction</strong> – Build your project with regular
              updates
            </Paragraph>
            <Paragraph>
              <strong>7. Final Inspection</strong> – Quality check and final
              walkthrough
            </Paragraph>
            <Paragraph>
              <strong>8. Completion</strong> – Final payment, warranty
              documentation, enjoy!
            </Paragraph>
          </>
        ),
      },
      {
        question: "How long does permit approval take?",
        answer: (
          <Paragraph>
            <strong>2-6 weeks</strong> depending on jurisdiction and project
            complexity. Washington DC and Montgomery County typically take 4-6
            weeks. Prince George County averages 3-4 weeks. We submit permit
            applications early and can often expedite for rush projects. This is
            included in our Tier 2 and 3 consultations.
          </Paragraph>
        ),
      },
      {
        question: "What can delay a construction project?",
        answer: (
          <>
            <Paragraph>Common delays include:</Paragraph>
            <BulletList
              items={[
                "Weather (exterior work)",
                "Permit processing delays",
                "Material back-orders (especially custom items)",
                "Unforeseen structural issues uncovered during demolition",
                "Owner-requested changes",
              ]}
            />
          </>
        ),
      },
      {
        question: "How often will I receive updates?",
        answer: (
          <Paragraph>
            We provide weekly progress updates (email, phone, or text—your
            choice) and daily on-site communication with the project manager. We
            also use project management software for larger renovations where
            you can track milestones in real time.
          </Paragraph>
        ),
      },
      {
        question: "Do you pull permits or should I?",
        answer: (
          <Paragraph>
            <strong>We handle permits for every project we build.</strong> This
            ensures work meets code and protects you when selling your home.
            Owner-pulled permits make you responsible for code compliance and
            potential penalties—something we help you avoid.
          </Paragraph>
        ),
      },
      {
        question: "What if we need to pause the project?",
        answer: (
          <Paragraph>
            Sometimes pauses are required (material delays, design changes,
            emergencies). We’ll document the pause, secure the site, adjust the
            schedule, and restart as soon as possible. Extended pauses may incur
            remobilization fees, which we’ll discuss in advance.
          </Paragraph>
        ),
      },
      {
        question: "Do you offer 3D renderings or virtual tours?",
        answer: (
          <Paragraph>
            <strong>Yes, included in Tier 3 consultations!</strong> We provide 3D
            renderings so you can visualize your project before construction
            begins. This is especially valuable for additions, kitchen remodels,
            and whole house renovations.
          </Paragraph>
        ),
      },
    ],
  },
  {
    id: "services",
    title: "🛠️ Services",
    entries: [
      {
        question: "What types of projects do you specialize in?",
        answer: (
          <>
            <Paragraph>We specialize in:</Paragraph>
            <BulletList
              items={[
                "Home additions (single room, in-law suites, second stories)",
                "Kitchen and bathroom renovations",
                "Whole house renovations and major remodels",
                "ADA accessibility upgrades",
                "Exterior renovations and outdoor living spaces",
                "Tiny homes and ADU construction",
                "Energy and smart home upgrades",
                "Emergency repairs (storm, water, structural)",
              ]}
            />
          </>
        ),
      },
      {
        question: "Do you handle design or work with architects?",
        answer: (
          <Paragraph>
            We offer full design-build services. Our team handles design,
            documentation, and engineering for most residential projects. For
            complex additions or structural changes, we collaborate with trusted
            architects and engineers. We’re happy to coordinate with your design
            partners if you already have plans.
          </Paragraph>
        ),
      },
      {
        question: "Can you work with my designer or architect?",
        answer: (
          <Paragraph>
            Definitely. We frequently collaborate with outside designers,
            architects, and structural engineers. We’ll review plans together,
            provide constructability feedback, and ensure seamless coordination
            throughout the project.
          </Paragraph>
        ),
      },
      {
        question: "Do you offer turnkey services?",
        answer: (
          <Paragraph>
            Yes—design, permits, construction, finishes, final cleaning, and
            punch list are included. We handle everything from start to finish
            and keep you informed every step of the way.
          </Paragraph>
        ),
      },
      {
        question: "Do you handle small projects?",
        answer: (
          <Paragraph>
            Our specialty is mid-to-large-scale renovations and additions.
            However, we do accept smaller projects (like bathroom remodels or
            decks) when they’re part of a larger renovation plan. Reach out with
            your project details and we’ll advise on fit.
          </Paragraph>
        ),
      },
      {
        question: "Do you handle commercial projects?",
        answer: (
          <Paragraph>
            Our primary focus is residential construction. For light commercial
            TI (tenant improvement) projects, ADA upgrades, or small offices,
            we’re happy to discuss scope.
          </Paragraph>
        ),
      },
      {
        question: "Are you licensed and insured?",
        answer: (
          <Paragraph>
            Yes. We carry all required state and local licenses, general
            liability insurance, worker’s compensation, and bonding. Copies of
            certificates are provided before work begins.
          </Paragraph>
        ),
      },
    ],
  },
  {
    id: "permits",
    title: "📋 Permits & Regulations",
    entries: [
      {
        question: "Do you handle all permits and inspections?",
        answer: (
          <Paragraph>
            <strong>Yes, completely.</strong> We manage all permit applications,
            submit required plans, schedule inspections, and ensure code
            compliance. This is included in our project management—you never
            deal with building departments. We explain permit requirements during
            your consultation.
          </Paragraph>
        ),
      },
      {
        question: "What projects require permits?",
        answer: (
          <>
            <Paragraph>Generally required for:</Paragraph>
            <BulletList
              items={[
                "Any additions (room additions, second stories)",
                "Structural changes (wall removal, new openings)",
                "Major electrical work (panel upgrades, rewiring)",
                "Plumbing modifications (new fixtures, relocations)",
                "Kitchen and bathroom remodels",
                "ADU / tiny home construction",
                "Roof replacements",
                "Deck or patio construction",
              ]}
            />
            <Paragraph>
              We determine exact permit needs during your site visit.
            </Paragraph>
          </>
        ),
      },
      {
        question: "How much do permits cost?",
        answer: (
          <>
            <Paragraph>Varies by jurisdiction and project size. Typical ranges:</Paragraph>
            <BulletList
              items={[
                <>
                  <strong>Kitchen/bath renovation:</strong> $500-$1,500
                </>,
                <>
                  <strong>Room addition:</strong> $1,000-$3,000
                </>,
                <>
                  <strong>Second story addition:</strong> $2,000-$5,000
                </>,
                <>
                  <strong>Whole house renovation:</strong> $3,000-$8,000+
                </>,
              ]}
            />
            <Paragraph>
              Permit costs are included in our Tier 2 and 3 estimates.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What if my property is in a historic district?",
        answer: (
          <Paragraph>
            We have experience with historic preservation requirements.
            Projects in historic districts require additional approvals
            (Historic Preservation Commission, etc.). We guide you through this
            process, prepare required documentation, and attend hearings if
            needed. This typically adds 4-8 weeks to the timeline.
          </Paragraph>
        ),
      },
      {
        question: "Do you ensure ADA compliance?",
        answer: (
          <>
            <Paragraph>Yes! We specialize in ADA-compliant construction for:</Paragraph>
            <BulletList
              items={[
                "Commercial properties (required by law)",
                "Multi-family buildings (required for common areas)",
                "Residential accessibility modifications (voluntary but recommended)",
              ]}
            />
            <Paragraph>
              Our team knows current ADA standards for doorways, bathrooms,
              ramps, and accessibility features.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What about HOA approval?",
        answer: (
          <Paragraph>
            Many HOAs require approval for exterior changes. We’ll help prepare
            required documentation, plans, and material samples for HOA review.
            Factor in 2-6 weeks for HOA approval processes. We advise on HOA
            requirements during your consultation and can attend HOA meetings if
            needed.
          </Paragraph>
        ),
      },
      {
        question: "Can you help with zoning variances?",
        answer: (
          <Paragraph>
            If your project requires zoning variances (setback relief, lot
            coverage, height exceptions), we can coordinate with zoning
            attorneys and prepare documentation. Variance processes are complex
            and add 2-4 months to the project timeline. We assess variance needs
            during Tier 2 or 3 consultations.
          </Paragraph>
        ),
      },
    ],
  },
  {
    id: "payment",
    title: "💳 Payment & Financing",
    entries: [
      {
        question: "What payment methods do you accept?",
        answer: (
          <>
            <Paragraph>We accept:</Paragraph>
            <BulletList
              items={[
                "Checks (personal or cashier’s)",
                "Bank transfers / ACH",
                "Major credit cards (Visa, Mastercard, Amex, Discover)",
                "Financing through approved lenders",
                "Home equity loans / lines of credit",
              ]}
            />
          </>
        ),
      },
      {
        question: "What's your typical payment schedule?",
        answer: (
          <>
            <Paragraph>Standard schedule:</Paragraph>
            <BulletList
              items={[
                <>
                  <strong>Deposit:</strong> 10-25% upon contract signing
                </>,
                <>
                  <strong>Progress payments:</strong> 2-4 payments tied to
                  milestones (permits obtained, rough-in complete, drywall
                  complete)
                </>,
                <>
                  <strong>Final payment:</strong> Upon completion and your final
                  approval
                </>,
              ]}
            />
            <Paragraph>
              Never pay 100% upfront. Our payment schedule protects both parties
              and ensures quality throughout.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Do you offer financing?",
        answer: (
          <>
            <Paragraph>
              Yes! We partner with several financing companies offering:
            </Paragraph>
            <BulletList
              items={[
                "Home improvement loans (5-20 year terms)",
                "Low-interest financing options",
                "Same-as-cash promotional periods",
                "Lines of credit for ongoing projects",
              ]}
            />
            <Paragraph>
              We can also guide you on home equity loans and HELOC options.
              Visit our{" "}
              <Link
                href="/financing"
                className="text-ocean underline decoration-ocean/40 hover:decoration-ocean"
              >
                Financing page
              </Link>{" "}
              or discuss during your consultation.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Can I pay with credit card to earn rewards?",
        answer: (
          <Paragraph>
            Yes! We accept major credit cards. Many clients use credit cards for
            deposits and progress payments to earn rewards points. Note: Large
            purchases may trigger fraud alerts, so inform your card company in
            advance.
          </Paragraph>
        ),
      },
      {
        question: "Do you offer payment plans?",
        answer: (
          <Paragraph>
            For projects under $25,000, we can arrange customized payment
            schedules tied to construction milestones. For larger projects, we
            recommend exploring financing options which often provide better
            terms and tax benefits. We discuss payment options during your
            consultation.
          </Paragraph>
        ),
      },
      {
        question: "What if I need to make changes during construction?",
        answer: (
          <>
            <Paragraph>Change orders are common. When you request changes:</Paragraph>
            <BulletList
              items={[
                "We provide a written change order with cost impact",
                "You approve in writing before we proceed",
                "Timeline adjustments are documented",
                "Additional costs are added to your project balance",
              ]}
            />
            <Paragraph>
              We discuss change order procedures in your contract to avoid
              surprises.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What warranties do you provide?",
        answer: (
          <>
            <Paragraph>
              <strong>Workmanship warranty:</strong> 1-2 years on our labor
            </Paragraph>
            <Paragraph>
              <strong>Material warranties:</strong> Manufacturer warranties vary
              (appliances: 1-5 years, roofing: 15-30 years, etc.)
            </Paragraph>
            <Paragraph>
              <strong>Structural:</strong> 5-10 years on structural work
            </Paragraph>
            <Paragraph>
              All warranty terms are documented in your contract. We stand
              behind our work and address any issues promptly.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Are there any hidden fees?",
        answer: (
          <Paragraph>
            <strong>No.</strong> Our Tier 2 and 3 estimates include ALL costs:
            labor, materials, permits, inspections, debris removal, and project
            management. The only additional costs would be client-requested
            changes (change orders) or unforeseen issues discovered during
            demolition (which we’d discuss before addressing).
          </Paragraph>
        ),
      },
    ],
  },
  {
    id: "materials",
    title: "🎨 Materials & Options",
    entries: [
      {
        question: "Can I choose my own materials?",
        answer: (
          <>
            <Paragraph>
              Absolutely! We provide professional recommendations but final
              selections are yours. We can:
            </Paragraph>
            <BulletList
              items={[
                "Suggest materials in various price ranges",
                "Order through our suppliers (often at better pricing)",
                "Install client-purchased materials (with disclaimer)",
                "Visit showrooms with you",
                "Provide samples for in-home comparison",
              ]}
            />
            <Paragraph>
              Tier 3 consultations include comprehensive material selection
              assistance.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What countertop materials do you recommend?",
        answer: (
          <>
            <Paragraph>
              <strong>Quartz</strong> ($50-100/sq ft) – Most popular, durable,
              low maintenance
            </Paragraph>
            <Paragraph>
              <strong>Granite</strong> ($40-80/sq ft) – Natural stone, classic,
              requires sealing
            </Paragraph>
            <Paragraph>
              <strong>Marble</strong> ($60-150/sq ft) – Luxury appearance,
              requires maintenance
            </Paragraph>
            <Paragraph>
              <strong>Butcher Block</strong> ($30-70/sq ft) – Warm aesthetic,
              needs oiling
            </Paragraph>
            <Paragraph>
              <strong>Laminate</strong> ($20-40/sq ft) – Budget-friendly,
              improved quality
            </Paragraph>
            <Paragraph>
              We’ll guide you based on usage, budget, and aesthetic preferences.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What about flooring options?",
        answer: (
          <>
            <Paragraph>
              <strong>Hardwood</strong> – Classic, refinishable, adds value ($6-12/sq ft installed)
            </Paragraph>
            <Paragraph>
              <strong>Luxury Vinyl Plank (LVP)</strong> – Waterproof, durable,
              affordable ($4-8/sq ft)
            </Paragraph>
            <Paragraph>
              <strong>Tile</strong> – Ceramic or porcelain, great for baths/
              kitchens ($5-15/sq ft)
            </Paragraph>
            <Paragraph>
              <strong>Carpet</strong> – Comfortable for bedrooms ($3-6/sq ft
              installed)
            </Paragraph>
            <Paragraph>
              <strong>Engineered Hardwood</strong> – Stable, moisture-resistant
              ($6-10/sq ft)
            </Paragraph>
            <Paragraph>
              We’ll show samples and discuss pros/cons for your specific spaces.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Should I choose stock, semi-custom, or custom cabinets?",
        answer: (
          <>
            <Paragraph>
              <strong>Stock cabinets</strong> ($100-300/linear ft) – Standard
              sizes, quick delivery, budget-friendly
            </Paragraph>
            <Paragraph>
              <strong>Semi-custom</strong> ($150-500/linear ft) – More options,
              better quality, 6-8 week lead time
            </Paragraph>
            <Paragraph>
              <strong>Custom cabinets</strong> ($500-1,200+/linear ft) –
              Unlimited options, perfect fit, 8-12 week lead time
            </Paragraph>
            <Paragraph>
              Your choice depends on budget, timeline, and design requirements.
              We’ll help you decide during consultation.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What paint brands/quality should I use?",
        answer: (
          <>
            <Paragraph>We typically use:</Paragraph>
            <BulletList
              items={[
                <>
                  <strong>Sherwin-Williams</strong> – Duration or Emerald lines
                  for interior
                </>,
                <>
                  <strong>Benjamin Moore</strong> – Aura or Regal Select
                </>,
                <>
                  <strong>Behr Premium Plus Ultra</strong> – Budget-friendly
                  quality
                </>,
              ]}
            />
            <Paragraph>
              We recommend premium paints for durability and better coverage
              (requiring fewer coats). Color consultation included in Tier 2 and
              3 services.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Can you match existing materials for additions?",
        answer: (
          <>
            <Paragraph>Yes, this is one of our specialties. We’ll:</Paragraph>
            <BulletList
              items={[
                "Identify your current siding, roofing, trim materials",
                "Source matching or complementary options",
                "Blend old and new for seamless appearance",
                "Address discontinued materials with best alternatives",
              ]}
            />
            <Paragraph>
              Our goal is making additions look original to your home.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Do you install energy-efficient materials?",
        answer: (
          <>
            <Paragraph>Yes! We specialize in:</Paragraph>
            <BulletList
              items={[
                "Energy Star windows and doors",
                "High R-value insulation",
                "LED lighting throughout",
                "Tankless water heaters",
                "Energy-efficient HVAC systems",
                "Smart home technology",
              ]}
            />
            <Paragraph>
              Many energy upgrades qualify for tax credits—we’ll inform you of
              eligible improvements.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What appliances do you recommend?",
        answer: (
          <>
            <Paragraph>We work with all major brands:</Paragraph>
            <BulletList
              items={[
                <>
                  <strong>Budget:</strong> Whirlpool, GE, Frigidaire
                </>,
                <>
                  <strong>Mid-range:</strong> KitchenAid, Samsung, LG, Bosch
                </>,
                <>
                  <strong>Luxury:</strong> Wolf, Sub-Zero, Miele, Thermador
                </>,
              ]}
            />
            <Paragraph>
              We help coordinate delivery and handle all installation. We can
              purchase through our network or install client-purchased
              appliances.
            </Paragraph>
          </>
        ),
      },
    ],
  },
  {
    id: "living",
    title: "🏠 Living During Construction",
    entries: [
      {
        question: "Can we live in our home during renovation?",
        answer: (
          <>
            <Paragraph>It depends on scope:</Paragraph>
            <BulletList
              items={[
                <>
                  <strong>Kitchen remodel:</strong> Yes, with temporary kitchen
                  setup
                </>,
                <>
                  <strong>Bathroom remodel:</strong> Yes, if you have another
                  bathroom
                </>,
                <>
                  <strong>Addition:</strong> Yes, usually minimal disruption
                </>,
                <>
                  <strong>Whole house renovation:</strong> Difficult, many
                  clients relocate temporarily
                </>,
              ]}
            />
            <Paragraph>
              We discuss living arrangements during consultation and can phase
              work to keep key areas functional. We use dust barriers and
              maintain one bathroom/kitchen operational when possible.
            </Paragraph>
          </>
        ),
      },
      {
        question: "How do you minimize disruption?",
        answer: (
          <>
            <Paragraph>We take several measures:</Paragraph>
            <BulletList
              items={[
                "Seal off work areas with plastic sheeting",
                "Use negative air machines to control dust",
                "Daily cleanup before we leave",
                "Protect floors and existing finishes",
                "Keep noise-producing work to reasonable hours",
                "Provide portable toilets for crew (not using yours)",
                "Maintain clear paths through your home",
              ]}
            />
          </>
        ),
      },
      {
        question: "What about our belongings and furniture?",
        answer: (
          <>
            <Paragraph>Before starting:</Paragraph>
            <BulletList
              items={[
                "Remove items from work areas (or we can help)",
                "We’ll protect furniture that must stay",
                "Cover floors and carpets in traffic paths",
                "Seal HVAC vents to prevent dust circulation",
              ]}
            />
            <Paragraph>
              We provide a checklist of what to move/protect before construction
              begins.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Will we have working utilities during construction?",
        answer: (
          <>
            <Paragraph>Generally yes, with temporary interruptions:</Paragraph>
            <BulletList
              items={[
                <>
                  <strong>Water:</strong> Brief shutoffs during plumbing work
                  (scheduled in advance)
                </>,
                <>
                  <strong>Electricity:</strong> Temporary outages during
                  electrical panel work (4-6 hours)
                </>,
                <>
                  <strong>HVAC:</strong> May be off intermittently during
                  ductwork modifications
                </>,
              ]}
            />
            <Paragraph>
              We schedule utility work strategically and notify you 24-48 hours
              in advance. Overnight/weekend outages avoided when possible.
            </Paragraph>
          </>
        ),
      },
      {
        question: "How much dust should I expect?",
        answer: (
          <>
            <Paragraph>Demolition and drywall phases create the most dust. We minimize it by:</Paragraph>
            <BulletList
              items={[
                "Using dust containment systems",
                "Sealing work areas with plastic",
                "Running air filtration equipment",
                "Wet-cutting materials when possible",
                "Daily cleanup and vacuuming",
              ]}
            />
            <Paragraph>
              Expect some dust despite precautions. We recommend sealing valuable
              items and planning extra housekeeping during renovation.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What are your work hours?",
        answer: (
          <>
            <Paragraph>
              <strong>Standard hours: 7:00 AM - 5:00 PM, Monday-Friday</strong>
            </Paragraph>
            <Paragraph>
              Saturday work by arrangement only (typically finishing phases
              only)
            </Paragraph>
            <Paragraph>No Sunday work unless emergency</Paragraph>
            <Paragraph>
              We respect quiet hours and local ordinances. Some jurisdictions
              prohibit work before 7:00 AM or after 6:00 PM on weekdays.
            </Paragraph>
          </>
        ),
      },
      {
        question: "Can we make requests about scheduling?",
        answer: (
          <>
            <Paragraph>Absolutely! Common requests we accommodate:</Paragraph>
            <BulletList
              items={[
                "Start after certain time (kids’ school departure)",
                "Finish before certain time (work-from-home meetings)",
                "Avoid specific dates (holidays, events)",
                "Schedule noisy work on particular days",
              ]}
            />
            <Paragraph>
              Communication is key. Discuss any schedule constraints during your
              consultation.
            </Paragraph>
          </>
        ),
      },
      {
        question: "What about parking for construction vehicles?",
        answer: (
          <>
            <Paragraph>We typically need space for:</Paragraph>
            <BulletList
              items={[
                "Work truck (1-2 vehicles)",
                "Dumpster (usually street or driveway)",
                "Material deliveries (temporary, day-of)",
              ]}
            />
            <Paragraph>
              We’ll assess parking during the site visit and obtain street
              parking permits if needed. In tight urban areas, we coordinate
              delivery timing carefully.
            </Paragraph>
          </>
        ),
      },
    ],
  },
];
