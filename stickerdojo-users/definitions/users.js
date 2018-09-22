exports.usersDefinition = [
  {
    id: { column: "id", id: true },
    email_address: { column: "email_address" },
    password: { column: "password" },
    profile: {
      first_name: { column: "first_name" },
      last_name: { column: "last_name" },
      username: { column: "username" },
      about: { column: "about" },
      job: { column: "job" },
      ages: { column: "ages" },
    },
    create_at: { column: "create_at" },
    modify_at: { column: "modify_at" }
  }
]