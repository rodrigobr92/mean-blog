Install mongodb on your OS

To create authentication: 

1) At the mongo command line, set the administrator:

    mongod --dbpath ./blog-db/data --logpath ./blog-db/log/mongod.log 

    use admin;

    db.createUser({
    user: "admin",
    pwd: "blog1234",
    roles: [ 
        { 
            role: "userAdminAnyDatabase", 
            db: "admin" 
        }
      ]
    });

2) Shutdown the server and exit

    db.shutdownServer();
    exit

3) Start mongod with auth

  $ mongod --dbpath ./blog-db/data --logpath ./blog-db/log/mongod.log
