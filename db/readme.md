Install mongodb on your OS

To create authentication: 

1) At the mongo command line, set the administrator:

    // Start the server on the terminal
    
    mongod --dbpath ./db/data --logpath ./db/log/mongod.log 

    // run mongo shell and:

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

3) Start mongod, now with auth

  $ mongod --dbpath ./db/data --logpath ./db/log/mongod.log
