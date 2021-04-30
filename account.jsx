const ATMDeposit = ({ onChange }) =>{
    return (
        <label className="lebel-huge">
            DEPOSIT:
            <input type="number" onchange={onChange}></input> 
            {/* ^where we enter number */}
            <input type="submit"></input>
        </label>
    );
};

const Account = () => {
    const [accountState, setAccountState] = React.useState(0);
    const handleChange = (e) => {
        setAccountState (e.target.value);
        console.log(`handleChange ${e.target.value}`)
    };
    const handleSubmit = (e) => {
        alert(`Account total =${accountState}`);
        // this is present deposit we have
        e.preventDefault();
    };
    return (
    <form onSubmit={handleSubmit}>
        <h2>Account Balance {accountState}</h2>
        <ATMDeposit onChange={handleChange}>Deposit</ATMDeposit>
    </form>
    );
};

ReactDOM.render(
    <ATMDeposit/>,
    document.getElementById('root')
  );
  