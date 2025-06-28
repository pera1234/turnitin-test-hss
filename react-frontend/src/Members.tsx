import React, { ChangeEvent, FC, useState } from 'react';
import './App.css';
import { Membership } from './Type';
import { fetchMembers } from './Api';
import {Button, Input, Modal, ModalBody, ModalHeader, Table} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { setMembers } from './slices/membersSlice';

const Members: FC<any> = () => {
    const dispatch = useDispatch();
    const members = useSelector((state: RootState) => state.members.list);

    const [search, setSearch] = useState<string>();
    const [activeMembership, setActiveMembership] = useState<Membership>();

    const updateSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    const loadDetailsModal = (membership: Membership) => {
        setActiveMembership(membership);
    }

    const closeDetailsModal = () => {
        setActiveMembership(undefined);
    }

    const filteredMembers = members.filter(membership =>
        !search ||
        membership.user?.name.toLowerCase().includes(search.toLowerCase()) ||
        membership.user?.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="App">
            <header className="App-header">
                <div className='user-inputs'>
                    <Button color='primary' className='fetch-btn' onClick={() => fetchMembers().then(data => dispatch(setMembers(data.memberships)))}>Fetch Memberships</Button>
                    <Input type='text' placeholder='Search' onChange={updateSearch} />
                </div>
                {
                    filteredMembers && filteredMembers.length > 0 && (
                        <Table hover>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredMembers.map(membership => (
                                <tr key={membership.id}>
                                    <td>{membership.user?.name}</td>
                                    <td>{membership.user?.email}</td>
                                    <td>
                                        <Button color="primary" outline onClick={() => loadDetailsModal(membership)}>
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )
                }
                { activeMembership &&
                    (
                        <Modal isOpen={!!activeMembership}>
                            <ModalHeader toggle={closeDetailsModal}>User Details</ModalHeader>
                            <ModalBody>
                                <div>
                                    <p>Name: {activeMembership.user?.name}</p>
                                    <p>Email: {activeMembership.user?.email}</p>
                                    <p>Membership ID: {activeMembership.id}</p>
                                    <p>User ID: {activeMembership.user?.id}</p>
                                    <p>Role: {activeMembership.role}</p>
                                </div>
                            </ModalBody>
                        </Modal>
                    )
                }
            </header>
        </div>
    );
}

export default Members;
