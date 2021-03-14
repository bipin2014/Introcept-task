import React, { useEffect, useState } from 'react';
import Modal from '../../../common/modal';
import Confirmation from '../../../common/modal/Confirmation';
import ListTable from '../../../common/Table';
import AddClient from './components/AddClient';
import NavClient from './components/NavClient';
import { getAllClients } from './services/ClientServices';

const ClientLayout: React.FC = () => {
    const [clients, setClients] = useState([])
    const [modalMode, setModalMode] = useState('add');
    const [reload, setReload] = useState(false)
    const [showModal, setShowModal] = useState(false);
    // useEffect(() => {
    //     loadAllClients();
    // }, [])

    useEffect(() => {
        loadAllClients();
    }, [reload])

    const loadAllClients = () => {
        getAllClients().then(res => {
            console.log(res.data.data);
            
            setClients(res.data.data.reverse())
        }).catch(err => {
            console.log(err);
        })
    }

    const addAction = () => {
        setModalMode('add');
        setShowModal(true);
    }

    const columns = [
        {
            name: 'name',
            align: 'left',
            label: 'Name',
            field: 'name',
            flexVal: 1,
        }, {
            name: 'email',
            align: 'left',
            label: 'Email',
            field: 'email',
            flexVal: 1,
        }, {
            name: 'gender',
            align: 'center',
            label: 'Gender',
            field: 'gender',
            flexVal: 1,
        }, {
            name: 'address',
            align: 'center',
            label: 'Address',
            field: 'address',
            flexVal: 1,
        }
        , {
            name: 'nationality',
            align: 'center',
            label: 'Nationality',
            field: 'nationality',
            flexVal: 1,
        }, {
            name: 'dob',
            align: 'center',
            label: 'Date of Birth',
            field: 'dob',
            flexVal: 1,
        }
        , {
            name: 'education_background',
            align: 'center',
            label: 'Education Background',
            field: 'education_background',
            flexVal: 1,
        }, {
            name: 'contact_mode',
            align: 'center',
            label: 'Contact Mode',
            field: 'contact_mode',
            flexVal: 1,
        }
    ]

    return (
        <>
            <NavClient />
            <section className="wrapper issues full-height full-width flex column py-md">

                <header className={'flex justify-end items-center mb-md'}>
                    <button className="btn primary" onClick={addAction}>Add Client</button>
                </header>
                <div className="table-area pt-md flex-1">
                    <ListTable
                        columns={columns}
                        rows={clients}
                        paginate={10}
                    />
                </div>
                {
                    modalMode === 'add' &&
                    <Modal show={showModal} title={'Add Client'}
                        closeModal={() => setShowModal(false)}>
                        <AddClient closeModal={() => setShowModal(false)} mode={modalMode} setReload={() => setReload(!reload)} />
                    </Modal>
                }
            </section>
        </>
    );
};

export default ClientLayout;
