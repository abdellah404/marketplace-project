import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CitiesMorocco } from '../Annonces/data';
import useTheme from '../../hooks/useTheme';

const ProfileSettings = () => {
    const { user, updateAuthUser } = useAuth();
    const navigate = useNavigate();
    const {isDarkMode} = useTheme()

    const userSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email().required('Email is required'),
        city: Yup.string().required('City is required'),
        phone: Yup.string()
            .matches(/^0[0-9]{9}$/, 'Phone number must start with 0 and have 10 digits')
            .required('Phone number is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            city: user.city || '',
            phone: user.phone || '',
        },
    });

    const onSubmit = async (formData, event) => {
        event.preventDefault();
        try {
            await updateAuthUser(formData);
            // Display success message to the user
            setChanged('Profile updated successfully!');
            setTimeout(() => {
                setChanged('');
                navigate('/app');
            }, 1000);
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    const [changed, setChanged] = useState('');

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                <div className={`card ${isDarkMode ? "bg-secondary text-light" : ""}`}>
                <div className="card-body">
                            {(
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-control shadow-none border-2 "
                                            placeholder="Enter your name"
                                            {...register('name')}
                                        />
                                        <p className="text-danger mt-1">{errors.name?.message}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email (non modifiable)
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control shadow-none border-2 "                                            placeholder="Enter your email"
                                            {...register('email')}
                                            disabled // Disable the email field
                                        />
                                        <p className="text-danger mt-1">{errors.email?.message}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label fw-semibold">
                                            Ville
                                        </label>
                                        <select
                                            id="city"
                                            className="form-select shadow-none border-2 "                                            {...register("city")}
                                        >
                                            <option defaultValue={user.city}>{user.city}</option>
                                            {CitiesMorocco.map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-danger mt-1">{errors.city?.message}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Phone number
                                        </label>
                                        <input
                                            id="phone"
                                            type="text"
                                            className="form-control shadow-none border-2 "                                            placeholder="Enter your phone number"
                                            {...register('phone')}
                                        />
                                        <p className="text-danger mt-1">{errors.phone?.message}</p>
                                    </div>

                                    <button disabled={isSubmitting} type="submit" className="btn btn-dark w-100 mb-3">
                                        Save
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;