# Plangrid-submittals-node-assigment

Installation
Run npm install command to download all the npm packages.

Running
Run `npm run dev` to start the server.

Running on http://127.0.0.1:5000/
Restarting with reloader nodemon

Problem statment 
This assignment is about users and tasks. A new user can sign up itself. After signing up user can login with same credentials and create a new task, see all the task created by him/her, edit those tasks and delete them also. User can edit profile and delete it also. Deleting the profile will eventually delete all the tasks created by user.


1. Sign up
  curl -X POST \
  http://localhost:3000/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: d3d668bf-9744-ca25-41e6-c46f1b32e5a8' \
  -d '{
	"name": "Rama Shamra",
	"age":27,
	"email": "rama@gmail.com",
	"password": "Red12345665!"
}'

2. Log in
  curl -X POST \
  http://localhost:3000/users/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 3587755c-e6ef-660a-db91-19f798cec7de' \
  -d '{
	"email": "rama@gmail.com",
	"password":"Red12345665!"
}'

3. Create task 
curl -X POST \
  http://localhost:3000/tasks \
  -H 'authorization: Bearer ${token}' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: ef601bc2-33d6-9660-3ec4-30b8b18fde1f' \
  -d '{
	"description": "Go to office",
	"completed": true
}'

4. Get tasks
 curl -X GET \
  http://localhost:3000/tasks \
  -H 'cache-control: no-cache' \
  -H 'authorization: Bearer ${token}' \
  -H 'postman-token: 8836a6cf-80d5-331f-2e09-ba8aa687a252'
  
  
5. Update user
  curl -X PATCH \
  http://localhost:3000/users/614cacfbc8e625ae5e6da8d7 \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 4320aaf9-0e6a-072e-34c3-c0978efbe9be' \
  -d '{
	"name": "Sushma sharma"
}'

6. 
