const routeHome = (req, res, next) => {
    const context = {
        name: 'Alex',
        date: new Date()
    }
    res.render('home', context)
}

module.exports = routeHome