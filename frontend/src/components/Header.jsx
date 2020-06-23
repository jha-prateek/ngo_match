import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <h2>NGO Finder</h2>
                    <div className="links">
                        <NavLink to="/"><h4>Dashboard</h4></NavLink>
                        <NavLink to="/register"><h4>Register</h4></NavLink>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Header
