import { useReducer } from "react";
import "./index.css";
import { type } from "@testing-library/user-event/dist/type";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

export default function App() {
  const initialState = {
    balance: 0,
    loan: 0,
    isActive: false,
  };

  function reduce(state, action) {
    switch (action.type) {
      case "open account": {
        return {
          ...state,
          balance: 500,
          isActive: true,
        };
      }
      case "deposit": {
        return {
          ...state,
          balance: state.balance + 150,
        };
      }
      case "withdraw": {
        return {
          ...state,
          balance: state.balance > 0 ? state.balance - 50 : state.balance,
        };
      }
      case "request loan": {
        return {
          ...state,
          loan: 5000,
          // balance: state.balance + 5000,
        };
      }
      case "pay loan": {
        return {
          ...state,
          loan: state.loan - state.loan,
        };
      }
      case "close account": {
        if (state.loan === 0 && state.balance === 0) {
          return {
            ...state,
            isActive: false,
          };
        }
        break;
      }
      default:
        return console.log("test");
    }
  }

  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reduce,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "open account" });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit" });
          }}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw" });
          }}
          disabled={balance === 0}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "request loan" });
          }}
          disabled={loan !== 0 || balance === 0}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "pay loan" });
          }}
          disabled={loan === Number(0)}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "close account" });
          }}
          disabled={balance !== Number(0) || loan !== Number(0) || !isActive}
        >
          {console.log(balance === Number(0) || loan === Number(0))}
          Close account
        </button>
      </p>
    </div>
  );
}
