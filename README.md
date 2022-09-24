# SECAdvisor
## Preconditions

Install [Docker](https://www.docker.com/)  
Install [Docker Compose](https://docs.docker.com/compose/install/) 

## Production

### Usage

To run the application in production mode:

``` sh
# Run application
docker compose up --build
```

Navigate to `http://localhost` with your browser.

## Development

### Usage

To run the application in dev mode:

``` sh
# Run dev application
docker compose -f docker-compose.dev.yml up --build
```

Navigate to `http://localhost` with your browser. Awesome, hot reload for the `public-api` and `frontend` is working!

### Debugging with VS Code

First, run the docker container in dev mode as described above.

#### Public Api

Once the containers are running, attach the debugger and set your breakpoints:
![Attach debugger](assets/images/attach_debugger_public-api.png)
