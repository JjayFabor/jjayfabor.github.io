import { VscGithub, VscMail } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import Monogram from "./Monogram";

const socialLinks = [
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
    icon: <VscMail className="h-5 w-5" />,
    label: "Email",
    href: "mailto:contact@jjayfabor.com",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

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

          <nav aria-label="Social links">
            <ul className="flex flex-wrap items-center justify-center gap-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-4 rounded-md text-sm font-medium text-brand-accent hover:bg-brand-accent/10 hover:text-brand-accent-hover transition-colors"
                  >
                    {link.icon}
                    {link.label}
                  </a>
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
