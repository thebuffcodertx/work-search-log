models/User.js
  createUser(data)            → POST   /api/users
  findUserById(id)            → GET    /api/users/:id
  findUserByEmail(email)      → used later for login
  updateUser(id, data)        → PUT    /api/users/:id
  deleteUser(id)              → DELETE /api/users/:id

models/WorkSearch.js
  findAll(userId, filters)    → GET    /api/work-searches (from, to, status, role)
  findById(id, userId)        → GET    /api/work-searches/:id
  create(userId, data)        → POST   /api/work-searches
  update(id, userId, data)    → PUT    /api/work-searches/:id
  remove(id, userId)          → DELETE /api/work-searches/:id