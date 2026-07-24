import { createContext, useContext } from "react";

// Lightweight context so any component (e.g. the Footer, which renders on every
// page) can open the shared Contact modal. The provider lives in
// ContactProvider.jsx; keeping the hook here means consumers don't pull in the
// Contact form's dependencies. Default is a no-op so components used outside a
// provider (tests, isolated renders) don't crash.
export const ContactContext = createContext({ openContact: () => {} });

export const useContact = () => useContext(ContactContext);
