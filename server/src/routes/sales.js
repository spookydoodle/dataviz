const generateData = require('../common/generateData');

const routes = app => {

    app.get('/api/sales', (req, res) =>
        res.status(200).send({ info: "This is dummy data for demo purposes", results: generateData(20) })
    )
}



module.exports = routes;