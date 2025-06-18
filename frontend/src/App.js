import { SignInButton, SignOutButton, SignedOut, useUser,RedirectToSignIn } from '@clerk/clerk-react';
import React, { useMemo, useState } from 'react';
import styled from "styled-components";
import Dashboard from './Components/Dashboard/Dashboard';
import Expenses from './Components/Expenses/Expenses';
import Income from './Components/Income/Income';
import Open from './Components/Landingpage/Open.js';
import Navigation from './Components/Navigation/Navigation';
import Transactions from './Components/Transactions/Transactions';
import Orb from './Components/Orb/Orb';
import { useGlobalContext } from './context/globalContext';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
function App() {
  const [active, setActive] = useState(1)
  const { user, isSignedIn } = useUser();
  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Transactions />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])

  if (isSignedIn) {
    return (
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          {/* <SignedOut>
              <SignInButton />
              </SignedOut>
              <SignedIn>
              <UserButton />
              </SignedIn> */}
          <Navigation active={active} setActive={setActive} />
          <main>
            {displayData()}
          </main>
        </MainLayout>

      </AppStyled>
    );
  }
  else {
    return (
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    )
  }

}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
 `;

export default App;
