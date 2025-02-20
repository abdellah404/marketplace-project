import Input from "../components/form/Input.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/authSlice.js";
import useAuth from "../hooks/useAuth.js";
import {Navigate, useNavigate} from "react-router";

export function Login() {
    const {error,login,user } = useAuth();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email : "",
        password : "",
    })
    const handleChange = function (event,attr) {
        setFormData({...formData, [attr]: event.target.value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        login(formData)
            .then((result) => {
                navigate('/admin')
            })
            .catch((err) => {

            });
    };

    return (
        <>
            {user && <Navigate to="/admin"></Navigate>}
            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-md-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h3 className="card-title text-center mb-4">Connexion</h3>
                                <form onSubmit={handleSubmit}>
                                    <Input name={'email'}
                                           label={'Email'}
                                           value={formData.email}
                                           onChange={(event) => handleChange(event,"email")}
                                           error={error?.errors?.email}
                                    />
                                    <Input name={'password'}
                                           label={'Password'}
                                           type={'password'}
                                           onChange={(event) => handleChange(event,"password")}
                                           value={formData.password}
                                           error={error?.errors?.password}
                                    />
                                    <button type="submit" className="btn btn-primary w-100">
                                        Se connecter
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
