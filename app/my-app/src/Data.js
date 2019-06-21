import React from 'react'
import { connect } from 'react-redux'
import './css/Data.css'
import gql from 'graphql-tag'
import Select from 'react-select'
import { Query } from 'react-apollo'
import ApolloClient from 'apollo-boost';
import Time from './Time'

const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com'
});

const GET_CONTINENTS = gql`
{
	continents{
    code
    name
    countries {
      code
      name
      native
      phone
      currency
      languages{
        code
        name
        native
        rtl
      }
    }
  }
}
`;

class Data extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            continent: 'AF',
            country: 'AO'
        }
    }

    onContinentChange = event => {
        this.setState({ continent: event.target.value });
    };

    onCountryChange = event => {
        this.setState({ country: event.target.value });
    };

    render() {
        return (
            <div className="content">

                <Query query={GET_CONTINENTS} client={client}>
                    {({ loading, error, data }) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>{error.message}</p>;
                        const continent = data.continents.find(continent => continent.code === this.state.continent);
                        const country = continent.countries.find(country => country.code === this.state.country);
                        return (
                            <div className="dataBlock" style={{ left: this.props.menuIsOpened ? '2em' : '-6.2em' }}>
                                <h1>Data (Countries and Continents)</h1>
                                <h2>Select continent</h2>
                                <select value={this.state.continent} onChange={this.onContinentChange}>
                                    {data.continents.map(continent => (
                                        <option key={continent.code} value={continent.code}>
                                            {continent.name}
                                        </option>
                                    ))}
                                </select>
                                <h2>Select country</h2>
                                <select value={this.state.country} onChange={this.onCountryChange}>
                                    {continent.countries.map(country => (
                                        <option key={country.code} value={country.code}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                                {country && (
                                    <div className="dataOutput">
                                        <h4>{country.name}</h4>
                                        <span>Native: {country.native}</span>
                                        <span>Phone: {country.phone}</span>
                                        <span>Currency: {country.currency}</span>
                                        <span>Languages: {country.languages.map(language => language.native + ' ')}</span>
                                    </div>)}
                                <Time />

                            </div>
                        );
                    }}
                </Query>

            </div>


        )
    }
}



export default connect(
    state => ({ menuIsOpened: state.menuReducer.menuIsOpened })
)(Data);