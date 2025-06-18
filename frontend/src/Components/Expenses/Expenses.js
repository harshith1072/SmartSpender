import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import { useUser } from '@clerk/clerk-react';
function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense} = useGlobalContext()
    const {user} = useUser()
    useEffect(() =>{
        getExpenses()
    }, [])
    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            if(income.clerkUserId === user.id)
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1 style ={{color :'white'}}>Expenses</h1>
                <h2 className="total-income">Total Expense: <span>₹{totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, clerkUserId,title, amount, date, category, description, type} = income;
                            console.log(income)
                            if(clerkUserId===user.id){
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />}
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #29323c; /* Dark background */
    border: 2px solid #333; /* Dark border */
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06); /* Maintain shadow */
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    color: #dfe1e6; /* Light text color for better readability */
    gap: 0.5rem;

    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green); /* Maintain green color from variable */
    }
  }

  .income-content {
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
    }
  }
`;
export default Expenses