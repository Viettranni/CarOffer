import React from "react";
import { useNavigate } from "react-router-dom";
import drivaliaLogo from "../assets/drivalia-white-logo.svg";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/"); // Navigate back to the landing page
  };

  return (
    <div className="min-h-screen bg-[#b4a7d6] flex flex-col items-center justify-start p-4">
      <img
        src={drivaliaLogo}
        alt="Drivalia Logo"
        className="mx-auto mb-4 mt-8"
      />
      <h1 className="text-3xl font-bold text-white mb-4">Kiitos!</h1>
      <p className="text-center text-xs text-lg text-white leading-relaxed mb-6 max-w-lg">
        Olemme vastaanottaneet tietosi ja
        käsittelemme pyyntösi mahdollisimman pian. Voit sulkea välilehden!
      </p>
     
      
    </div>
  );
};

export default ThankYou;
