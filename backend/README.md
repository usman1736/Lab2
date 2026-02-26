# Backend API Notes

## Run

```bash
npm install
npm run start
```

Server runs on `http://localhost:3333`.

## Endpoints

### `POST /login`

Request body:

```json
{
  "username": "ttuna@gmail.com",
  "password": "password"
}
```

Success response (`200`):

```json
{
  "message": "The username and password is correct.",
  "uuid": "session-token"
}
```

Failure response (`401`):

```json
{
  "message": "The username or password is invalid."
}
```

### `GET /facts` (also supports `GET /fact`)

Protected route. Requires:

```
Authorization: Bearer <uuid>
```

### `POST /logout`

Protected route. Requires:

```
Authorization: Bearer <uuid>
```

## Token Behavior

- Login creates a session token (`uuid`) stored in memory on the backend.
- The token is required for `/facts`, `/fact`, and `/logout`.
- `/logout` invalidates the token immediately.
- Restarting the server clears all sessions.
