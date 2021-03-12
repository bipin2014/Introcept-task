import React, { useEffect, useState } from 'react';
import { ValidateForm, ValidateInput } from '../../../../utils/customHooks/validateForm';
import { Client } from '../model/Client';
import { addNewClient } from '../services/ClientServices';
import ClientRules from './clientRules';

const initialValues: Client = {
    name: '',
    address: '',
    email: '',
    contact_mode: '',
    dob: '',
    education_background: '',
    gender: '',
    nationality: '',
    phone: '',
};

interface IAddUser {
    closeModal: Function,
    mode: string,
    reload: boolean
    setReload: Function
}

const AddClient = (props: IAddUser, { setReload: setRelaod = (f: Function) => f }: IAddUser) => {
    const [errors, setErrors] = useState(initialValues);
    const [client, setClient] = useState<Client>(initialValues);

    useEffect(() => {
        setClient(
            {
                ...client,
                contact_mode: 'Phone',
                gender: 'Male'
            }
        )
        // eslint-disable-next-line
    }, [])
    const handelFormSubmit = (e: any) => {
        e.preventDefault();
        let errorMsgs: any = ValidateForm(client, ClientRules);
        setErrors({ ...errorMsgs });
        let validated = Object.values(errorMsgs).join('').length === 0;
        console.log(errorMsgs);

        if (validated) {
            addNewClient(client).then(res => {
                setRelaod(!props.reload);

            }).catch(err => {
                console.log(err);

            });
            // dispatch(actions.adminAddInstitute(institute));
            props.closeModal()
        }
    };
    const inputValidation = (e: any) => {
        let errorMsg = ValidateInput(e.target.name, e.target.value, ClientRules);
        setErrors({
            ...errors,
            [e.target.name]: errorMsg,
        });
    };
    const inputHandler = (e: any) => {
        setClient({
            ...client,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div className="edit-client dialog-content">
            <div className="dialog-content-area auto-scroll full-width ma-sm pa-sm" style={{ maxHeight: '70vh' }}>
                <form onSubmit={handelFormSubmit} className="full-width">
                    <div className="form-area my-lg">

                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Name</label>
                            <input
                                type="text"
                                name={'name'}
                                value={client.name}
                                onBlur={inputValidation}
                                onChange={inputHandler}
                                placeholder={'Enter Name'}
                            />

                            {errors.name !== '' ? (
                                <span className="error-text">{errors.name}</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Gender</label>
                            <select
                                name={"gender"}
                                onBlur={inputValidation}
                                value={client.gender}
                                onChange={inputHandler}>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>

                            {errors.gender !== '' ? (
                                <span className="error-text">{errors.gender}</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Email</label>
                            <input
                                name={'email'}
                                onBlur={inputValidation}
                                value={client.email}
                                onChange={inputHandler}
                                placeholder={'Enter Client Email'}
                            />
                            {errors.email !== '' ? (
                                <span className="error-text">{errors.email}</span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Address</label>

                            <input
                                type="text"
                                name={'address'}
                                onBlur={inputValidation}
                                value={client.address}
                                onChange={inputHandler}
                                placeholder={'Enter Address'}
                            />

                            {errors.address !== '' ? (
                                <span className="error-text">{errors.address}</span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Date of birth</label>

                            <input
                                type="date"
                                name={'dob'}
                                onBlur={inputValidation}
                                value={client.dob}
                                onChange={inputHandler}
                                placeholder={'Enter Date of Birth'}
                            />

                            {errors.dob !== '' ? (
                                <span className="error-text">{errors.dob}</span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Phone</label>

                            <input
                                type="number"
                                name={'phone'}
                                onBlur={inputValidation}
                                value={client.phone}
                                onChange={inputHandler}
                                placeholder={'Enter Phone Number'}
                            />

                            {errors.phone !== '' ? (
                                <span className="error-text">{errors.phone}</span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Nationality</label>

                            <input
                                type="text"
                                name={'nationality'}
                                onBlur={inputValidation}
                                value={client.nationality}
                                onChange={inputHandler}
                                placeholder={'Enter Nationality'}
                            />

                            {errors.nationality !== '' ? (
                                <span className="error-text">{errors.nationality}</span>
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Education Background</label>

                            <input
                                type="text"
                                name={'education_background'}
                                onBlur={inputValidation}
                                value={client.education_background}
                                onChange={inputHandler}
                                placeholder={'Enter Education Background'}
                            />

                            {errors.education_background !== '' ? (
                                <span className="error-text">{errors.education_background}</span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="form-group mb-sm">
                            <label className={'bold text-primary'}>Contact Mode</label>

                            <select
                                name={"contact_mode"}
                                onBlur={inputValidation}
                                value={client.contact_mode}
                                onChange={inputHandler}>
                                <option value='Phone'>Phone</option>
                                <option value='Email'>Email</option>
                                <option value='None'>None</option>
                            </select>

                            {errors.contact_mode !== '' ? (
                                <span className="error-text">{errors.contact_mode}</span>
                            ) : (
                                ''
                            )}
                        </div>

                    </div>
                    <button className="btn primary full-width" type={'submit'}>Create Client</button>
                </form>
            </div>
        </div>
    );
};
export default AddClient;
