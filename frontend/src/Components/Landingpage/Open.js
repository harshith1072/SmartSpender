import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import React, { useState } from "react";
import Vector from "../../img/Vector.svg";
import Close from "../../img/close.png";
import Menu from "../../img/mobile_bar.png";
import { Link } from "react-router-dom"; // Import Link component for routing

export default function Open() {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(true);

  return (
    <div className="w-screen h-screen bg-rp-black lg:px-24 px-8">
    
    </div>
  );
}
