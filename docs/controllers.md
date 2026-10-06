controllers/userController.js
  createUser   validate name/email/password, hash with bcrypt → User.createUser    → 201 | 400 bad input | 409 email taken
  getUser      → User.findUserById                                                → 200 | 404 not found
  updateUser   validate fields → User.updateUser                                  → 200 | 400 | 404
  deleteUser   → User.deleteUser                                                  → 204 | 404

controllers/workSearchController.js
  getAll       read from/to/status/role from req.query → WorkSearch.findAll       → 200
  getOne       → WorkSearch.findById                                              → 200 | 404
  create       validate → WorkSearch.create                                       → 201 | 400
  update       validate → WorkSearch.update                                       → 200 | 400 | 404
  remove       → WorkSearch.remove                                                → 204 | 404
  email        → WorkSearch.findAll, then send email                              → 200 | 500

Work search validation: activity_date required; company_name + job_title required when
activity_type is "Application"; ENUM fields must match allowed values; contact_email valid format.


Notes:
Each line describes one controller function: its name, any checks it runs first, the model function it calls, and the HTTP status codes it can send back. For example, createUser checks that the name, email, and password were sent, hashes the password with bcrypt, calls User.createUser to save it, then replies 201 (created) on success, 400 if input is missing or invalid, or 409 if the email already exists. So the controller is the middleman: the route hands it the request, it validates and calls the model, and it decides what response the React app receives.