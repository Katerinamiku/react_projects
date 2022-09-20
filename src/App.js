import React, {useEffect, useState} from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from "./components/User";


// Тут список пользователей: https://reqres.in/api/users

function App() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [invites, setInvites] = useState([]);
    const [success, setSuccess] = useState(false);
    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    }
    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites(prev => [...prev, id]);
        }
    }
    const onClickSendInvite = () => {
        setSuccess(true)
    }
    const onClickBack = () => {
        setSuccess(false)
    }

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(json => {
                setUsers(json.data)
            })
            .catch(err => {
                console.warn(err);
                alert('Error occurred')
            })
            .finally(() => setIsLoading(false))
    }, []);

    return (
        <div className="App">
            {success
                ? <Success onClickBack={onClickBack}
                           count={invites.length}/>
                : <Users items={users}
                         isLoading={isLoading}
                         searchValue={searchValue}
                         onChangeSearchValue={onChangeSearchValue}
                         onClickInvite={onClickInvite}
                         invites={invites}
                         onClickSendInvite={onClickSendInvite}
                />
            }
        </div>
    );
}

export default App;
