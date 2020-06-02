function page (req, res) {
  require('fs').readFile('html/group_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, {
      title: 'Gruppen Erstellung',
      js: ['jquery', 'jquery-ui', 'tokenize2', 'dropzone', 'group_creation'],
      css: ['groups', 'bootstrap', 'tokenize2', 'styles_general', 'jquery-ui', 'dropzone'],
      nav: true,
      req: req
    }))
  })
}

module.exports = {
  page: page
}
