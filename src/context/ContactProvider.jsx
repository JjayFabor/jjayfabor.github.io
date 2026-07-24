import { useState, useCallback, useMemo } from "react";
import { ContactContext } from "./ContactContext";
import Contact from "../components/Contact";

// Renders the Contact modal once at the app level and exposes openContact() to
// the whole tree, so triggers on any page (Bio's "Get in touch", the Footer's
// "Email" button) all open the same modal.
export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openContact = useCallback(() => setOpen(true), []);
  const closeContact = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactContext.Provider value={value}>
      {children}
      <Contact open={open} onClose={closeContact} />
    </ContactContext.Provider>
  );
}
