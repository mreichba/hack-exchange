import React from 'react';
import config from './config'
import './App.css';

class App extends React.Component {
  state = {
    rate: '',
    from: 'USD',
    to: 'EUR',
    amount: '1'
  }

  apiCall = () => {
    fetch(`https://openexchangerates.org/api/latest.json?base=${this.state.from}&symbols=${this.state.to}&app_id=19b67c9b3ccc4ff3bdfc65dde7401c2d`)
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(data => {
        console.log(this.state.rate);
        this.setState({
          rate: data.rates
        })
        console.log(this.state.rate);
      })
      .catch(error => {
        console.error({ error })
      })
  }

  setFromChange = (country) => {
    this.setState({
      from: country
    }, () => this.apiCall())

  }

  setToChange = (country) => {
    this.setState({
      to: country
    }, () => this.apiCall())
  }

  setAmount = (amount) => {
    this.setState({
      amount
    }, () => this.apiCall())
  }

  componentWillMount() {
    this.apiCall();
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>What'$ it Worth!?</h1>
          <h2>Exchange Calculator</h2>
        </header>
        <section className='exchangeBox'>
          <div className='xFrom'>
            <form>
              <label htmlFor='fromAmount'>Amount</label>
              <input
                name='fromAmount'
                id='fromAmount'
                type='number'
                placeholder='Type an amount'
                onChange={e => this.setAmount(e.target.value)}
              >
              </input>
              <br />
              <label htmlFor='fromCountry'>From</label>
              <select
                name='fromCountry'
                id='fromCountry'
                required
                defaultValue='USD'
                value={this.state.from}
                onChange={e => this.setFromChange(e.target.value)}
              >
                <option value='USD'>USD</option>
                {/* <option value='EUR'>EUR</option> */}
                {/* <option value=''>...</option> */}
              </select>

              <label htmlFor='toCountry'>To</label>
              <select
                name='toCountry'
                id='toCountry'
                required
                defaultValue='EUR'
                value={this.state.to}
                onChange={e => this.setToChange(e.target.value)}
              >
                <option value='USD'>USD</option>
                <option value='EUR'>EUR</option>
                <option value='AED'>AED</option>
                {/* <option value=''>...</option> */}
              </select>
            </form>
            <div className='answer'>
              <p> {this.state.amount} {this.state.from} = {(this.state.rate[Object.keys(this.state.rate)[0]] * this.state.amount).toFixed(3)}  {this.state.to}</p>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
