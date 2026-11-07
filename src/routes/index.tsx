import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  Compass,
  GraduationCap,
  Landmark,
  Leaf,
  Menu,
  Microscope,
  MoveRight,
  Phone,
  X,
} from "lucide-react";

import campusAerial from "@/assets/kits-campus-aerial.webp.asset.json";
import campusBuilding from "@/assets/kits-campus-building.webp.asset.json";
import campusCourtyard from "@/assets/kits-campus-courtyard.webp.asset.json";
import libraryImage from "@/assets/kits-library.webp.asset.json";
import libraryStudents from "@/assets/kits-library-students.webp.asset.json";
import studyImage from "@/assets/kits-students-study.webp.asset.json";
import logoAsset from "@/assets/kits-logo.webp.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAdmissionEmail } from "@/lib/admissions";

const officialHome = "https://www.kitsdivili.ac.in/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KITS Divili | Kakinada Institute of Technology and Science" },
      {
        name: "description",
        content:
          "Explore engineering and technical programmes at Kakinada Institute of Technology and Science, Divili. Discover the campus and enquire about admissions.",
      },
      {
        property: "og:title",
        content: "KITS Divili | Kakinada Institute of Technology and Science",
      },
      {
        property: "og:description",
        content:
          "Explore engineering and technical programmes at Kakinada Institute of Technology and Science, Divili.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const navigation = [
  { label: "The institute", href: "#about" },
  { label: "Programmes", href: "#programmes", menu: true },
  { label: "Departments", href: "#departments" },
  { label: "Campus", href: "#campus" },
  { label: "Admissions", href: "#admissions" },
];

const programmeGroups = {
  "Undergraduate · B.Tech": [
    "Agricultural Engineering",
    "Civil Engineering",
    "Computer Science and Engineering",
    "Computer Science and Engineering (Data Science)",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
  ],
  "Diploma": [
    "Civil Engineering",
    "Computer Science and Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Mechanical Engineering",
  ],
  "Postgraduate · M.Tech": [
    "CAD/CAM",
    "Structural Engineering",
    "Communication Systems",
    "Computer Science and Technology",
    "Information Technology",
    "Power Systems and Automation",
  ],
};

const gallery = [
  { src: campusBuilding.url, alt: "KITS Divili academic building framed by palms", label: "The campus" },
  { src: studyImage.url, alt: "KITS students working together in a study hall", label: "Learning together" },
  { src: libraryImage.url, alt: "Students reading in the KITS library", label: "Library" },
  { src: campusCourtyard.url, alt: "Aerial view of the KITS campus courtyard", label: "Campus life" },
  { src: libraryStudents.url, alt: "Students browsing books at the KITS library", label: "A place to explore" },
];

function HomePage() {
  const [activeProgram, setActiveProgram] = useState<keyof typeof programmeGroups>("Undergraduate · B.Tech");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof gallery)[number] | null>(null);
  const [formMessage, setFormMessage] = useState("");

  function handleEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const enquiry = {
      name: String(values.get("name") ?? "").trim(),
      phone: String(values.get("phone") ?? "").trim(),
      programme: String(values.get("programme") ?? "").trim(),
      message: String(values.get("message") ?? "").trim(),
    };

    if (!enquiry.name || !/^\+?[\d\s()-]{8,18}$/.test(enquiry.phone) || !enquiry.programme) {
      setFormMessage("Please add your name, a valid phone number, and a programme of interest.");
      return;
    }

    setFormMessage("Your email app will open with this enquiry ready to send to the college.");
    window.location.href = createAdmissionEmail(enquiry);
  }

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <div className="border-b border-border bg-ink text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 text-xs sm:px-8">
          <p>Autonomous · Divili, Andhra Pradesh</p>
          <a className="inline-flex items-center gap-2 transition-colors hover:text-kits-gold" href="tel:+919010345695">
            <Phone aria-hidden="true" className="size-3.5" /> Admissions: +91 90103 44441
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a className="flex min-w-0 items-center gap-3" href="#top" aria-label="KITS Divili home">
            <img className="size-12 shrink-0 object-contain" src={logoAsset.url} alt="KITS crest" />
            <span className="min-w-0">
              <span className="block font-display text-[22px] leading-none text-ink">KITS <span className="text-kits-red">Divili</span></span>
              <span className="mt-1 block max-w-52 text-[9px] font-semibold uppercase leading-tight text-muted-foreground sm:text-[10px]">
                Kakinada Institute of Technology &amp; Science
              </span>
            </span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <a
                className="group inline-flex items-center gap-1 py-3 text-[13px] font-medium text-foreground/85 transition-colors hover:text-kits-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={item.href}
                key={item.label}
              >
                {item.label}
                {item.menu && <ChevronDown aria-hidden="true" className="size-3 transition-transform group-hover:rotate-180" />}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button asChild className="h-11 rounded-sm bg-kits-red px-5 text-primary-foreground shadow-none hover:bg-kits-red/90">
              <a href="#admissions">Apply / Enquire <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </div>

          <Button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            size="icon"
            variant="outline"
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-5 py-3 lg:hidden">
            {navigation.map((item) => (
              <a
                className="flex min-h-12 items-center justify-between border-b border-border text-sm font-medium"
                href={item.href}
                key={item.label}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}<ArrowRight aria-hidden="true" className="size-4 text-kits-red" />
              </a>
            ))}
            <Button asChild className="mt-4 w-full rounded-sm bg-kits-red text-primary-foreground hover:bg-kits-red/90">
              <a href="#admissions" onClick={() => setMenuOpen(false)}>Apply / Enquire <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          </nav>
        )}
      </header>

      <section className="relative isolate min-h-[690px] overflow-hidden bg-ink text-primary-foreground sm:min-h-[760px]" id="top">
        <img className="absolute inset-0 -z-20 size-full object-cover object-center" src={campusAerial.url} alt="Aerial view of the KITS Divili campus among the palms" fetchPriority="high" />
        <div className="absolute inset-0 -z-10 bg-ink/65" />
        <div className="absolute inset-y-0 left-0 -z-10 w-2 bg-kits-red" />
        <div className="mx-auto flex min-h-[690px] max-w-7xl flex-col justify-center px-7 py-16 sm:min-h-[760px] sm:px-12 lg:px-16">
          <div className="reveal-up max-w-3xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase text-primary-foreground/85">
              <span className="h-px w-10 bg-kits-gold" />
              Kakinada Institute of Technology &amp; Science · Est. 2008
            </div>
            <h1 className="max-w-3xl font-display text-6xl leading-[0.98] sm:text-7xl lg:text-8xl">
              Learning today.<br /><span className="italic text-kits-gold">Building what’s next.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-primary-foreground/90 sm:text-lg sm:leading-8">
              A home for curious minds, hands-on learning and the next generation of engineers — in Divili, Andhra Pradesh.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild className="h-12 rounded-sm bg-kits-gold px-6 font-semibold text-ink shadow-none hover:bg-kits-gold/90">
                <a href="#programmes">Explore programmes <ArrowRight aria-hidden="true" /></a>
              </Button>
              <Button asChild className="h-12 rounded-sm border-primary-foreground/60 bg-transparent px-6 text-primary-foreground shadow-none hover:bg-primary-foreground/10">
                <a href="#admissions">Enquire about admission <ArrowUpRight aria-hidden="true" /></a>
              </Button>
            </div>
          </div>
          <a className="absolute bottom-7 left-7 inline-flex items-center gap-3 text-xs font-medium text-primary-foreground/85 sm:left-12 lg:left-16" href="#about">
            <span className="grid size-9 place-items-center rounded-full border border-primary-foreground/50"><ArrowDown aria-hidden="true" className="size-4" /></span>
            Discover KITS
          </a>
          <p className="absolute bottom-9 right-7 hidden text-right text-xs text-primary-foreground/75 sm:block lg:right-16">
            Autonomous<br />Divili, Andhra Pradesh
          </p>
        </div>
      </section>

      <section aria-label="Institutional recognition" className="border-b border-border bg-paper-deep">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 py-7 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {[
            ["Autonomous", "KITS Divili"],
            ["Affiliated", "JNTU Kakinada"],
            ["Approved", "AICTE"],
            ["Accredited", "NAAC · A Grade"],
          ].map(([label, value]) => (
            <div className="flex items-center gap-4 border-b border-border py-4 last:border-b-0 sm:px-6 sm:odd:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0" key={label}>
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-kits-red/35 text-kits-red"><Landmark aria-hidden="true" className="size-4" /></span>
              <span><span className="block text-[10px] font-semibold uppercase text-muted-foreground">{label}</span><span className="mt-1 block font-display text-xl text-ink">{value}</span></span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-32" id="about">
        <div className="relative min-h-[360px] sm:min-h-[460px]">
          <img className="absolute inset-0 size-full object-cover" src={campusBuilding.url} alt="The KITS campus building, surrounded by palms" loading="lazy" />
          <div className="absolute bottom-5 left-5 max-w-xs border-l-2 border-kits-gold bg-ink/90 px-5 py-4 text-primary-foreground sm:bottom-8 sm:left-8">
            <span className="block text-xs uppercase text-primary-foreground/75">Our campus</span>
            <span className="mt-1 block font-display text-2xl">A place to find your direction.</span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <SectionKicker>About KITS</SectionKicker>
          <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[1.04] text-ink sm:text-6xl">Technical education, grounded in purpose.</h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Kakinada Institute of Technology &amp; Science, Divili, began in 2008 with a commitment to introduce young minds to technology and prepare them to meet new challenges.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            The institute’s vision is world-class quality technical education with strong ethical values, developing competent technical talent for the needs of today and tomorrow.
          </p>
          <a className="mt-8 inline-flex w-fit items-center gap-3 border-b border-kits-red pb-2 text-sm font-semibold text-ink transition-colors hover:text-kits-red" href={`${officialHome}about.html`} target="_blank" rel="noreferrer">
            Read about the institute <ArrowUpRight aria-hidden="true" className="size-4 text-kits-red" />
          </a>
        </div>
      </section>

      <section className="bg-paper-deep py-24 sm:py-28" id="programmes">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col justify-between gap-8 border-b border-border pb-9 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <SectionKicker>Find your field</SectionKicker>
              <h2 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">Programmes with purpose.</h2>
            </div>
            <a className="inline-flex items-center gap-2 text-sm font-semibold text-kits-red" href={`${officialHome}departments.html`} target="_blank" rel="noreferrer">
              Full programme details <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-border" role="tablist" aria-label="Programme level">
            {(Object.keys(programmeGroups) as (keyof typeof programmeGroups)[]).map((group) => (
              <button
                aria-selected={activeProgram === group}
                className={`relative min-h-12 border-b-2 px-1 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${activeProgram === group ? "border-kits-red font-semibold text-ink" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                id={`tab-${group}`}
                key={group}
                onClick={() => setActiveProgram(group)}
                role="tab"
                type="button"
              >
                {group}
              </button>
            ))}
          </div>
          <div aria-labelledby={`tab-${activeProgram}`} className="grid gap-x-12 md:grid-cols-2" role="tabpanel">
            {programmeGroups[activeProgram].map((programme, index) => (
              <a className="group flex min-h-[76px] items-center justify-between gap-3 border-b border-border py-4 transition-colors hover:text-kits-red" href={`${officialHome}departments.html`} key={`${programme}-${index}`} target="_blank" rel="noreferrer">
                <span className="flex min-w-0 items-center gap-4"><span className="font-display text-xl text-kits-red">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-medium sm:text-base">{programme}</span></span>
                <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-6 text-muted-foreground">
            Programmes shown are published on the official institute website. Please confirm current availability, eligibility and intake directly with the admissions office.
          </p>
        </div>
      </section>

      <section className="bg-ink py-24 text-primary-foreground sm:py-28" id="departments">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <SectionKicker light>Learn by doing</SectionKicker>
              <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Many disciplines.<br /><span className="italic text-kits-gold">One curious mind.</span></h2>
              <p className="mt-6 max-w-sm text-sm leading-7 text-primary-foreground/75">From the built environment to computing and agriculture, find the field that keeps you asking better questions.</p>
              <a className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-kits-gold" href={`${officialHome}departments.html`} target="_blank" rel="noreferrer">Explore departments <MoveRight aria-hidden="true" className="size-4" /></a>
            </div>
            <div className="grid gap-x-8 sm:grid-cols-2">
              {[
                { icon: Leaf, name: "Agricultural Engineering", descriptor: "Engineering with the land in mind" },
                { icon: Compass, name: "Civil Engineering", descriptor: "Designing the world around us" },
                { icon: Microscope, name: "Computer Science & Engineering", descriptor: "Building ideas through technology" },
                { icon: BookOpen, name: "Electronics & Communication", descriptor: "Connecting systems and people" },
                { icon: GraduationCap, name: "Electrical & Electronics", descriptor: "Powering practical possibilities" },
                { icon: Landmark, name: "Mechanical Engineering", descriptor: "Turning concepts into machines" },
              ].map(({ icon: Icon, name, descriptor }, index) => (
                <a className="group border-t border-primary-foreground/20 py-6 transition-colors hover:border-kits-gold" href={`${officialHome}departments.html`} key={name} target="_blank" rel="noreferrer">
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex items-start gap-4"><Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-kits-gold" /><span><span className="block font-display text-2xl leading-tight">{name}</span><span className="mt-2 block text-xs leading-5 text-primary-foreground/65">{descriptor}</span></span></span>
                    <span className="font-display text-xl text-primary-foreground/50">0{index + 1}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-28" id="campus">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionKicker>Life at KITS</SectionKicker>
            <h2 className="mt-4 font-display text-5xl text-ink sm:text-6xl">A campus of its own.</h2>
          </div>
          <a className="inline-flex items-center gap-2 text-sm font-semibold text-kits-red" href={`${officialHome}media.html`} target="_blank" rel="noreferrer">Visit the official gallery <ArrowUpRight aria-hidden="true" className="size-4" /></a>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {gallery.map((photo, index) => (
            <button
              aria-label={`Open photo: ${photo.label}`}
              className={`group relative block min-h-[260px] overflow-hidden bg-paper-deep text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[310px] ${index === 0 ? "lg:col-span-7 lg:row-span-2 lg:min-h-[640px]" : index === 3 ? "lg:col-span-5" : "lg:col-span-5"}`}
              key={photo.label}
              onClick={() => setSelectedPhoto(photo)}
              type="button"
            >
              <img alt={photo.alt} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" src={photo.src} loading="lazy" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-5 pt-14 text-primary-foreground">
                <span className="font-display text-2xl">{photo.label}</span><span className="grid size-9 shrink-0 place-items-center rounded-full border border-primary-foreground/70"><ArrowUpRight aria-hidden="true" className="size-4" /></span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-paper-deep py-24 sm:py-28" id="notices">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 sm:px-10 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionKicker>Stay informed</SectionKicker>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-none text-ink sm:text-6xl">The latest starts at the source.</h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">For examination schedules, academic circulars and official updates, check KITS’ notice board. Older notices are not presented here as current.</p>
          </div>
          <Button asChild className="h-12 w-fit rounded-sm bg-ink px-6 text-primary-foreground shadow-none hover:bg-ink/90">
            <a href={`${officialHome}#pills-home`} target="_blank" rel="noreferrer">Open official notices <ArrowUpRight aria-hidden="true" /></a>
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden bg-kits-red py-20 text-primary-foreground sm:py-24" id="admissions">
        <div className="absolute -right-12 -top-24 select-none font-display text-[240px] leading-none text-primary-foreground/[0.06]" aria-hidden="true">K</div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="flex flex-col justify-center">
            <SectionKicker light>Admissions enquiry</SectionKicker>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.02] sm:text-6xl">Your next chapter can start here.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-primary-foreground/85">Tell us what you’re interested in. We’ll prepare a message for the college admissions team in your email app.</p>
            <a className="mt-8 inline-flex w-fit items-center gap-3 text-sm font-medium" href="tel:+919010344441"><Phone aria-hidden="true" className="size-4" /> +91 90103 44441 <span className="text-xs text-primary-foreground/70">Admissions</span></a>
            <a className="mt-4 inline-flex w-fit items-center gap-3 text-sm font-medium" href="mailto:kitsenggcollege@gmail.com"><ArrowUpRight aria-hidden="true" className="size-4" /> kitsenggcollege@gmail.com</a>
          </div>

          <form className="grid gap-5 bg-background p-6 text-foreground sm:p-9" onSubmit={handleEnquiry}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-semibold" htmlFor="enquiry-name">Your name <span className="text-kits-red">*</span><Input autoComplete="name" id="enquiry-name" name="name" placeholder="Full name" required /></label>
              <label className="grid gap-2 text-xs font-semibold" htmlFor="enquiry-phone">Phone number <span className="text-kits-red">*</span><Input autoComplete="tel" id="enquiry-phone" inputMode="tel" name="phone" placeholder="+91" required /></label>
            </div>
            <label className="grid gap-2 text-xs font-semibold" htmlFor="enquiry-programme">Programme of interest <span className="text-kits-red">*</span>
              <select className="h-10 w-full border border-input bg-background px-3 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" id="enquiry-programme" name="programme" required defaultValue="">
                <option disabled value="">Select a programme</option>
                <option>B.Tech</option><option>Diploma</option><option>M.Tech</option><option>Still exploring</option>
              </select>
            </label>
            <label className="grid gap-2 text-xs font-semibold" htmlFor="enquiry-message">Message <span className="font-normal text-muted-foreground">(optional)</span><Textarea className="min-h-24 resize-y" id="enquiry-message" name="message" placeholder="What would you like to know?" /></label>
            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p aria-live="polite" className="max-w-sm text-xs leading-5 text-muted-foreground">{formMessage || "No message is sent until you choose to send it from your email app."}</p>
              <Button className="h-11 shrink-0 rounded-sm bg-ink px-5 text-primary-foreground shadow-none hover:bg-ink/90" type="submit">Prepare enquiry <ArrowRight aria-hidden="true" /></Button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-ink text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <a className="flex items-center gap-3" href="#top">
              <img className="size-12 object-contain" src={logoAsset.url} alt="" loading="lazy" />
              <span className="font-display text-2xl">KITS <span className="text-kits-gold">Divili</span></span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-6 text-primary-foreground/70">Kakinada Institute of Technology &amp; Science<br />Autonomous · Divili, Andhra Pradesh</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase text-kits-gold">Explore</h2>
            <div className="mt-4 grid gap-3 text-sm text-primary-foreground/80">
              <a className="hover:text-kits-gold" href="#about">About KITS</a><a className="hover:text-kits-gold" href="#programmes">Programmes</a><a className="hover:text-kits-gold" href="#campus">Campus gallery</a><a className="hover:text-kits-gold" href="#notices">Official notices</a>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase text-kits-gold">Find us</h2>
            <p className="mt-4 text-sm leading-6 text-primary-foreground/80">Tirupati (V), Divili, Peddapuram Mandal,<br />Kakinada District, Andhra Pradesh 533433</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <a className="inline-flex items-center gap-2 hover:text-kits-gold" href="tel:+919010695695"><Phone aria-hidden="true" className="size-4" /> +91 90106 95695</a>
              <a className="inline-flex items-center gap-2 hover:text-kits-gold" href="mailto:kitsenggcollege@gmail.com">Email the college <ArrowUpRight aria-hidden="true" className="size-3.5" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between sm:px-10">
            <p>© Kakinada Institute of Technology &amp; Science, Divili</p>
            <a className="inline-flex w-fit items-center gap-1 hover:text-kits-gold" href={officialHome} target="_blank" rel="noreferrer">Official college website <ArrowUpRight aria-hidden="true" className="size-3" /></a>
          </div>
        </div>
      </footer>

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/95 p-5" role="dialog" aria-modal="true" aria-label={selectedPhoto.label} onClick={() => setSelectedPhoto(null)}>
          <Button aria-label="Close photo" className="absolute right-5 top-5 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => setSelectedPhoto(null)} size="icon" variant="outline"><X aria-hidden="true" /></Button>
          <figure className="max-h-[90vh] max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <img className="max-h-[78vh] w-full object-contain" src={selectedPhoto.src} alt={selectedPhoto.alt} />
            <figcaption className="pt-4 text-center font-display text-2xl text-primary-foreground">{selectedPhoto.label}</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}

function SectionKicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
      <span className={`h-px w-8 ${light ? "bg-kits-gold" : "bg-kits-red"}`} />{children}
    </p>
  );
}