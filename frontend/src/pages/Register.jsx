import Input from "../components/form/Input.jsx";
import useAuth from "../hooks/useAuth.js";
import {useNavigate} from "react-router";
import {useState} from "react";



export function Register() {
    const {error,register,getUser } = useAuth();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email : "",
        password : "",
        name : "",
    })
    const handleChange = function (event,attr) {
        setFormData({...formData, [attr]: event.target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        register(formData)
            .then(data => {
                getUser().then(res => {
                    navigate("/admin")
                })
            })
            .catch(error => {});

    };
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Registration</h3>
                            { error?.message}
                            <form onSubmit={handleSubmit}>
                                <Input name={'name'}
                                       label={'Name'}
                                       value={formData.name}
                                       onChange={(event) => handleChange(event,"name")}
                                       error={error?.errors?.name}
                                />
                                <Input name={'email'}
                                       label={'Email'}
                                       value={formData.email}
                                       onChange={(event) => handleChange(event,"email")}
                                       error={error?.errors?.email}
                                />
                                <Input name={'password'}
                                       type={'password'}
                                       label={'Password'}
                                       onChange={(event) => handleChange(event,"password")}
                                       value={formData.password}
                                       error={error?.errors?.password}
                                />
                                <button type="submit" className="btn btn-primary w-100">
                                    Sign up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
