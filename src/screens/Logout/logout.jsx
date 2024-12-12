import React, { useEffect } from 'react'

import { useNavigate } from "react-router-dom";

import { useStoreActions } from "../../store/hooks";

const Logout = () => {

  let navigate = useNavigate();

  let logout = useStoreActions(action => action.logout.logout);

  let resetUserStore = useStoreActions(action => action.user.resetStore);

  let resetLoginStore = useStoreActions(action => action.login.resetStore);


  useEffect(() => {

    resetUserStore();

    resetLoginStore();

    logout();

    navigate('/login')

    localStorage.setItem('token', '');

  }, [])


  return <></>
}

export default Logout;