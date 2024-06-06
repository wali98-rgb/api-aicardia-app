const roleAccess = (userRole, endpoint) => {
    // const allowedRoles = {
    //     '/admin': ['admin', 'superadmin'],
    //     '/product': ['admin', 'superadmin', 'user']
    // }

    // const allowedRolesForRoute = allowedRoles[route]

    // return allowedRolesForRoute && allowedRolesForRoute.includes(userRole)
    if (endpoint === '/user' && userRole === 'superadmin' || userRole === 'admin') {
        return true
    } else {
        return false
    }
}

export default roleAccess