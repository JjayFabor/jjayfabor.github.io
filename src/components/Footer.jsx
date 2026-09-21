import { VscGithub, VscMail } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import { CircleHelp } from "lucide-react";
import { Link } from "react-router-dom";
import Monogram from "./Monogram";
import { useContact } from "../context/ContactContext";

const linkClass =
  "inline-flex items-center gap-2 h-11 px-4 rounded-md text-sm font-medium text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface";

const socialLinks = [
  {
    icon: <CircleHelp className="h-5 w-5" />,
    label: "FAQ",
    to: "/faq",
  },
  {
    icon: <VscGithub className="h-5 w-5" />,
    label: "GitHub",
    href: "https://github.com/JjayFabor",
  },
  {
    icon: <FaLinkedin className="h-5 w-5" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jjayfabor/",
  },
  {
    // Opens the in-page contact form. A mailto: link silently does nothing when
    // the visitor has no default mail app (e.g. webmail users), so we trigger
    // the shared Contact modal instead.
    icon: <VscMail className="h-5 w-5" />,
    label: "Email",
    action: "contact",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();
  const { openContact } = useContact();

  return (
    <footer className="bg-brand-surface border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Monogram className="w-8 h-8 rounded-lg text-lg" />
            <p className="text-sm text-brand-muted text-center sm:text-left">
              &copy; {year} Jaylord Vhan Fabor
            </p>
          </div>

          <nav aria-label="Footer links">
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className={linkClass}>
                      {link.icon}
                      {link.label}
                    </Link>
                  ) : link.href ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={openContact}
                      className={linkClass}
                    >
                      {link.icon}
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
