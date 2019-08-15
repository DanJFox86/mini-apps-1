

class F3 extends React.Component {

  constructor(props) {
    // Equivalent to ES5's React.Component.call(this, props)
    super(props);
    this.state = {
      billingInfo: props,
      cardNumber: '',
      expireDate: '',
      cvvNumber: '',
      cardZipcode: ''
    };
    this.changeCardNumberHandler = this.changeCardNumberHandler.bind(this);
    this.changeExpireDateHandler = this.changeExpireDateHandler.bind(this);
    this.changeCvvNumberHandler = this.changeCvvNumberHandler.bind(this);
    this.changeCardZipcodeHandler = this.changeCardZipcodeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeCardNumberHandler(event) {
    this.setState({
      cardNumber: event.target.value,
    });
    // console.log(this.state.cardNumber);
  }

  changeExpireDateHandler(event) {
    this.setState({
      expireDate: event.target.value,
    });
    // console.log(this.state.expireDate);
  }

  changeCvvNumberHandler(event) {
    this.setState({
      cvvNumber: event.target.value,
    });
    // console.log(this.state.cvvNumber);
  }

  changeCardZipcodeHandler(event) {
    this.setState({
      cardZipcode: event.target.value,
    });
    // console.log(this.state.cardZipcode);
  }

  submitHandler(event) {
    // console.log(this.state);
    // send info to server
    var data = this.state;
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/purchase",
        dataType: "json",
        data: data,
        success: function (data) {
           alert(data.message);
           ReactDOM.render(<App />, document.getElementById('app'));

        },
        error: function (err) {
         alert('Got an error', err);
         console.log(err);
         ReactDOM.render(<App />, document.getElementById('app'));
        }
    });
    

  }

  render() {
    return (
    <div>
        Card #: <input type="text" 
               name="cardNumber" 
               value={this.state.cardNumber}
               onChange={this.changeCardNumberHandler} 
        />

        Expiration Date: <input type="date" 
               name="expirationDate" 
               value={this.state.expireDate}
               onChange={this.changeExpireDateHandler} 
        />
        CVV #: <input type="number" 
               name="cvvNumber" 
               value={this.state.cvvNumber}
               onChange={this.changeCvvNumberHandler} 
        />

        Billing Zipcode: <input type="number" 
               name="name" 
               value={this.state.cardZipcode}
               onChange={this.changeCardZipcodeHandler} 
        />
        <button onClick={this.submitHandler}>Purchase</button>      
    </div>
    );
  }
}

class F2 extends React.Component {

  constructor(props) {
    // console.log(props);
    // Equivalent to ES5's React.Component.call(this, props)
    super(props);
    this.state = {
      userInfo: props.userInfo,
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      phoneNumber: ''
    };
    this.changeAddress1Handler = this.changeAddress1Handler.bind(this);
    this.changeAddress2Handler = this.changeAddress2Handler.bind(this);
    this.changeCityHandler = this.changeCityHandler.bind(this);
    this.changeStateHandler = this.changeStateHandler.bind(this);
    this.changeZipcodeHandler = this.changeZipcodeHandler.bind(this);
    this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeAddress1Handler(event) {
    this.setState({
      address1: event.target.value,
    });
    // console.log(this.state.address1);
  }

  changeAddress2Handler(event) {
    this.setState({
      address2: event.target.value,
    });
    // console.log(this.state.address2);
  }

  changeCityHandler(event) {
    this.setState({
      city: event.target.value,
    });
    // console.log(this.state.city);
  }

  changeStateHandler(event) {
    this.setState({
      state: event.target.value,
    });
    // console.log(this.state.state);
  }

  changeZipcodeHandler(event) {
    this.setState({
      zipcode: event.target.value,
    });
    // console.log(this.state.zipcode);
  }

  changePhoneNumberHandler(event) {
    this.setState({
      phoneNumber: event.target.value,
    });
    // console.log(this.state.phoneNumber);
  }

  submitHandler(event) {
    // console.log(this.state);
    ReactDOM.render(<F3 info={this.state}/>, document.getElementById('app'));

  }

  render() {
    return (
    <div>
        Address1: <input type="text" 
               name="address1" 
               value={this.state.address1}
               onChange={this.changeAddress1Handler} 
        />

        Address2: <input type="text" 
               name="address2" 
               value={this.state.address2}
               onChange={this.changeAddress2Handler} 
        />
        City: <input type="city" 
               name="address2" 
               value={this.state.city}
               onChange={this.changeCityHandler} 
        />

        State: <input type="text" 
               name="name" 
               value={this.state.state}
               onChange={this.changeStateHandler} 
        />

        Zipcode: <input type="text" 
               name="name" 
               value={this.state.zipcode}
               onChange={this.changeZipcodeHandler} 
        />

        Phone#: <input type="text" 
               name="name" 
               value={this.state.phoneNumber}
               onChange={this.changePhoneNumberHandler} 
        />
        <button onClick={this.submitHandler}>Next</button>      
    </div>
    );
  }
}

class F1 extends React.Component {

  constructor(props) {
    // Equivalent to ES5's React.Component.call(this, props)
    super(props);
    this.state = {
      formControls: {
        email: '',
        name: '',
        password: ''
      }
    };
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeEmailHandler(event) {
    this.setState({
      formControls : { email: event.target.value,
                       name: this.state.formControls.name,
                       password: this.state.formControls.password}
    });
    // console.log(this.state.formControls.email);
  }

  changeUserNameHandler(event) {
    this.setState({
      formControls : { email: this.state.formControls.email,
                       name: event.target.value,
                       password: this.state.formControls.password}
    });
    // console.log(this.state.formControls.name);
  }

  changePasswordHandler(event) {
    this.setState({
      formControls : { email: this.state.formControls.email,
                       name: this.state.formControls.name,
                       password: event.target.value }
    });
    // console.log(this.state.formControls.password);
  }
  submitHandler(event) {
    // this.setState({
    //   formControls : { password: event.target.value}
    // });
    // console.log(this.state.formControls);
    ReactDOM.render(<F2 userInfo={this.state.formControls}/>, document.getElementById('app'));

  }

  render() {
    return (
    <div>
        Email: <input type="email" 
               name="email" 
               value={this.state.formControls.email}
               onChange={this.changeEmailHandler} 
        />

        Name: <input type="text" 
               name="name" 
               value={this.state.formControls.name}
               onChange={this.changeUserNameHandler} 
        />

        Password: <input type="password" 
               name="password" 
               value={this.state.formControls.password}
               onChange={this.changePasswordHandler} 
        />
        <button onClick={this.submitHandler}>Next</button>      
    </div>

    );
  } 
}

class App extends React.Component {

  constructor(props) {
    // Equivalent to ES5's React.Component.call(this, props)
    super(props);
    this.state = {
      formControls: {
        email: '',
        name: '',
        password: ''
      }
    };
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
  }

  changeEmailHandler(event) {
    this.setState({
      formControls : { email: event.target.value}
    });
    // console.log(this.state.formControls.email);
  }

  changeUserNameHandler(event) {
    this.setState({
      formControls : { name: event.target.value}
    });
    // console.log(this.state.formControls.name);
  }

  changePasswordHandler(event) {
    this.setState({
      formControls : { password: event.target.value}
    });
    // console.log(this.state.formControls.password);
  }

  render() {
    return (
      <button onClick={() => {ReactDOM.render(<F1/>, document.getElementById('app'))}}>Checkout</button>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));