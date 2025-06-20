import React, { useState } from 'react'
import styled from 'styled-components'
import avatar from '../../img/avatar.png'
import { signout } from '../../utils/Icons'
import { menuItems } from '../../utils/menuItems'
import { SignedIn, SignedOut, SignInButton, UserButton ,useUser} from "@clerk/clerk-react";
function Navigation({active, setActive}) {
    const {user}=useUser();
    return (
        <NavStyled>
         <SignedOut>
         <SignInButton />
        </SignedOut>
         <SignedIn>
        <UserButton />
         </SignedIn> 
                
        <div className="user-con">
                <div className="text">
                    <h2>Hello {user.firstName}!</h2>
                    <p>Your Money</p>
                </div>
            </div>

            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
        </NavStyled>
    )
}
 
const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 374px;
  height: 100%;
  background: #29323c; /* Dark background */
  border: 3px solid #333; /* Dark border */
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #242b30; /* Darker background for image */
      border: 2px solid #333; /* Dark border */
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06); /* Maintain shadow */
    }

    h2 {
      color: #ffd700; /* Light gold for heading */
    }

    p {
      color: #dfe1e6; /* Light text for descriptions */
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;

    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: #dfe1e6; /* Light text for menu items */
      padding-left: 1rem;
      position: relative;

      i {
        color: #f0f8ff; /* Light yellowish white for icons */
      }
    }
  }

  .active {
    color: #fff !important; /* White text for active item */

    i {
      color: #fff !important; /* White text for active item icon */
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #87CEEB; /* Accent color for active item bar */
      border-radius: 0 10px 10px 0;
    }
  }
`;


export default Navigation