import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';
import { useUser } from '@clerk/clerk-react';
function History() {
    const {user}=useUser();
    const {incomes, expenses} = useGlobalContext();
    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => { 
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 10)
    }
    // const {transactionHistory} = useGlobalContext()
    const [...history] = transactionHistory()
    let max=4;
    return (
        <HistoryStyled>
            <h2 style={{'color' : 'white'}}>Recent History</h2>
            {
            history.map((item) =>{
                const {_id,clerkUserId,title, amount, type} = item
                if(clerkUserId === user.id && max>0){
                max=max-1;
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )}
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History