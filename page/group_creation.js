function page (req, res) {
  require('fs').readFile('html/group_creation.html', 'utf8', function (err, html) {
    if (err) throw err

    res.end(require('../src/html_creator').create_html(html, 'Gruppen Erstellung',
      ['jquery', 'jquery-ui', 'chosen', 'dropzone'],
      ['styles_general', 'jquery-ui', 'chosen', 'groups', 'hamburgers', 'dropzone']))
  })
}

module.exports = {
  page: page
}