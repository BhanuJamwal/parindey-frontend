import React, { Component, Fragment } from 'react';
import './Login.css';
//import strings from '../../resources/Strings';
import NavHeader from '../navbar/NavHeader';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import loginActions from '../../redux/LoginRedux';
import { connect } from 'react-redux';

const StyledTextField = withStyles((theme) => ({
    root: {
        width: 300
    }
}))(TextField)

const StyledLoginButton = withStyles({
    root: {
        margin: '20px 10px 0px 12px',
        justifyContent: 'center',
        width: 300,
        backgroundColor: '#111111',
        alignSelf: 'center',
        borderRadius: 3,
        border: 0,
        color: '#ffffff',
        height: 30,
        textTransform: 'none',
        padding: '20px 20px 20px 20px',
        '&:hover': {
            backgroundColor: '#111111',
            color: '#ffffff',
        }
    }
})(Button);

const StyledRegisterButton = withStyles({
    root: {
        margin: '20px 10px 0px 10px',
        justifyContent: 'center',
        width: 100,
        alignSelf: 'center',
        borderRadius: 3,
        border: 0,
        color: 'green',
        height: 30,
        textTransform: 'none',
        padding: '0px 0px 0px 0px',
        '&:hover': {
            backgroundColor: '#111111',
            color: '#ffffff',
        }
    }
})(Button);



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: '',
            isSaveClicked: false,
            phoneNumberError: '',
            passwordError: ''
        }
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        if (this.props.loggedInStatus === true) {
            this.props.resetIsLoggedIn()
            this.redirectToPortal()
        }
    }

    isPasswordValid(password) {
        if (password.length < 8) {
            return false;
        }
        //const validationUtils = new ValidationUtils()
        //const valid = validationUtils.isPasswordValid(password)
        return true
    }
    setPassword = (event) => {
        this.setState({
            ...this.state,
            password: event.target.value
        }, () => this.handleErrorChange(event))
    }
    setphoneNumber = (event) => {
        this.setState({
            ...this.state,
            phoneNumber: event.target.value
        }, () => this.handleErrorChange(event))
    }

    displayErrorMessage() {
        const { phoneNumber, password } = this.state;
        this.setState({ phoneNumberError: phoneNumber == '' ? 'Please Enter User Name' : '' });
        this.setState({
            passwordError: password == '' ? 'Please Enter Password' :
                !this.isPasswordValid(password) ? 'Password must contain minimum 8 characters,Upper Case Alphabets, Numbers & Special Characters' : ''
        });
    }

    redirectToPortal() {
        this.props.history.push('/')
    }

    authenticateUser = () => {
        this.setState({ isSaveClicked: true });
        const { phoneNumber, password } = this.state;
        if (phoneNumber == '' || password == '') {
            this.displayErrorMessage();
            return;
        }
        if (password.length < 8) {
            this.displayErrorMessage();
            return;
        }
        const loginData = { phoneNumber: phoneNumber, password: password }
        this.props.login(loginData)
    }

    handleErrorChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state;
        switch (name) {
            case 'phoneNumber':
                errors.phoneNumberError = value.length < 1 ? 'Please Enter User Name' : '';
                break;
            case 'password':
                errors.passwordError = value.length < 1 ? 'Please Enter Password' : '';
                //    !this.isPasswordValid(value) ? 'Password must contain minimum 8 characters, Upper Case Alphabets, Numbers & Special Characters' : '';
                break;
            default:
                break;
        }
        this.setState({ errors, [name]: value });
    }
    render() {
        return (
            <>
                <NavHeader />
                <div className="main-container-login-form" >
                    <h4 className="heading-class">Please Login To continue!</h4>
                    <div className='row px-0 mx-0'>
                        <div className="col-12 pl-0 ml-0 col-md-12 col-lg-6 col-xl-4 d-flex flex-column">
                            <span className="user-textfield-style">Phone No.*</span>
                            <StyledTextField
                                required={true}
                                variant="outlined"
                                name="phoneNumber"
                                placeholder="Enter"
                                value={this.state.phoneNumber}
                                InputProps={{
                                    classes: {
                                        input: "form-input",
                                    }
                                }}
                                onChange={this.setphoneNumber}
                                onBlur={this.handleErrorChange}
                                error={this.state.isSaveClicked && this.state.phoneNumber === '' ? true : false}
                            />
                            {this.state.isSaveClicked && this.state.phoneNumber === '' ?
                                <span className="textinput-error-text">
                                    {'Please Enter User Name'}
                                </span>
                                : null
                            }
                        </div>
                    </div>
                    <div className='row px-0 mx-0'>
                        <div className='col-12 col-md-12 col-lg-6 col-xl-4 d-flex flex-column pl-0 ml-0'>
                            <span className="user-textfield-style">Password*</span>
                            <StyledTextField
                                type="password"
                                required={true}
                                variant="outlined"
                                name="password"
                                placeholder="Enter"
                                value={this.state.password}
                                InputProps={{
                                    classes: {
                                        input: "form-input"
                                    }
                                }}
                                onChange={this.setPassword}
                                onBlur={this.handleErrorChange}
                                error={this.state.isSaveClicked && this.state['passwordError'].length > 0 ? true : false}
                            />
                            {this.state.isSaveClicked && this.state['passwordError'].length > 0 ?
                                <span className="textinput-error-text">
                                    {this.state['passwordError']}
                                </span>
                                : null
                            }
                        </div>
                    </div>
                    <StyledLoginButton variant="contained" onClick={this.authenticateUser.bind(this)}>Log In</StyledLoginButton>
                    <div className="api-errors">
                        {this.state.isSaveClicked && this.props.errorMessage !== null ?
                            <span className="textinput-error-text">
                                {this.props.errorMessage.message}
                            </span>
                            : null
                        }
                    </div>
                    <div className= "helper-text-class">
                        <li>Or Don't have an account?</li>
                        <li>to create click the link below!</li>
                    </div>
                    <StyledRegisterButton variant='text'>Register</StyledRegisterButton>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInStatus: state.login.isLoggedIn,
        errorMessage: state.login.error
    }
}

const mapDispatchToProps = (dispatch) => ({
    login: (data) => {
        dispatch(loginActions.loginRequest(data));
    },
    resetIsLoggedIn: () => {
        dispatch(loginActions.resetIsLoggedIn());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
