// import { login } from '../../services'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import styles from './Login.module.css'
// export default function Login() {
//     const navigate = useNavigate()
//     useEffect(() => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             navigate('/workspace')
//         }
//     }, [])
//     const [loginformData, setLoginformData] = useState({
//         email: '',
//         password: '',
//     })
//     const handleLogin = async (e) => {
//         e.preventDefault()
//         const res = await login(loginformData)
//         if (res.status === 200) {
//             const data = await res.json()
//             console.log(data)
//             localStorage.setItem('token', data.token)
//             alert('logged in successfully')
//             navigate('/workspace')
//         }
//         else {
//             console.log(res)
//             alert('error')
//         }
//     }
//     return (
//         <div className={styles.header}>
//         <div className={styles.login}>
//         <form onSubmit={handleLogin}>
//             <div className={styles.formText}>
//             <label htmlFor="email">Email</label>   
//             <input type="email" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.email} name="email" placeholder="Enter your email" />
//             </div><br />
//             <div className={styles.formPassword}>
//             <label htmlFor="password">Password</label>   
//             <input type="password" onChange={(e) => setLoginformData({ ...loginformData, [e.target.name]: e.target.value })} value={loginformData.password} name="password" placeholder="**********" />
//             </div><br />
//             <div className={styles.formButton1}>
//                                     <button type="submit">Sign Up</button>
//                                 </div>
//                                 <br />
//                             </form>
//                             <p>OR</p>
//                             <div className={styles.formButton2}>
//                                 <button >Sign In with Google</button>
//                             </div>
//                             <p>Don’t have an account? Register now</p>
//                         </div>
//                     </div>
//     )
// }
import { login } from '../../services';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
    const navigate = useNavigate();

    // Redirect user if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/workspace');
        }
    }, [navigate]);

    const [loginformData, setLoginformData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            const res = await login(loginformData);
            if (res.status === 200) {
                const data = await res.json();
                localStorage.setItem('token', data.token);
                alert('Logged in successfully');
                navigate('/workspace');
            } else {
                setError('Invalid email or password'); // Handle non-200 response
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.'); // Handle network or server errors
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.login}>
                <form onSubmit={handleLogin}>
                    <div className={styles.formText}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginformData.email}
                            onChange={(e) =>
                                setLoginformData({ ...loginformData, email: e.target.value })
                            }
                        />
                    </div>
                    <div className={styles.formPassword}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="**********"
                            value={loginformData.password}
                            onChange={(e) =>
                                setLoginformData({ ...loginformData, password: e.target.value })
                            }
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
                    <div className={styles.formButton1}>
                        <button type="submit">Log In</button>
                    </div>
                </form>
                <p>OR</p>
                <div className={styles.formButton2}>
                    <button type="button">Sign In with Google</button>
                </div>
                <p>
                    Don’t have an account? <a href="/register">Register now</a>
                </p>
            </div>
        </div>
    );
}
