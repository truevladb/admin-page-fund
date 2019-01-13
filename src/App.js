import React, { Component } from 'react';
import './App.css';
import web3 from "./web3";
import fund from './fund';

class App extends Component {
  state = {
    message: '',
    totalSupply: '',
    totalEthPendingSubscription: '',
    totalSharesPendingRedemption: '',
    totalEthPendingWithdrawal: '',
    lastCalcDate: '',
    navPerShare: '',
    accumulatedMgmtFees: '',
    accumulatedAdminFees: '',
    lossCarryforward: '',
    minInitialSubscriptionEth: '',
    minSubscriptionEth: '',
    minRedemptionShares: '',
    adminFeeBps: '',
    mgmtFeeBps: '',
    performFeeBps: '',
    manager: '',
    exchange: '',
    allocation: ''
  };

  async componentDidMount() {
    const totalSupply = await fund.methods.totalSupply().call();
    const totalEthPendingSubscription = await fund.methods.totalEthPendingSubscription().call();
    const totalSharesPendingRedemption = await fund.methods.totalSharesPendingRedemption().call();
    const totalEthPendingWithdrawal = await fund.methods.totalEthPendingWithdrawal().call();
    const lastCalcDate = await fund.methods.lastCalcDate().call();
    const navPerShare = await fund.methods.navPerShare().call();
    const accumulatedMgmtFees = await fund.methods.accumulatedMgmtFees().call();
    const accumulatedAdminFees = await fund.methods.accumulatedAdminFees().call();
    const lossCarryforward = await fund.methods.lossCarryforward().call();
    const minInitialSubscriptionEth = await fund.methods.minInitialSubscriptionEth().call();
    const minSubscriptionEth = await fund.methods.minSubscriptionEth().call();
    const minRedemptionShares = await fund.methods.minRedemptionShares().call();
    const adminFeeBps = await fund.methods.adminFeeBps().call();
    const mgmtFeeBps = await fund.methods.mgmtFeeBps().call();
    const performFeeBps = await fund.methods.performFeeBps().call();
    const manager = await fund.methods.manager().call();
    const exchange = await fund.methods.exchange().call();

    this.setState({ totalSupply, totalEthPendingSubscription, totalSharesPendingRedemption, totalEthPendingWithdrawal, lastCalcDate, navPerShare, accumulatedMgmtFees, accumulatedAdminFees, lossCarryforward, minInitialSubscriptionEth, minSubscriptionEth, minRedemptionShares, adminFeeBps, mgmtFeeBps, performFeeBps, manager, exchange });
  }

  onSubmitModifyAllocation = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.modifyAllocation(this.state.address, this.state.allocation).send({
      from: accounts[0],
      allocation: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'Allocation changed' });
  };

  onSubmitSubscribeInvestor = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.subscribeInvestor(this.state.addressSubscribe).send({
      from: accounts[0]
    });

    this.setState({ message: 'Investor subscribed' });
  };

  onClickFillAllSubscriptionRequests = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.fillAllSubscriptionRequests().send({
      from: accounts[0]
    });

    this.setState({ message: 'All subsription requests filled' });
  };

  onSubmitRedeemInvestor = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.redeemInvestor(this.state.addressRedeem).send({
      from: accounts[0]
    });

    this.setState({ message: 'Investor redeemed' });
  };

  onClickFillAllRedemptionRequests = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.fillAllRedemptionRequests().send({
      from: accounts[0]
    });

    this.setState({ message: 'All redemption requests filled' });
  };

  onSubmitLiquidateInvestor = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.liquidateInvestor(this.state.addressLiquidate).send({
      from: accounts[0]
    });

    this.setState({ message: 'Investor liquidated' });
  };

  onClickLiquidateAllInvestors = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.liquidateAllInvestors().send({
      from: accounts[0]
    });

    this.setState({ message: 'All investors liquidated' });
  };

  onClickCalcNav = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.calcNav().send({
      from: accounts[0]
    });

    this.setState({ message: 'Success!' });
  };

  onClickWithdrawMgmtFees = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.withdrawMgmtFees().send({
      from: accounts[0]
    });

    this.setState({ message: 'Success!' });
  };

  onClickWithdrawAdminFees = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.withdrawAdminFees().send({
      from: accounts[0]
    });

    this.setState({ message: 'Success!' });
  };

  onSubmitSendToExchange = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await fund.methods.sendToExchange(this.state.amount).send({
      from: accounts[0]
    });

    this.setState({ message: 'Success!' });
  };

  render() {
    return (
      <div>
        <h2>Fund Balances</h2>
        <p>Total number of shares outstanding: {this.state.totalSupply}.</p>
        <p>Total subscription requests not yet processed by the manager: {web3.utils.fromWei(this.state.totalEthPendingSubscription, 'ether')} ether.</p>
        <p>Total redemption requests not yet processed by the manager, denominated in shares: {this.state.totalSharesPendingRedemption}</p>
        <p>Total payments not yet withdrawn by investors, denominated in shares {this.state.totalEthPendingWithdrawal}</p>

        <hr />

        <h2>Variables that are updated after each call to the calcNav function</h2>
        <p>lastCalcDate: {this.state.lastCalcDate}</p>
        <p>navPerShare: {this.state.navPerShare}</p>
        <p>accumulatedMgmtFees: {this.state.accumulatedMgmtFees}</p>
        <p>accumulatedAdminFees: {this.state.accumulatedAdminFees}</p>
        <p>lossCarryforward: {this.state.lossCarryforward}</p>

        <hr />

        <h2>Constants set at contract inception</h2>
        <p>Minimum amount of ether that a new investor can subscribe: {web3.utils.fromWei(this.state.minInitialSubscriptionEth, 'ether')} ether.</p>
        <p>Minimum amount of ether that an existing investor can subscribe: {web3.utils.fromWei(this.state.minSubscriptionEth, 'ether')} ether.</p>
        <p>Minimum amount of shares that an investor can request be redeemed: {this.state.minRedemptionShares}</p>
        <p>Annual administrative fee, if any, in basis points: {this.state.adminFeeBps}</p>
        <p>Annual base management fee, if any, in basis points: {this.state.mgmtFeeBps}</p>
        <p>Performance management fee earned on gains, in basis points: {this.state.performFeeBps}</p>
        <p>Address of the manager account allowed to withdraw base and performance management fees: {this.state.manager}</p>
        <p>Address of the exchange account where the manager conducts trading: {this.state.exchange}</p>

        <hr />

        <h2>Subscriptions</h2>

        <form onSubmit={this.onSubmitModifyAllocation}>
          <h4>Modifies the max investment limit allowed for an investor</h4>
          <div>
            <label>Address </label>
            <input
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
            />
          </div>
          <div>
            <label>Allocation, denominated in wei </label>
            <input
              value={this.state.allocation}
              onChange={event => this.setState({ allocation: event.target.value })}
            />
          </div>
          <button>Change allocation</button>
        </form>

        <form onSubmit={this.onSubmitSubscribeInvestor}>
          <h4>Fulfill one subscription request</h4>
          <div>
            <label>Address </label>
            <input
              value={this.state.addressSubscribe}
              onChange={event => this.setState({ addressSubscribe: event.target.value })}
            />
          </div>
          <button>Subscribe investor</button>
        </form>

        <h4>Fulfill all outstanding subsription requests</h4>
        <p>If there are too many investors (i.e. this process exceeds gas limits), fallback is to subscribe() each individually</p>
        <button onClick={this.onClickFillAllSubscriptionRequests}>Subscribe all</button>

        <hr />

        <h2>Redemptions</h2>

        <form onSubmit={this.onSubmitRedeemInvestor}>
          <h4>Fulfill one redemption request</h4>
          <div>
            <label>Address </label>
            <input
              value={this.state.addressRedeem}
              onChange={event => this.setState({ addressRedeem: event.target.value })}
            />
          </div>
          <button>Redeem investor</button>
        </form>

        <h4>Fulfill all outstanding redemption requests</h4>
        <button onClick={this.onClickFillAllRedemptionRequests}>Redeem all</button>

        <hr />

        <h2>Liquidations</h2>

        <form onSubmit={this.onSubmitLiquidateInvestor}>
          <h4>Converts all of an investor's shares to ether and makes it available for withdrawal</h4>
          <p>Also makes the investor's allocation zero to prevent future investment</p>
          <div>
            <label>Address </label>
            <input
              value={this.state.addressLiquidate}
              onChange={event => this.setState({ addressLiquidate: event.target.value })}
            />
          </div>
          <button>Liquidate investor</button>
        </form>

        <h4>Liquidates all investors</h4>
        <button onClick={this.onClickLiquidateAllInvestors}>Liquidate all</button>

        <hr />

        <h2>NAV calculation</h2>

        <h4>Calculate and update NAV per share, lossCarryforward (the amount of losses that the fund to make up in order to start earning performance fees), and accumulated management fee balaces.</h4>
        <button onClick={this.onClickCalcNav}>Calculate NAV</button>

        <hr />

        <h2>Fees</h2>

        <h4>Withdraw management fees from the contract</h4>
        <button onClick={this.onClickWithdrawMgmtFees}>Withdraw MgmtFees</button>
        <button onClick={this.onClickWithdrawAdminFees}>Withdraw AdminFees</button>

        <hr />

        <h2>Contract maintenance</h2>

        <form onSubmit={this.onSubmitSendToExchange}>
          <h4>Send funds to exchange</h4>
          <div>
            <label>Amount </label>
            <input
              value={this.state.amount}
              onChange={event => this.setState({ amount: event.target.value })}
            />
          </div>
          <button>Send</button>
        </form>

        <h1>{this.state.message}</h1>
      </div>
      );
    }
}

export default App;
