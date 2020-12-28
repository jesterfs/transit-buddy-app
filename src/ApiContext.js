import React from 'react'

export default React.createContext({
user: [],
members: [],
changeUser: () => {},
signup: () => {},
fetchUserData: () => {},
logOut: () => {}
})