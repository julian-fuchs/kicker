const database = require('../database')

const Group = class {
  constructor (id) {
    this._id = id
  }

  get id () {
    return this._id
  }

  get name () {
    return this._select('name')
  }

  set name (name) {
    return this._update('name', name)
  }

  get picture () {
    return this._select('picture')
  }

  set picture (picture) {
    return this._update('picture', picture)
  }

  get description () {
    return this._select('description')
  }

  set description (picture) {
    return this._update('description', picture)
  }

  get users () {
    return database.query(`SELECT User_in_Group.user_id, User_in_Group.join_timestamp
    FROM Group
    JOIN User_in_Group ON (User_in_Group.group_id = Group.id)
    WHERE Group.id = :id`, {
      id: this._id
    })
  }

  _select (property) {
    return database.query('SELECT ' + property + ' FROM Group WHERE id = :id', {
      id: this._id
    })[0][property]
  }

  _update (property, value) {
    database.query('UPDATE Group SET ' + property + ' = :value WHERE id = :id', {
      value: value,
      id: this._id
    }, null)
  }
}

function getGroup (property, value) {
  const result = database.query('SELECT id FROM Group WHERE ' + property + ' = :value', {
    value: value
  })
  return new Group(result[0].id)
}

function byId (id) {
  return getGroup('id', id)
}

function create (name, description) {
  const result = database.query('INSERT INTO Group (name, description) VALUES (:name, :description)', {
    name: name,
    description: description
  })
  return byId(result.insertId)
}

module.exports = {
  by_id: byId,
  create: create
}