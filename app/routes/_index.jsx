import { useState } from "react";

export const meta = () => {
  return [
    { title: "Tip Calculator" },
    { name: "description", content: "Calculate tips easily" },
  ];
};

export default function Index() {
  const [isCustom, setIsCustom] = useState(false);
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState(0);
  const [people, setPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState("0.00");
  const [totalAmount, setTotalAmount] = useState("0.00");

  const handleCustom = () => {
    setIsCustom((prev) => !prev); 
    setTipPercentage(0); 
  };

  const handleTipChange = (value) => {
    setTipPercentage(value);
    setIsCustom(false); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bill = parseFloat(billAmount);
    const peopleCount = parseInt(people, 10);
    const tipPercent = parseFloat(tipPercentage);

    if (bill > 0 && peopleCount > 0) {
      const tip = ((bill * tipPercent) / 100) / peopleCount;
      const total = (bill / peopleCount) + tip;
      setTipAmount(tip.toFixed(2));
      setTotalAmount(total.toFixed(2));
    }
  };

  const handleReset = () => {
    setBillAmount("");
    setTipPercentage(0);
    setPeople(1);
    setTipAmount("0.00");
    setTotalAmount("0.00");
    setIsCustom(false);
  };

  return (
    <div className="bg-[hsl(185,41%,84%)] min-h-screen font-mono p-4 md:p-8">
      <header className="text-center p-2">
        <h1 className="text-[hsl(183,100%,15%)] text-4xl font-bold tracking-widest">
          SPLI<br />TTER
        </h1>
      </header>
  
      <main className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto md:flex md:gap-8">
        <section className="w-full md:w-1/2 mb-6 md:mb-0">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <label htmlFor="bill-amount" className="text-[hsl(186,14%,43%)] text-sm font-semibold">
              Bill
            </label>
            <Input type="text" name="bill-amount" id="bill-amount" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
  
            <label htmlFor="tip-percentage" className="text-[hsl(186,14%,43%)] text-sm font-semibold">
              Select Tip %
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              <Tip value="5" onClick={() => handleTipChange(5)} />
              <Tip value="10" onClick={() => handleTipChange(10)} />
              <Tip value="15" onClick={() => handleTipChange(15)} />
              <Tip value="25" onClick={() => handleTipChange(25)} />
              <Tip value="50" onClick={() => handleTipChange(50)} />
  
              <div className="flex items-center justify-center w-full">
                {!isCustom ? (
                  <label
                    id="custom-label"
                    className="text-center text-xl font-semibold text-[hsl(186,14%,43%)] cursor-pointer"
                    onClick={handleCustom}
                  >
                    Custom
                  </label>
                ) : (
                  <input
                    type="text"
                    id="custom"
                    name="custom-tip"
                    className="w-full h-12 text-center text-xl font-semibold bg-[hsl(189,41%,97%)] border-none placeholder:text-[hsl(186,14%,43%)] focus:outline-none focus:ring-2 focus:ring-[hsl(172,67%,45%)] rounded-md"
                    placeholder="Custom %"
                    onBlur={() => setIsCustom(false)}
                    onChange={(e) => setTipPercentage(e.target.value)}
                    autoFocus
                  />
                )}
              </div>
            </div>
  
            <label htmlFor="number-of-people" className="text-[hsl(186,14%,43%)] text-sm font-semibold">
              Number of People
            </label>
            <Input type="text" name="number-of-people" id="number-of-people" value={people} onChange={(e) => setPeople(e.target.value)} />
  
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[hsl(183,100%,15%)] text-[hsl(189,41%,97%)] text-xl font-bold rounded-md hover:bg-[hsl(183,100%,20%)] shadow-md"
            >
              Calculate
            </button>
          </form>
        </section>
  
        <section className="flex flex-col items-center bg-[hsl(183,100%,15%)] shadow-lg rounded-md p-6 w-full md:w-1/2">
          <div className="w-full flex items-center justify-between mb-6">
            <h2 className="text-[hsl(189,41%,97%)] text-lg font-semibold">
              Tip Amount <br />
              <span className="text-sm font-normal">/ Person</span>
            </h2>
            <Amount id="tip-amount" value={tipAmount} />
          </div>
          <div className="w-full flex items-center justify-between mb-6">
            <h2 className="text-[hsl(189,41%,97%)] text-lg font-semibold">
              Total <br />
              <span className="text-sm font-normal">/ Person</span>
            </h2>
            <Amount id="total" value={totalAmount} />
          </div>
          <button
            type="button"
            id="reset"
            className="w-full py-3 bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)] text-xl font-bold rounded-md hover:bg-[hsl(172,67%,55%)] shadow-md"
            onClick={handleReset}
          >
            Reset
          </button>
        </section>
      </main>
    </div>
  );
  }

//-----------------------------Components-----------------------------------

const Tip = ({ value, onClick }) => (
  <div
    className="flex items-center justify-center w-full p-2 bg-[hsl(183,100%,15%)] rounded-md cursor-pointer hover:bg-[hsl(180,90%,31%)] hover:text-white"
    onClick={onClick}
  >
    <label className="text-[hsl(189,41%,97%)] text-xl font-bold w-full text-center cursor-pointer">
      {value}%
    </label>
  </div>
);

const Input = ({ type, name, id, value, onChange }) => (
  <div className="flex items-center justify-between gap-2 p-2 bg-[hsl(189,41%,97%)] rounded-md">
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-12 text-right text-xl font-bold bg-transparent text-[hsl(183,100%,15%)] placeholder:text-[hsl(186,14%,43%)] border-none focus:outline-none focus:ring-2 focus:ring-[hsl(172,67%,45%)] rounded-md"
      placeholder="0"
    />
  </div>
);

const Amount = ({ id, value }) => (
  <h3 id={id} className="text-[hsl(172,67%,45%)] text-3xl font-bold">
    ${value}
  </h3>
);
