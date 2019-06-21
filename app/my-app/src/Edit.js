import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './css/Registration.css'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const EDIT_USER = gql`
mutation editUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
  editUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
    firstName
    lastName
    email
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
  placeholder,
  type,
  meta: { touched, error }
}) => (
    <div>
      <div>
        <label>Your {label} is:</label><br />
        <input {...input} placeholder={placeholder} type={type} style={{ backgroundColor: touched && error ? '#ffd6d6' : '', borderColor: touched && error ? '#b40101' : '' }} />
        {touched &&
          (error && <span className="errorSpan">{error}</span>)}
      </div>
    </div>
  )

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.userInfo.firstName,
      lastName: this.props.userInfo.lastName,
      email: this.props.userInfo.email,
      username: this.props.userInfo.username,
      password: this.props.userInfo.password,
    }
  }
  editMessage = () => {
    document.querySelector('button').innerText = 'SAVED';
    setTimeout(() => document.querySelector('button').innerText = 'SAVE', 3000);
  }

  componentDidMount() {
    this.props.initialize(this.state)
  }
  render() {
    const { firstName, lastName, email, username, password } = this.state;
    const { handleSubmit, valid, dirty } = this.props
    return (
      <div className='content'>
        <div className='registrationForm' style={{ left: this.props.menuIsOpened ? '2em' : '-6.2em' }}>
          <h1>Edit user data</h1>
          <form onSubmit={handleSubmit}>
            <div className='fields'>
              <Field
                name='firstName'
                component={renderField}
                type='text'
                placeholder={this.state.firstName}
                label='First name'
                onChange={e => this.setState({ firstName: e.target.value })}
              />
              <Field
                name='lastName'
                component={renderField}
                type='text'
                placeholder={this.state.lastName}
                label='Last name'
                onChange={e => this.setState({ lastName: e.target.value })}
              />
              <Field
                name='email'
                component={renderField}
                type='text'
                placeholder={this.state.email}
                label='Email'
                onChange={e => this.setState({ email: e.target.value })}
              />

            </div>
            <Mutation mutation={EDIT_USER} variables={{ firstName, lastName, email, username, password }} onCompleted={this.editMessage}>
              {editUser => <button type='submit' disabled={!valid || !dirty} label='save' onClick={editUser}>Save</button>}

            </Mutation>
          </form>
        </div>
      </div>
    );
  }
}

Edit = reduxForm({
  form: 'edit',
  validate,

})(Edit);

export default connect(
  state => ({ userInfo: state.userReducer, menuIsOpened: state.menuReducer.menuIsOpened })
)(Edit);
