import React, { useEffect, useState } from 'react';
import Modal from '../../../common/modal';
import Confirmation from '../../../common/modal/Confirmation';
import ListTable from '../../../common/Table';
import AddClient from './components/AddClient';
import { getAllClients } from './services/ClientServices';

const ClientLayout: React.FC = () => {
    const [clients, setClients] = useState([])
    const [modalMode, setModalMode] = useState('add');
    const [reload, setReload] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    // useEffect(() => {
    //     loadAllClients();
    // }, [])

    useEffect(() => {
        loadAllClients();
    }, [reload])

    const loadAllClients = () => {
        getAllClients().then(res => {
            setClients(res.data.data.reverse())
        }).catch(err => {
            console.log(err);
        })
    }

    const addAction = () => {
        setModalMode('add');
        setShowModal(true);
    }

    const deleteConfirmation = async () => {
        setShowConfirmation(false);
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
        <section className="wrapper issues full-height full-width flex column py-md">
            <header className={'flex justify-between items-center mb-md'}>
                <div className="title-sm bold text-primary">Clients</div>
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
                modalMode === 'add' ?
                    <Modal show={showModal} title={'Add Client'}
                        closeModal={() => setShowModal(false)}>
                        <AddClient closeModal={() => setShowModal(false)} mode={modalMode} reload={reload} setReload={setReload} />
                    </Modal> :
                    <Modal show={showModal} title={'Edit Client'}
                        closeModal={() => setShowModal(false)}>
                        {/* <EditInstitute
                            editInstitute={editInstitute}
                            editObj={editUserObj}
                            closeModal={() => setShowModal(false)}
                            mode={modalMode}
                        /> */}
                    </Modal>
            }
            <Confirmation title="Confirm" content="Are you sure you want to delete this item?" show={showConfirmation}
                confirm={deleteConfirmation}
                closeModal={() => setShowConfirmation(false)} />
        </section>
    );
};

export default ClientLayout;
