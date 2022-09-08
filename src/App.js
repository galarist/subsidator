import './App.css';
import {useState} from 'react';

function App() {
	
	const subsidies = [
		{value: '', text: 'Select a subsidy'},
		{value: 'dsp', text: 'Disability Support Pension'},
		{value: 'job', text: 'JobSeeker Payment'},
	];
	// Select for Subsidy
	let [selected, setSelected] = useState(subsidies[0].value);	
	// First Addend
	let [income, setIncome] = useState('');
	// Second Addend
	let [subsidy, setSubsidy] = useState('');

	const myIncome = Number(income)
	const mySubsidy = Number(subsidy)

	const cap = selected === 'dsp' ? 190 
				: selected === 'job' ? 256 
				: 0;

	const cent = (selected === 'job' && (myIncome > 150 && myIncome < 256)) ? 50 
				: (selected === 'job' && myIncome > 256) ? 60 
				: (selected === 'dsp' && myIncome > 190) ? 50 
				: 0;
	// Sum of Addends
	const total = myIncome + mySubsidy;

	/**
	 * 	600-190 = 410
	 * 	410 * 50 = 20500
	 * 	20500 / 100 = 205
	 * 	900 - 205 = 695
	 */

	const overCapMoney = myIncome - cap

	const rSubsidy = mySubsidy - overCapMoney * cent / 100
	// Result based on condition
	const result = income > cap ? (rSubsidy + myIncome).toFixed(2) : total

	const handleChange = event => {
		setSelected(event.target.value);
	};

	return (
		<div className="App">
			<h1><center>Subsidy Calculator</center></h1>
			<div className='container'>
				<label htmlFor="subsidy">Subsidy Type</label>
				<select id="subsidy" required defaultValue={selected} onChange={handleChange}>
					{subsidies.map(option => (
					<option key={option.value} value={option.value}>
						{option.text}
					</option>
					))}
				</select>
				<label htmlFor='minuend'>Income per Fortnight:
					<input id='minuend' onChange={event => setIncome(event.target.value)} autoComplete="off"/>
				</label>
				<label htmlFor='subtrahend'>Subsidy Income per Fortnight:
					<input id='subtrahend' onChange={event => setSubsidy(event.target.value)} autoComplete="off"/>
				</label>
				Income + Subsidy: {result}
			</div>
		</div>
	);
}

export default App;
