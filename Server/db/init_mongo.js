db.createUser(
    {
        user: "betuah",
        pwd: "H3r0es!@#",
        roles: [
            {
                role : "readWriteAnyDatabase",
                db : "admin"
            },
            {
                role : "userAdminAnyDatabase",
                db : "admin"
            },
            {
                role: "root",
                db : "admin"
            }
        ]
    }
)