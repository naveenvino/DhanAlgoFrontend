# DhanAlgoFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.
It includes a simple integration with the `trdauto` backend API. The default API
base URLs are defined in the Angular environment files:

- **Development:** `https://localhost:7288/api/TestDhan`
- **Production:** `http://localhost:5037/api/TestDhan`

You can change these values in
`src/environments/environment.ts` and
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

## Development server

Run `npm start` (or `ng serve`) for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` (or `ng test`) to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License

This project is licensed under the [MIT License](LICENSE).
