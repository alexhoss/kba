let postData = require('../models/postData')
exports.search = (req, res, next) => {
    console.log(req.query)
    let searchQuery = req.query.search
    console.log(searchQuery)
    postData.getAllbyKeyword(searchQuery).then(([rows, fieldData]) => {
        let dataRows = rows
        res.render('search_results', {pageTitle:'KnowledgeBase', curtisCSS: true, people: dataRows})
    });
    
}