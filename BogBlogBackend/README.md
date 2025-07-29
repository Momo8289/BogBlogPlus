# BogBlugBackend
## Setup
To run locally:
```bash
git clone https://github.com/Momo8289/BogBlogPlus.git
cd BogBlogPlus/BogBlogBackend

# Only on first setup
python -m venv venv
# Linux:
source venv/bin/activate
# Windows:
.\venv\Scripts\activate

pip install -r requirements.txt

flask db init
flask db migrate
flask db upgrade

# To run
flask run
```

## Endpoints
Endpoints marked with "auth" require authentication to use. Get an auth token from `/token/login` or `/user`, and include it in the request headers like so:
`Authorization: Bearer <auth token>`
### tokens
#### `/api/token/login` - POST
Generate an auth token for the user
Request body:
`username`: Username of user to generate a token for
`password`: Password for user

Response body:
`token`: Auth token to use in requests
`expires`: Date when the token expires

#### `/api/token/logout` - POST - auth
Delete the current auth token

### users
#### `/api/user` - GET - auth
Return info for the current user

#### `/api/user` - POST
Register a new user
Request body:
`username`: Username of new user
`password`: Password for user

Response body:
`token`: Auth token to use in requests
`expires`: Date when the token expires

#### `/api/user` - PUT - auth
Update the username/password of the user

Request body:
`username`: New username
`password`: Optional, user's current password. Required if updating the password.
`new_password`: Optional, new password for the user.

#### `/api/user` - DELETE - auth
Deletes the current user account and all tokens, posts, likes, etc.

#### `/api/user/<id>` - GET - auth
Get info on the specified user ID

#### `/api/user/<id>/posts` - GET - auth
Get all posts belonging to the specified user

#### `/api/user/<id>/likes` - GET - auth
Get all posts the specified user has liked

### posts
#### `/api/post` - GET - auth
Get all posts, ordered newest to oldest

#### `/api/post` - POST - auth
Create a new post
Request body:
`title`: Post title
`body`: Post body

#### `/api/post/<id>` - GET - auth
Get the specified post

#### `/api/post/<id>` - PUT - auth
Update the specified post. Can only be done by the author.

Request body:
`body`: New post body

#### `/api/post/<id>` - DELETE - auth
Delete the specified post. Can only be done by the author.


#### `/api/post/<id>/like` - POST - auth
Like the specified post. Cannot be done by the post author

#### `/api/post/<id>/like` - DELETE - auth
Unlike the specified post. Cannot be done by the post author

