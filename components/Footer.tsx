import Link from "next/link";

const footerLinks = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Support", href: "/support" },
      { label: "Mobile App", href: "/mobile-app" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#D1D5DB">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="12" rx="4" ry="4" />
        <polygon points="10 8 16 12 10 16" fill="#D1D5DB" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="#D1D5DB" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8FAFC] border-t border-[#E2E8F0]">
      <div className="w-full max-w-[1280px] mx-auto px-6 py-12">

        {/* Responsive grid: stacks on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand block — takes first column */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-[#0F172A] text-xl font-bold leading-7 w-fit"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              T-Goda
            </Link>

            <p
              className="text-[#64748B] text-sm leading-5 max-w-sm"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Making world travel accessible, affordable, and delightful
              <br className="hidden sm:block" />
              for everyone since 2024. Your journey starts here.
            </p>

            <p
              className="text-[#64748B] text-sm leading-5 pt-2"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              © 2024 T-Goda Booking. All rights reserved.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:opacity-70 transition-opacity"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — each takes one col */}
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-3">
              <span
                className="text-[#0F172A] text-sm font-bold leading-5"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {heading}
              </span>
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-[#64748B] text-sm leading-5 hover:text-[#0F172A] transition-colors w-fit"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}

        </div>
      </div>
    </footer>
  );
}