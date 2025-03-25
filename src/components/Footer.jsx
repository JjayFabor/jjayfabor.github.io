import Dock from "../Dock/Dock";
import {
  VscGithub,
  VscMail,
} from 'react-icons/vsc';
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {

  // Social links as dock items
  const socialDockItems = [
    {
      icon: <VscGithub size={20} className="text-white" />,
      label: 'GitHub',
      onClick: () => window.open('https://github.com/JjayFabor', '_blank')
    },
    {
      icon: <FaLinkedin size={20} className="text-white" />,
      label: 'LinkedIn',
      onClick: () => window.open('https://www.linkedin.com/in/jjayfabor/', '_blank')
    },
    {
      icon: <VscMail size={20} className="text-white" />,
      label: 'Email',
      onClick: () => window.open('mailto:faborjaylordvhan@gmail.com', '_blank')
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex flex-col items-center">
      <Dock
        items={socialDockItems}
        panelHeight={58}
        baseItemSize={38}
        magnification={60}
      />
    </div>
  );
};

export default Footer;
