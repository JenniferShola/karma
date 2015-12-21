# karma

Making some changes to test

Max's Notes

How to Run backend UI:
	1) in terminal, enter command: npm start
	// runs the database in background
	2) in chrome, enter domain: http://localhost:3000/
	// now on web portal for backend
	3) existing routes:
		a) accounts
		b) connections
		c) index // this is just the root (home page)
		d) interactions
		e) users

	
How to Use Postman to delete or post/put/add users
	1) Select GET, DELETE, PUT, POST, from dropdown
	2) enter URL of endpoint
		i.e. "http://localhost:3000/accounts/USER_ID"
	3) enter headers
		i: for delete, make sure safedelete is set to yes
		ii: for add, make sure to enter headers for username, name
