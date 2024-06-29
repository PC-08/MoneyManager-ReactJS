// Write your code here
import './index.css'

const TransactionItem = props => {
  const {uid, title, ammount, selectType, onDelReq} = props

  const onDeleteButnClicked = () => {
    onDelReq(uid)
  }

  let type

  if (selectType === 'INCOME') {
    type = 'Income'
  } else {
    type = 'Expenses'
  }

  return (
    <li className="t-li">
      <p className="t-para">{title}</p>
      <p className="t-para"> {`Rs ${ammount}`}</p>
      <p className="t-para">{type}</p>
      <button
        data-testid="delete"
        onClick={onDeleteButnClicked}
        className="t-btn"
        type="button"
      >
        <img
          className="del-img"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}

export default TransactionItem
