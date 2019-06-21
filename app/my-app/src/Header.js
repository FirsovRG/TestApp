import React from 'react'
import './css/Header.css'
import { connect } from 'react-redux'

class Header extends React.Component {
    ToggleMenu() {
        this.props.onToggleMenu();
    }

    render() {

        return (
            <header>
                <div className='header'>
                    <img style={{ backgroundColor: this.props.menuIsOpened ? '#ececec' : '' }} onClick={this.ToggleMenu.bind(this)} className='menuIcon' src={require('./images/menu.png')} />
                    <img src={require('./images/Logo.jpg')} />
                    <h1>FIRSOV ROMAN: TEST</h1>
                </div>
            </header>
        )
    }
};

export default connect(
    state => ({ menuIsOpened: state.menuReducer.menuIsOpened }),
    dispatch => ({
        onToggleMenu: () => {
            dispatch({ type: 'TOGGLE_MENU' })
        }
    })
)(Header);