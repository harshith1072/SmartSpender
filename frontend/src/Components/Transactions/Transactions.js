import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import IncomeItem from '../IncomeItem/IncomeItem';
import { Pie } from 'react-chartjs-2'; // Import the Pie component

function Transactions() {
    const { addIncome, incomes, getIncomes, deleteIncome, expenses, getExpenses, deleteExpense } = useGlobalContext();
    const { user } = useUser();
    useEffect(() => {
        getIncomes();
        getExpenses();
        console.log("Incomes", incomes);
        console.log("Expenses", expenses);
    }, [])
    const [startDate, setStartDate] = React.useState(new Date().toISOString());
    const [endDate, setEndDate] = React.useState(new Date().toISOString());
    const generateIncomeChartData = () => {
        const labels = [];
        const data = [];
        const categoryAmounts = {};
        incomes.forEach((income) => {
            if (income.clerkUserId === user.id && income.date >= startDate && income.date <= endDate) {
                if (!categoryAmounts[income.category]) {
                    categoryAmounts[income.category] = income.amount;
                    labels.push(income.category);
                } else {
                    categoryAmounts[income.category] += income.amount;
                }
            }
        });
    
        labels.forEach((label) => {
            data.push(categoryAmounts[label]);
        });
    
        return {
            labels,
            datasets: [{
                data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 105, 180, 0.2)',
                    'rgba(218, 165, 32, 0.2)',
                    'rgba(47, 79, 79, 0.2)',
                    'rgba(100, 149, 237, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 105, 180, 1)',
                    'rgba(218, 165, 32, 1)',
                    'rgba(47, 79, 79, 1)',
                    'rgba(100, 149, 237, 1)'
                ],
                borderWidth: 1,
            }],
        };
    };
    const generateExpenseChartData = () => {
        const labels = [];
        const data = [];
        const categoryAmounts = {};
    
        expenses.forEach((expense) => {
            if (expense.clerkUserId === user.id && expense.date >= startDate && expense.date <= endDate) {
                if (!categoryAmounts[expense.category]) {
                    categoryAmounts[expense.category] = expense.amount;
                    labels.push(expense.category);
                } else {
                    categoryAmounts[expense.category] += expense.amount;
                }
            }
        });
    
        labels.forEach((label) => {
            data.push(categoryAmounts[label]);
        });
    
        return {
            labels,
            datasets: [{
                data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 105, 180, 0.2)',
                    'rgba(218, 165, 32, 0.2)',
                    'rgba(47, 79, 79, 0.2)',
                    'rgba(100, 149, 237, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 105, 180, 1)',
                    'rgba(218, 165, 32, 1)',
                    'rgba(47, 79, 79, 1)',
                    'rgba(100, 149, 237, 1)'
                ],
                borderWidth: 1,
            }],
        };
    };
    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            if (income.clerkUserId === user.id && income.date >= startDate && income.date <= endDate)
                totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) => {
            if (income.clerkUserId === user.id && income.date >= startDate && income.date <= endDate)
                totalIncome = totalIncome + income.amount
        })
        return totalIncome;
    }

    return (
        <div className='ourt' style={{ 'height': '750px', 'background-color': '#242b30' }}>
            <IncomeStyled>
                <InnerLayout>
                    <h1>All Transactions</h1>
                    <br></br>
                    <div className='searchBox' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <h2 style={{ marginRight: '10px', paddingLeft: '10px' }}>Start Date</h2>
                            <input type="date" className='searchInput' style={{ padding: '10px', borderRadius: '5px', border: '1px solid  #29323c', 'font-weight': 'bold', 'background-color': ' #29323c', 'color': 'white', 'font-size': '1.5rem' }} onChange={(ev) => setStartDate(ev.target.value)} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                            <h2 style={{ marginRight: '10px' }}>End Date</h2>
                            <input type="date" className='searchInput' style={{ padding: '10px', borderRadius: '5px', border: '1px solid  #29323c', 'font-weight': 'bold', 'background-color': ' #29323c', 'color': 'white', 'font-size': '1.5rem' }} onChange={(ev) => setEndDate(ev.target.value)} />
                        </div>
                    </div>
                    <br></br>
                    <h2 style={{ color: 'white' }}>Incomes</h2>
                    <h2 className="total-income">Total Income: <span>₹{totalIncome()}</span></h2>
                    <div className='income-section' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="incomes" style={{ flex: 1 }}>
                    {incomes.map((income) => {
                        const { _id, clerkUserId, title, amount, date, category, description, type } = income;
                        if (clerkUserId === user.id && income.date >= startDate && income.date <= endDate) {
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
                                deleteItem={deleteIncome}
                            />
                        }
                    })}
                </div>
                {/* Add the Pie component */}
                <div style={{flex: 0.5, width: '30vw', height: '30vh' }}>
                    <Pie data={generateIncomeChartData()} />
                </div>
            </div>
                </InnerLayout>
            </IncomeStyled>
            <ExpenseStyled>
                <InnerLayout>
                    <h1 style={{ color: 'white' }}>Expenses</h1>
                    <h2 className="total-income">Total Expense: <span>₹{totalExpenses()}</span></h2>
                    <div className='income-section' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="incomes" style={{ flex: 1 }}>
                    {expenses.map((income) => {
                        const { _id, clerkUserId, title, amount, date, category, description, type } = income;
                        if (clerkUserId === user.id && income.date >= startDate && income.date <= endDate) {
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
                                deleteItem={deleteIncome}
                            />
                        }
                    })}
                </div>
                {/* Add the Pie component */}
                <div style={{flex: 0.5, width: '30vw', height: '30vh' }}>
                    <Pie data={generateExpenseChartData()} />
                </div>
            </div>
                </InnerLayout>
            </ExpenseStyled>
        </div>
    )
}

const IncomeStyled = styled.div`
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
    gap: 1.5rem;
    .incomes {
      flex: 1;
    }
  }
`;

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

export default Transactions;