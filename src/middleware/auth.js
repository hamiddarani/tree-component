const auth = (to , from , next) => {
    console.log('we are here')
    next('/login');
}

export default auth;