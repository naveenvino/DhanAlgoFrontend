# DhanAlgoFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.
It includes a simple integration with the `trdauto` backend API. The default API
base URLs are defined in the Angular environment files:

- **Development:** `https://localhost:7288/api/TestDhan`
- **Production:** `http://localhost:5037/api/TestDhan`

Websocket URLs for real-time notifications are also defined in the environment
files:

- **Development WS:** `wss://localhost:7288/ws/notifications`
- **Production WS:** `ws://localhost:5037/ws/notifications`

You can change these values in `src/environments/environment.ts` and
`src/environments/environment.prod.ts`.

## Prerequisites

- Node.js **12.14** or newer (Node 14 is recommended)
- If using Node **17** or newer, run commands with the environment variable
  `NODE_OPTIONS=--openssl-legacy-provider` to avoid
  `ERR_OSSL_EVP_UNSUPPORTED` build failures. This flag is already included in
  the provided npm scripts.
- [Angular CLI](https://angular.io/cli) **12.0.1** (`npm install -g @angular/cli@12`)

## Installation

Install the dependencies after cloning the repository:

```bash
npm install
```

## Changing API URLs

The API base URL for development is set in `src/environments/environment.ts`.
For production builds it is defined in `src/environments/environment.prod.ts`.
Update these files to point the application to a different backend.

## Authentication

An experimental authentication module is provided under `src/app/auth`. The
`LoginComponent` posts credentials to `${environment.apiUrl}/auth/login` and
stores the returned JWT token in `localStorage`. All outgoing HTTP requests
automatically include this token via an `AuthInterceptor`, which also displays
errors using Angular Material snack bars.

## Development server

Run `npm start` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

> **Note**: A 404 at `http://localhost:4200/` usually means `npm start` (or `ng serve`) isn't running.

## Strategy Builder

The application exposes an experimental strategy builder at the `/builder` route
(also reachable via the **Strategy Builder** link in the toolbar). It allows you
to load option chain data, compose multi-leg option strategies and submit them
to the backend API for execution.

### Angular Material prerequisites

The builder relies on several Angular Material components. Ensure the following
modules are available (they are imported in `AppModule` by default):

- `MatCardModule`
- `MatFormFieldModule`
- `MatInputModule`
- `MatSelectModule`
- `MatButtonModule`
- `MatTableModule`
- `MatSnackBarModule`

## Analytics and Risk Management

Two additional modules provide performance charts and margin settings.

- Navigate to `/analytics` to see a sample bar chart using **ngx-charts**.
- Navigate to `/risk` to configure maximum risk percentage and margin.

Both routes are protected by the `AuthGuard` and lazy loaded to improve
initial load time.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Docker

You can build and run the project in a container using the provided `Dockerfile`.

```bash
# Build the image
docker build -t dhan-algo-frontend .

# Run the container and expose it on http://localhost:4200
docker run --rm -p 4200:80 dhan-algo-frontend
```

Alternatively, use `docker-compose up` to build and start the container.

## Running unit tests

Run `npm test` (or `ng test`) to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

This project is licensed under the [MIT License](LICENSE).
