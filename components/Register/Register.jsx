// import { register } from '../../services'
// import { useState } from 'react'
// import styles from './Register.module.css';

// export default function Register() {
//     const [formData, setFormData] = useState({
//         username: '',   
//         email: '',
//         password: '',
//         confirmPassword: '',
//     })
    
//     const [error, setError] = useState('');

//     const handleRegister = async (e) => {
//         e.preventDefault() 
//         const { username, email, password, confirmPassword } = formData;

//                 // Password match validation
//                 if (password !== confirmPassword) {
//                     setError('Passwords do not match');
//                     return;
//                 }
//                 try {
//                     const res = await register(formData);
        
//                     if (res.status === 200) {
//                         alert('Registered successfully');
//                         setFormData({ username: '', email: '', password: '', confirmPassword: '' }); // Reset form
//                         setError(''); // Clear error
//                     } else {
//                         setError(res.data.message || 'Registration failed');
//                     }
//                 } catch (err) {
//                     console.error(err);
//                     setError('An error occurred. Please try again.');
//                 }
//             };
    
//     return (
//         <div className={styles.header}>
//            <div className={styles.form}>
//         <form onSubmit={handleRegister}>
//             <div className={styles.formText}><input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.name} name="username" placeholder="Enter a username" /></div><br />
//             <div className={styles.formText}><input type="text" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.email} name="email" placeholder="Enter  your email" /></div><br />
//             <div className={styles.formPassword}><input type="password" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.password} name="password" placeholder="***********" /></div><br />   
//             <div className={styles.formPassword}><input type="password" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} value={formData.confirmPassword} name="confirmPassword" placeholder="***********" /></div><br />         
//             <div className={styles.formButton1}><button type="submit">Sign Up</button></div><br />
//         </form>
//         <p>OR</p>
//         <div className={styles.formButton2}><button type="submit">Sign In with Google</button></div>
//         <p>Don’t have an account? Register now</p>
//         </div> 
//         </div>
//     )
// }
import { register } from '../../services';
import { useState } from 'react';
import styles from './Register.module.css';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',   
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        // Password match validation
        if (password !== confirmPassword) {
            setError('enter same password in both fields');
            return;
        }

        try {
            const res = await register(formData);

            if (res.status === 200) {
                alert('Registered successfully');
                setFormData({ username: '', email: '', password: '', confirmPassword: '' }); // Reset form
                setError(''); // Clear error
            } else {
                setError(res.data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.form}>
                <form onSubmit={handleRegister}>
                    <div className={styles.formText}>
                    <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Enter your username" 
                            value={formData.username} 
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
                        />
                    </div>
                    <br />
                    <div className={styles.formText}>
                    <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                        />
                    </div>
                    <br />
                    <div className={styles.formPassword}>
                    <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="**********" 
                            value={formData.password} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                        />
                    </div>
                    <br />
                    <div className={styles.formPassword}>
                    <label htmlFor="password">Confirm Password</label>
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            placeholder="*********" 
                            value={formData.confirmPassword} 
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                        />
                    </div>
                    <br />
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.formButton1}>
                        <button type="submit">Sign Up</button>
                    </div>
                    <br />
                </form>
                <p>OR</p>
                <div className={styles.formButton2}>
                    <button >Sign In with Google</button>
                </div>
                <p>Already have an account?
                <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
}
