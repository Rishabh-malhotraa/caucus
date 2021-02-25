# Nodejs FES Template

# Environment vars

This project uses the following environment variables:

| Name | Description          | Default Value |
| ---- | -------------------- | ------------- |
| CORS | Cors accepted values | "\*"          |

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 8.0.0

# Getting started

- Clone the repository

```
git clone  <git lab template url> <project_name>
```

- Install dependencies

```
cd <project_name>
npm install
```

- Build and run the project

```
npm start
```

Navigate to `http://localhost:8001`

- API Document endpoints

  swagger Spec Endpoint : http://localhost:8001/api-docs

  swagger-ui Endpoint : http://localhost:8001/docs

# TypeScript + Node

The main purpose of this repository is to show a project setup and workflow for writing microservice. The Rest APIs will be using the Swagger (OpenAPI) Specification.

## Getting TypeScript

Add Typescript to project `npm`.

```
npm install -D typescript
```

## Project Structure

The folder structure of this app is explained below:

| Name                | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------- | -------------------------------------------------------------------- |
| **dist**            | Contains the distributable (or output) from your TypeScript build.                               |
| **node_modules**    | Contains all npm dependencies                                                                    |
| **src**             | Contains source code that will be compiled to the dist dir                                       |
| **configuration**   | Application configuration including environment-specific configs                                 |
| **src/controllers** | Controllers define functions to serve various express routes.                                    |
| **src/lib**         | Common libraries to be used across your app.                                                     |
| **src/middlewares** | Express middlewares which process the incoming requests before handling them down to the routes  |
| **src/routes**      | Contain all express routes, separated by module/area of application                              |
| **src/models**      | Models define schemas that will be used in storing and retrieving data from Application database |
| **src/monitoring**  | Prometheus metrics                                                                               |
| **src**/index.ts    | Entry point to express app                                                                       |
| package.json        | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped) | tsconfig.json | Config settings for compiling source code only written in TypeScript |
| tslint.json         | Config settings for TSLint code style checking                                                   |

## Building the project

### Configuring TypeScript compilation

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "outDir": "dist",
    "sourceMap": true
  },

  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts", "test", "node_modules"]
}
```

### Running the build

All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script   | Description                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `start`      | Runs full build and runs node on dist/index.js. Can be invoked with `npm start` |
| `build:copy` | copy the \*.yaml file to dist/ folder                                           |
| `build:live` | Full build. Runs ALL build tasks                                                |
| `build:dev`  | Full build. Runs ALL build tasks with all watch tasks                           |
| `dev`        | Runs full build before starting all watch tasks. Can be invoked with `npm dev`  |
| `test`       | Runs build and run tests using mocha                                            |
| `lint`       | Runs TSLint on project files                                                    |

### Using the debugger in VS Code

Node.js debugging in VS Code is easy to setup and even easier to use.
Press `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/dist/index.js",
      "preLaunchTask": "tsc: build - tsconfig.json",

      "outFiles": ["${workspaceFolder}/dist/*js"]
    },

    {
      // Name of configuration; appears in the launch configuration drop down menu.
      "name": "Run mocha",
      "request": "launch",
      // Type of configuration. Possible values: "node", "mono".
      "type": "node",
      // Workspace relative or absolute path to the program.
      "program": "${workspaceRoot}/node_modules/mocha/bin/_mocha",

      // Automatically stop program after launch.
      "stopOnEntry": false,
      // Command line arguments passed to the program.
      "args": ["--no-timeouts", "--compilers", "ts:ts-node/register", "${workspaceRoot}/test/*"],

      // Workspace relative or absolute path to the working directory of the program being debugged. Default is the current workspace.

      // Workspace relative or absolute path to the runtime executable to be used. Default is the runtime executable on the PATH.
      "runtimeExecutable": null,
      // Environment variables passed to the program.
      "env": { "NODE_ENV": "test" }
    }
  ]
}
```

## Testing

The tests are written in Mocha and the assertions done using Chai

```
"mocha": "3.4.2",
"chai": "4.1.2",
"chai-http": "3.0.0",

```

### Example application.spec.ts

```
import chaiHttp = require("chai-http")
import * as chai from "chai"
import app from './application'

const expect = chai.expect;
chai.use(chaiHttp);


describe('App', () => {
  it('works', (done:Function): void => {
  chai.request(app)
      .get('/api/hello?greeting=world')
      .send({})
      .end((err:Error, res: any): void => {

          expect(res.statusCode).to.be.equal(200);
          expect(res.body.msg).to.be.equal("hello world");
          done();
      });

    });
});
```

### Running tests using NPM Scripts

```
npm run test

```

Test files are created under test folder.

# Swagger

## Specification

The swagger specification file is named as swagger.yaml. The file is located under definition folder.
Example:

```
paths:
  /hello:
    get:
      x-swagger-router-controller: helloWorldRoute
      operationId: helloWorldGet
      tags:
        - /hello
      description: >-
        Returns the current weather for the requested location using the
        requested unit.
      parameters:
        - name: greeting
          in: query
          description: Name of greeting
          required: true
          type: string
      responses:
        '200':
          description: Successful request.
          schema:
            $ref: '#/definitions/Hello'
        default:
          description: Invalid request.
          schema:
            $ref: '#/definitions/Error'
definitions:
  Hello:
    properties:
      msg:
        type: string
    required:
      - msg
  Error:
    properties:
      message:
        type: string
    required:
      - message
```

### Highlights of the swagger.yaml File

- /hello:

  Specifies how users should be routed when they make a request to this endpoint.

- x-swagger-router-controller: helloWorldRoute

  Specifies which code file acts as the controller for this endpoint.

- get:

  Specifies the method being requested (GET, PUT, POST, etc.).

- operationId: hello

  Specifies the direct method to invoke for this endpoint within the controller/router

- parameters:

  This section defines the parameters of your endpoint. They can be defined as path, query, header, formData, or body.

- definitions:
  This section defines the structure of objects used in responses or as parameters.

## Swagger Middleware

The project is using npm module `swagger-tools` that provides middleware functions for metadata, security, validation and routing, and bundles Swagger UI into Express.

```
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
        // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
        app.use(middleware.swaggerMetadata());

        // Validate Swagger requests
        app.use(middleware.swaggerValidator({}));

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter(options));

        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi());
        cb();

    })
```

- Metadata

  Swagger extends the Express request object, so that each route handler has access to incoming parameters that have been parsed based on the spec, as well as additional Swagger-generated information from the client.

  Any incoming parameters for the API call will be available in `req.swagger` regardless of whether they were transmitted using query, body, header, etc.

- Validator

  Validation middleware will only route requests that match paths in Swagger specification exactly in terms of endpoint path, request mime type, required and optional parameters, and their declared types.

- Swagger Router

  The Swagger Router connects the Express route handlers found in the controller files on the path specified, with the paths defined in the Swagger specification (swagger.yaml). The routing looks up the correct controller file and exported function based on parameters added to the Swagger spec for each path.

  Here is an example for a hello world endpoint:

  ```
  paths:
  /hello:
      get:
      x-swagger-router-controller: helloWorldRoute
      operationId: helloWorldGet
      tags:
        - /hello
      description: >-
        Returns the current weather for the requested location using the
        requested unit.
      parameters:
        - name: greeting
          in: query
          description: Name of greeting
          required: true
          type: string
      responses:
        '200':
          description: Successful request.
          schema:
            $ref: '#/definitions/Hello'
        default:
          description: Invalid request.
          schema:
            $ref: '#/definitions/Error'
  ```

  The fields `x-swagger-router-controller` will point the middleware to a `helloWorldRoute.ts` file in the route's directory, while the `operationId` names the handler function to be invoked.

- Swagger UI

  The final piece of middleware enables serving of the swagger-ui interface direct from the Express server. It also serves the raw Swagger schema (.json) that clients can consume. Paths for both are configurable.
  The swagger-ui endpoint is acessible at /docs endpoint.

# TSLint

TSLint is a code linter that helps catch minor code quality and style issues.

## TSLint rules

All rules are configured through `tslint.json`.

## Running TSLint

To run TSLint you can call the main build script or just the TSLint task.

```
npm run build:live   // runs full build including TSLint
npm run lint  // runs only TSLint
```

# Common Issues

## npm install fails

The current solution has an example for using a private npm repository. if you want to use the public npm repository, remove the .npmrc file.
