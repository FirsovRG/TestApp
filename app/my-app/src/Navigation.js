import React from 'react'
import './css/Navigation.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const anchors = ['Authorization', 'Registration', 'Edit', 'Data'];
const menuItems = anchors.map((anchor, index) => {
	return <li key={index}><Link to={`/${anchor}`}>{anchor} <img className='liIcons' src={require(`./images/${anchor}.png`)} /></Link></li>
});

class Navigation extends React.Component {
	render() {
		return this.props.menuIsOpened ?
			<div style={{ left: '0em' }} className='navigation'>
				<ul>
					{menuItems}
				</ul>
			</div>
			: <div style={{ left: '-8.2em' }} className='navigation'>
				<ul>
					{menuItems}
				</ul>
			</div>;
	}
};

function mapStateToProps(state) {
	return {
		menuIsOpened: state.menuReducer.menuIsOpened
	}
};
export default connect(mapStateToProps)(Navigation);