import { useNavigate } from "react-router-dom";
import Dock from "../Dock/Dock";
import { Home, Newspaper } from "lucide-react";
import {
  VscGithub,
  VscMail,
} from 'react-icons/vsc';
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const dockItems = [
    {
      icon: <Home size={20} className="text-white" />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    {
      icon: <Newspaper size={20} className="text-white" />,
      label: "Blog",
      onClick: () => navigate("/blog"),
    },
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
        items={dockItems}
        panelHeight={58}
        baseItemSize={38}
        magnification={60}
      />
    </div>
  );
};

export default Footer;
