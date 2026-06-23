import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Unauthorized from './Unauthorized'

function PrivateRoute({ children, requiredAdmin }) {

    const navigate = useNavigate()
    const { status, isAdmin } = useSelector( (state) => state.auth )

    useEffect( () => {
        if (!status) {
            navigate('/signin')
        }
    }, [status, navigate])

    if (requiredAdmin && !isAdmin) {
        return <Unauthorized/>
    }

    return ( status && (!requiredAdmin || isAdmin ) ) ? children : null
}

export default PrivateRoute
