### Installing dependencies

We need to install packages and JSON server dependencies.

For frontend dependencies

```bash
npm install
```

For you JSON server dependencies;

```bash
npm install -g json-server
```

### Running project

We have json-server and react app, and we will run them separately. Let's start with JSON server.

```bash
json-server --watch db.json --port 3004
```

This command will run JSON server on `:3004` port then we will run React server.

```bash
npm start
```
And this will run our React project on `:3000` port.

### URLs

When you start project, this urls will be avalaible.

| App      | Url |
| ----------- | ----------- |
| React app      | http://localhost:3000       |
| Backend API(JSON server) | http://localhost:3004 |

