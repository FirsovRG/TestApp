import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './css/Registration.css'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
  addUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
    firstName
    lastName
    email
    username
    password
  }
}
`;

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length < 3) {
    errors.firstName = 'First name must be at least 3 characters'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.username) {
    errors.username = 'Required'
  } else if (!/^[A-Z0-9._%+-]/i.test(values.username)) {
    errors.username = 'Invalid'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Must be 4 characters or more'
  }
  return errors
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error }
}) => (
    <div>
      <div>
        <label>Enter your {label}</label><br />
        <input {...input} placeholder={label} type={type} style={{ backgroundColor: touched && error ? '#ffd6d6' : '', borderColor: touched && error ? '#b40101' : '' }} />
        {touched &&
          (error && <span className="errorSpan">{error}</span>)}
      </div>
    </div>
  )

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    }
  }
  registerMessage = () => {
    alert(`User is registered! \nUsername: ${this.state.username}\nPassword: ${this.state.password}`)
  }
  render() {
    const { firstName, lastName, email, username, password } = this.state;
    const { valid } = this.props
    return (
      <div className='content'>
        <div className='registrationForm' style={{ left: this.props.menuIsOpened ? '2em' : '-6.2em' }}>
          <h1>Registration</h1>
          <form onSubmit={this.registerMessage.bind(this)}>
            <div className='fields'>
              <Field
                name='firstName'
                component={renderField}
                type='text'
                placeholder='First name'
                label='First name'
                onChange={e => this.setState({ firstName: e.target.value })}
              />
              <Field
                name='lastName'
                component={renderField}
                type='text'
                placeholder='Last name'
                label='Last name'
                onChange={e => this.setState({ lastName: e.target.value })}
              />
              <Field
                name='email'
                component={renderField}
                type='text'
                placeholder='Email'
                label='Email'
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Field
                name='username'
                component={renderField}
                type='text'
                placeholder='Username'
                label='Username'
                onChange={e => this.setState({ username: e.target.value })}
              />
              <Field
                name='password'
                component={renderField}
                type='password'
                placeholder='Password'
                label='Password'
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <Mutation mutation={ADD_USER} variables={{ firstName, lastName, email, username, password }}>
              {addUser => <button type='submit' disabled={!valid} label='submit' onClick={addUser}>Submit</button>}

            </Mutation>
          </form>
        </div>
      </div>
    );
  }
}

Registration = reduxForm({
  form: 'registration',
  validate,
})(Registration);

export default connect(
  state => ({ menuIsOpened: state.menuReducer.menuIsOpened })
)(Registration);
