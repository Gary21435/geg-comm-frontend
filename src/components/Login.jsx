import { Link } from 'react-router-dom'
import { useState } from 'react';
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        
        const username = data.get("username");
        const password = data.get("password");
        const loginInfo = {
            username: username,
            password: password
        }

        loginService
            .login(loginInfo)
            .then(() => {
                // console.log("Hello,", response.data.name);
                // setToken(response.data.token);
                // setToken(true);
                navigate('/dashboard/orders'); // don't need this if not using createBrowserRouter
            })
            .catch(error => console.log("login failed", error.message))
        
    }

    return (
        <>
            <h1>Please Log in</h1>

            <form onSubmit={submitHandler}>
                <div>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            name="username"
                            onChange={e => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        Show password
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login