// this is the UI users will see. They will enter the number here.
// 2.3> the isValid is added here as a prop to let the process check if what user typed is proper!
const ATMDeposit = ({ onChange, isDeposit, isValid }) => { 
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      {/* 2.3> Disable attribute block the process, JS will not run, following the isValid where 
               it's operated by setValidTransaction below setDeposit
               Also when we'd like that attb to run the function don't forget {} */}
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  // 1.1> We will have another variable to track what ATM-MODE we are operating for handleModeSelect function below
  const [ATMMode, setATMMode] = React.useState('');
  // 2.1> To prevent user from withdrawing more than they have, or number is impossible we have to set if the entered number is valid!?
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  let saving = `You should be saving $ ${totalState * 0.20} this month `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    //2.4>
    //right here we are going to check whether the user can do the transaction 
    //logic is if the event.target.value **which is entered number** is nothing (0) or less than that. The transaction is not going to happen.
    if (Number(event.target.value) <= 0){ 
      return setValidTransaction(false);
      };
    // Now, in the case of Cash-Back **which is withdrawal. 
    // We will try to block the transaction if the event.target.value **which is entered number** is greater- 
    // than what they have in totalState **which is what they have in the account by setValidTransaction(false).
    // but otherwise if the entered number is in the limit, let them proceed by setValidTransaction(True) because it's valid!
    if (ATMMode === 'Cash Back' && Number(event.target.value) > totalState){
      setValidTransaction(false);
    } else { 
      setValidTransaction(true);
    };  
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };
  // 1.3>
  // Here we are making the user choose whether they want to deposit or withdraw the money? 
  // So we make the UI conforming their needs. 
  const handleModeSelect = (event) => {
    // 1.3.1> variable ATMMode, setting by setATMMode now got the clicked valued into here.
    setATMMode(event.target.value);
    // 1.3.2> here if the choice is 'deposit', then run isDeposit adding them on line 51. other wise subtract it.
        if (event.target.value === 'Deposit') {
        setIsDeposit(true);
      } else {
        setIsDeposit(false);
      };
      console.log(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit} id="form">
      <h2 className="total">{status}</h2>
      <h5 className="saving">{saving}</h5>
      <label>Select an action below to continue</label>
         {/*  1.2> Here is the 3 possible MODE */}
          <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
              <option id="no-selection" value=""></option>
              <option id="deposit-selection" value="Deposit">Deposit</option>
              <option id="cashback-selection" value="Cash Back">Cash Back</option>
          </select>

          {/* 1.4 - 1.5> we add the consition on to the orgianl one below-
          <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>*/}
          {
          ATMMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
          }

    </form>
  );
};
// ========================================

ReactDOM.render(<Account />, document.getElementById('root'));
