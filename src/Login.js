import React, { useState } from 'react'
import { Redirect } from 'react-router'
import "./login.css"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isAuthenticated, setAuthenticated] = useState(false)
    const [loginstatus, setLoginStatus] = useState("")

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault()
        const loginUrl = "https://xebiascart.herokuapp.com/users?username=" + username;
        fetch(loginUrl).then(resp => resp.json())
            .then(data => {
                setLoginStatus(data[0].fullName)
                localStorage.setItem("username", data[0].fullName)
                setAuthenticated(true)
            })
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <p><input type="text"
                    name="login"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Username"></input></p>
                <p><input type="password" name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"></input></p>
                <p className="submit">
                    <input type="submit" disabled={!validateForm()} name="commit" value="Login" /></p>
            </form>
            {JSON.stringify(loginstatus)}
            {isAuthenticated ? (
                <Redirect to={{ pathname: "/products", state: { username: loginstatus } }} />) : (<Redirect to="/" />)}
        </div>
    )
}

export default Login
