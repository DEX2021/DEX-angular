# DEX

Project managed in Clubhouse: [Clubhouse](https://app.clubhouse.io/dex2021)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

# Required Applications
- [Ganache](https://www.trufflesuite.com/ganache)

<<<<<<< HEAD
# Required System Wide Dependencies  
- Truffle: `npm i -g truffle`
=======
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## DEX2021 Commands

truffle compile // compiles the smart contracts

truffle migrate // migrations is changing the blockchains state to another state. simular to database migrations by adding colums or rows

truffle migrate --reset // if you have an existing copy of the smart contracts the blockchain, this will deploy a new copy of the smart contract onto the blockchain since it cannot be updated(immutable) hence copy and replace.

truffle console // opens truffle console in order to connect to web3 and so forth.

truffle test // runs all tests for the DEX projects.

truffle exec Scripts/seed-exchange.js // runs seed exchange script that seeds the exchange with data and dummy trades.
>>>>>>> Sven/Setup
