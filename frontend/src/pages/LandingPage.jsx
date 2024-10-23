import React from "react";
import { useNavigate } from "react-router-dom";

import drivaliaLogo from "../assets/drivalia-white-logo.svg"; // Assuming the logo path is correct

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/form"); // This will navigate to the form page
  };

  return (
    <div className="min-h-screen bg-[#b4a7d6] flex flex-col items-center justify-center p-4 text-white">
      {/* Logo */}
      <img src={drivaliaLogo} alt="Drivalia Logo" className="w-48 mb-8" />

      {/* Intro Text */}
      <p className="text-center text-xs text-lg leading-relaxed mb-6 max-w-lg">
        <b>Kiitos yhteydenotostasi ja mielenkiinnostasi autoamme kohtaan!</b>
        <br />
        <br />
        Drivalia tarjoaa leasingkäytöstä poistuneita, huollettuja ja tarkistettuja laatuautoja kiinteällä, kilpailukykyisellä hinnalla. Koska myymme vain omia autojamme, emme valitettavasti voi ottaa vaihdossa nykyistä autoasi.
        <br />
        <br />
        Autamme kuitenkin mielellämme myymään autosi luotettavien yhteistyökumppaniemme kautta. Pyydämme heiltä tarjouksia autostasi, ja toimitamme ne sinulle arvioitavaksi. Saadaksemme sinulle parhaan tarjouksen, toivomme sinun täyttävän tiedot mahdollisimman tarkasti sekä lisäämään muutaman kuvan autostasi.
      </p>

      {/* Button */}
      <button
        onClick={handleStart}
        className="bg-[#C8017D] text-white px-4 py-1 rounded-md text-lg"
      >
        Aloita tästä!
      </button>
    </div>
  );
};

export default LandingPage;
