import React, { Component } from "react";
import AUTH_CONTROLS from './../../constants/formControls/auth.json';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import withRouter from "../../hoc/withRouter/withRouter";
import classes from './Auth.module.css';
import * as  actions from './../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Navigate } from 'react-router-dom';

import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls : AUTH_CONTROLS,
        formIsValid : false,
        isSignUp : true
    }

    componentDidMount () {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules){
            return isValid;
        }

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched : true
            }
        }

        this.setState({ controls : updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    witchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp : !prevState.isSignUp }
        });

    }

    render () {
        const formEleArray = [];
        for (let key in this.state.controls) {
            formEleArray.push({
                id : key,
                config : this.state.controls[key]
            });
        }

        let form = formEleArray.map(forEle => (
            <Input 
                key={forEle.id}
                elementType={forEle.config.elementType} 
                elementConfig={forEle.config.elementConfig} 
                defaultValue={forEle.config.value} 
                changed={(event) => this.inputChangedHandler(event, forEle.id)}
                invalid={!forEle.config.valid}
                shouldValidate={forEle.config.validation}
                touched={forEle.config.touched}
                />
        ))

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMsg = null;
        if(this.props.error){
            errorMsg = (
                <p>{this.props.error.message}</p>
            )
        };

        let authRedirect = null;
        if(this.props.isAuth){
            authRedirect = <Navigate to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button 
                        clicked={this.witchAuthModeHandler}
                        btnType="Danger">
                        SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuth : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath : () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Auth));