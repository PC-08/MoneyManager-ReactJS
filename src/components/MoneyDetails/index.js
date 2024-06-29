// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {
    optionId,
    displayText,
    imgalt,
    imgSrc,
    balance,
    income,
    expense,
    tid,
  } = props

  let mdclassName

  if (optionId === 'INCOME') {
    mdclassName = 'md-in'
  } else if (optionId === 'EXPENSES') {
    mdclassName = 'md-ex'
  }

  let viewEach
  let testid

  if (optionId === 'BALANCE') {
    viewEach = balance
    testid = 'balanceAmount'
    if (viewEach.length === 0) {
      viewEach = 0
    }
  } else if (optionId === 'INCOME') {
    viewEach = income
    testid = 'incomeAmount'
    if (viewEach.length === 0) {
      viewEach = 0
    }
  } else if (optionId === 'EXPENSES') {
    viewEach = expense
    testid = 'expensesAmount'
    if (viewEach.length === 0) {
      viewEach = 0
    }
  }

  return (
    <div className={`li-md ${mdclassName}`}>
      <img className="md-img" src={imgSrc} alt={imgalt} />
      <div>
        <p className="md-text">Your {displayText}</p>
        <p data-testid={tid} className="md-ammount">
          Rs {viewEach}
        </p>
      </div>
    </div>
  )
}

export default MoneyDetails
