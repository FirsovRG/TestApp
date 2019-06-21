import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './css/Authorization.css'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
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
        <input {...input} placeholder={label} type={type} style={{ backgroundColor: touched && error ? '#ffd6d6' : '', borderColor: touched && error ? '#b40101' : '' }} />
        <br />{touched &&
          (error && <span className="errorSpan">{error}</span>)}
      </div>
    </div>
  )


class Authorization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this._confirm = this._confirm.bind(this);
  }

  render() {
    const { username, password } = this.state;
    const { handleSubmit, submitting } = this.props;
    return (
      <div className='contentAuth'>
        <div className='authorizationForm'>
          <h1>Authorization</h1>
          <form onSubmit={handleSubmit}>
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
            <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }} onCompleted={data => this._confirm(data)} onError={error => this._error(error)}>
              {mutation => <button type='submit' label='submit' disabled={submitting} onClick={mutation}>Submit</button>}
            </Mutation>
          </form>
        </div>
      </div>
    );
  }
  _confirm = async data => {
    alert(`Welcome, ${data.login.firstName}`)
    this.props.onUserLogin(data.login);
  }
  _error = async error => {
    alert(error.message);
  }
}



Authorization = reduxForm({
  form: 'login',
  validate,
})(Authorization);

export default connect(
  null,
  dispatch => ({
    onUserLogin: (user) => {
      dispatch({ type: 'USER_LOGIN', payload: user })
    }
  })
)(Authorization)
