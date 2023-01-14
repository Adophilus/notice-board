const admin = {
  email: 'admin@mail.localhost',
  username: 'admin',
  password: 'hello world',
  notices: []
}

db.admins.deleteOne({ email: admin.email })

db.admins.insertOne(admin)
