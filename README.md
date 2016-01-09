# Karma

## Installation
### Download the project
1. Clone the project into your dev folder 
`git clone https://github.com/JenniferShola/karma.git && cd karma`
2. Run the project 
`npm start`
3. The output should read...
```
> getkarma@0.0.0 start {YOUR_DEV_PATH}/karma
> node ./bin/www

{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' }
js-bson: Failed to load c++ bson extension, using pure JS version
Mongoose: users.ensureIndex({ name: 1 }) { unique: false, background: true }  
Mongoose: accounts.ensureIndex({ username: 1 }) { unique: true, background: true }  
Mongoose: connections.ensureIndex({ to_user_id: 1 }) { unique: true, background: true }  
Mongoose: interactions.ensureIndex({ to_user_id: 1 }) { unique: true, background: true }  
```
### Helpful Downloads 
1. [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)
2. [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)

## Run the project
1. Open Chrome and navigate to http://localhost:3000/
2. Existing API Routes:
..* Users
..* Connections
..* Interactions
..* Accounts
3. All endpoints support GET, DELETE, PUT, POST and OPTIONS
4. DELETE Requests must include safedelete or the entity will not be deleted from the db.
