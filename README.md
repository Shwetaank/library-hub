# Library Hub

## Setup

Copy `.env.example` to `.env`, fill in the required values, then start the app:

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Azure Blob Storage

Book-cover uploads are integrated with Azure Blob Storage.

- Required env vars: `AZURE_STORAGE_ACCOUNT_NAME`, `AZURE_STORAGE_CONNECTION_STRING`
- Optional env var: `AZURE_STORAGE_CONTAINER_NAME` (defaults to `book-covers`)
- Upload endpoint: `POST /api/admin/uploads/book-cover`
- Auth requirement: admin session cookie
- Request type: `multipart/form-data`
- Form fields: `file` and optional `bookTitle`

Example request:

```bash
curl -X POST http://localhost:3000/api/admin/uploads/book-cover \
  -H "Cookie: token=<admin-session-token>" \
  -F "bookTitle=Atomic Habits" \
  -F "file=@cover.jpg"
```

Successful uploads return a public blob URL that can be stored in `Book.coverUrl`.
