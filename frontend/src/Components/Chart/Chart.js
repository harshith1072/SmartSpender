import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'
import { useUser } from '@clerk/clerk-react'
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()
    const {user} = useUser()
    const incomeData = incomes
        .filter(income => income.clerkUserId === user.id)
        .map(income => ({ date: new Date(income.date), amount: income.amount }));

    const expenseData = expenses
        .filter(expense => expense.clerkUserId === user.id)
        .map(expense => ({ date: new Date(expense.date), amount: expense.amount }));

    const allDates = [...new Set([...incomeData.map(inc => inc.date), ...expenseData.map(exp => exp.date)])].sort((a, b) => a - b);
    console.log(allDates);
    const data = {
        labels: allDates.map(date => dateFormat(date)),
        datasets: [
            {
                label: 'Income',
                data: allDates.map(date => {
                    const matchingIncome = incomeData.find(inc => inc.date === date);
                    return matchingIncome ? matchingIncome.amount : null;
                }),
                backgroundColor: 'rgba(0, 255, 0, 0.5)', // Green with 50% opacity
                borderColor: '#00FF00', // Green border
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: allDates.map(date => {
                    const matchingExpense = expenseData.find(exp => exp.date === date);
                    return matchingExpense ? matchingExpense.amount : null;
                }),
                backgroundColor: 'rgba(255, 0, 0, 0.5)', // Red with 50% opacity
                borderColor: '#FF0000', // Red border
                tension: 0.2
            }
        ]
    }
    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top'
            }
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display:false,
                    color: 'white'
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                display: true,
                grid: {
                    color: 'white'
                },
                ticks: {
                    color: 'white'
                }
            }
        }
    };


    return (
        <ChartStyled >
            <Line data={data} options= {options}/>
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
background: #293293C;
border-radius: 20px;
height: 100%;
`;

export default Chart