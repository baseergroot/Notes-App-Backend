# Notes App API Documentation

## Base URL

```
http://localhost:3000
```

---

## Authentication

* `signup` → create a new user
* `login` → login and receive cookie token
* `logout` → clear token

All protected routes require the **token cookie** from login.

---

## Endpoints

### 1. Signup

```
POST /api/signup
```

**Request Body**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response**

```json
{
  "message": "Logged in successfully"
}
```

**Errors**

* 400: Missing username or password
* 400: User already exists

---

### 2. Login

```
POST /api/login
```

**Request Body**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response**

```json
{
  "message": "Logged in successfully"
}
```

**Errors**

* 400: Missing username or password
* 400: Invalid credentials

---

### 3. Logout

```
DELETE /api/logout
```

**Response**

```json
{
  "message": "Logged out successfully"
}
```

---

### 4. Create Note

```
POST /api/notes/create
```

**Request Body**

```json
{
  "title": "string",
  "description": "string"
}
```

**Response**

```json
{
  "success": true,
  "title": "string",
  "description": "string",
  "user": { /* user object without password */ }
}
```

**Errors**

* Missing title or description
* User not found

---

### 5. Get All Notes

```
GET /api/notes
```

**Response**

```json
{
  "success": true,
  "user": {
    "notes": [
      { "title": "string", "description": "string" }
    ]
  }
}
```

**Errors**

* Notes not found
* User not found

---

### 6. Delete Note

```
DELETE /api/notes/delete/:id
```

**Path Parameter**

* `id` → note ID

**Response**

```json
{
  "user": { /* updated user object without password */ }
}
```

---

### 7. Update Note

```
PUT /api/notes/update/:id
```

**Path Parameter**

* `id` → note ID

**Request Body**

```json
{
  "title": "string",
  "description": "string"
}
```

**Response**

```json
{
  "success": true,
  "message": "Notes Updated Successfully",
  "updatedNotes": { /* updated note object */ }
}
```

---

## Notes

* All `/api/notes/*` routes require the **user token** cookie set from login.
* Passwords are hashed before saving in DB.
* The `user` object in responses excludes the password.
* Uses MongoDB for storage.
