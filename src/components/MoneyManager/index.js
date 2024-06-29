import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'BALANCE',
    displayText: 'Balance',
    tid: 'balanceAmount',
    imgalt: 'balance',
    imgSrc:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
  },

  {
    optionId: 'INCOME',
    displayText: 'Income',
    imgalt: 'income',
    tid: 'incomeAmount',
    imgSrc:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
    imgalt: 'expenses',
    tid: 'expensesAmount',
    imgSrc:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    title: '',
    ammount: '',
    selectType: 'INCOME',
    transactionHistoryArray: [],
    balance: 0,
    income: 0,
    expense: 0,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onAmountChange = event => {
    this.setState({ammount: event.target.value})
  }

  onTypeChange = event => {
    this.setState({selectType: event.target.value})
  }

  onAddClick = event => {
    event.preventDefault()
    const {
      title,
      ammount,
      selectType,
      transactionHistoryArray,
      balance,
      income,
      expense,
    } = this.state

    if (title.length !== 0 && ammount.length !== 0) {
      const newTransaction = {
        id: uuidv4(),
        title,
        ammount: parseInt(ammount),
        selectType,
        balance,
        expense,
        income,
      }

      if (selectType === 'INCOME') {
        this.setState(prevState => ({
          transactionHistoryArray: [
            ...prevState.transactionHistoryArray,
            newTransaction,
          ],
          balance: parseInt(balance) + parseInt(ammount),
          income: parseInt(income) + parseInt(ammount),
          title: '',
          ammount: '',
        }))
      } else if (selectType === 'EXPENSES') {
        this.setState(prevState => ({
          transactionHistoryArray: [
            ...prevState.transactionHistoryArray,
            newTransaction,
          ],
          expense: parseInt(expense) + parseInt(ammount),
          balance: parseInt(balance) - parseInt(ammount),
        }))
      }
    }
  }

  onDelReq = uid => {
    const {transactionHistoryArray, expense, balance, income} = this.state

    const prticularTrans = transactionHistoryArray.filter(
      eachTrans => eachTrans.id === uid,
    )

    const sType = prticularTrans[0].selectType

    const sAmount = prticularTrans[0].ammount

    if (sType === 'EXPENSES') {
      const filteredArray = transactionHistoryArray.filter(
        eachTrans => eachTrans.id !== uid,
      )
      this.setState(prevState => ({
        expense: parseInt(expense) - parseInt(sAmount),
        balance: parseInt(balance) + parseInt(sAmount),
        transactionHistoryArray: filteredArray,
      }))
    } else if (sType === 'INCOME') {
      const filteredArray = transactionHistoryArray.filter(
        eachTrans => eachTrans.id !== uid,
      )
      this.setState(prevState => ({
        balance: parseInt(balance) - parseInt(sAmount),
        income: parseInt(income) - parseInt(sAmount),
        transactionHistoryArray: filteredArray,
      }))
    }
  }

  render() {
    const {
      title,
      ammount,
      selectType,
      transactionHistoryArray,
      balance,
      income,
      expense,
    } = this.state

    const bal = parseInt(income) - parseInt(expense)

    return (
      <div className="bg">
        <div className="top-card">
          <h1 className="head">Hi, Richard</h1>
          <p className="para">
            Welcome back to your <span className="span">Money Manager</span>
          </p>
        </div>
        <div className="middle-card">
          {transactionTypeOptions.map(eachType => (
            <MoneyDetails
              key={eachType.optionId}
              optionId={eachType.optionId}
              displayText={eachType.displayText}
              imgalt={eachType.imgalt}
              imgSrc={eachType.imgSrc}
              balance={bal}
              income={income}
              expense={expense}
              tid={eachType.tid}
            />
          ))}
        </div>

        <div className="end-section">
          <div className="end-1">
            <h1 className="end-sec-head">Add Transaction</h1>
            <form className="input-container">
              <label htmlFor="f-name" className="label">
                TITLE
              </label>
              <input
                onChange={this.onTitleChange}
                value={title}
                placeholder="TITLE"
                id="f-name"
                className="form-input"
                type="text"
              />

              <label htmlFor="ammount" className="label">
                AMOUNT
              </label>
              <input
                onChange={this.onAmountChange}
                value={ammount}
                placeholder="AMOUNT"
                id="ammount"
                className="form-input"
                type="text"
              />

              <label htmlFor="f-sel" className="label">
                TYPE
              </label>
              <select
                onChange={this.onTypeChange}
                id="f-sel"
                className="form-input"
              >
                <option selected id="INCOME" value="INCOME">
                  Income
                </option>
                <option id="EXPENSES" value="EXPENSES">
                  Expenses
                </option>
              </select>

              <button
                onClick={this.onAddClick}
                type="submit"
                className="form-btn"
              >
                Add
              </button>
            </form>
          </div>
          <div className="box-2">
            <h1 className="his-head">History</h1>

            <ul className="historl-ul">
              <div className="tma-con">
                <p className="his-para">Title</p>
                <p className="his-para">Amount</p>
                <p className="his-para">Type</p>
              </div>

              {transactionHistoryArray.map(eachTrans => (
                <TransactionItem
                  key={eachTrans.id}
                  uid={eachTrans.id}
                  title={eachTrans.title}
                  ammount={eachTrans.ammount}
                  selectType={eachTrans.selectType}
                  onDelReq={this.onDelReq}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
