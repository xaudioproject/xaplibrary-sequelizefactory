# XAPLibrary-SequelizeFactory

## Introduction

This library is a sequelize factory for model layer.

## Installation

To install thsi package, you can use NPM by typing following command:

```
npm install /path/to/xaplibrary-sequelizefactory-$(PACKAGE_VERSION).tgz --save
```

Then you can import this library in your JavaScript code:

``` JavaScript
const XAPLibAsync = require("xaplibrary-sequelizefactory");
```

## Example

You can build your own 'sequelize' object as following:

``` JavaScript
let factory = new SequelizeFactory();

let sequelize = await factory.create({
    "username": "xxx",
    "password": "xxx",
    "host": "127.0.0.1",
    "port": 3306,
    "database": "xxx",
    "dialect": "mysql",
    "logging": false,
    "pool": {
        "max": 5,
        "min": 0,
        "acquire": 30000,
        "idle": 10000
    }
});
```

## Configuration

The documention of sequelize configuration is as following:

| Name                        | Type    | Attribute                              | Description                                                                                                                                        |
|-----------------------------|---------|----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| host                        | String  | Optional. Default is 'localhost'.      | The host of relational database.                                                                                                                   |
| port                        | Integer | Optional. Default is 3306.             | The port of the relational database.                                                                                                               |
| username                    | String  | Optional. Default is null.             | The username which is used to authenticate against the database.                                                                                   |
| password                    | String  | Optional. Default is null.             | The password which is used to authenticate against the database.                                                                                   |
| database                    | String  | Optional. Default is null.             | The name of database.                                                                                                                              |
| dialect                     | String  | Optional. Default is 'mysql'.          | The dialect of the database you are connecting to.                                                                                                 |
| protocol                    | String  | Optional. Default is 'tcp'.            | The protocol of the relational database.                                                                                                           |
| sync                        | Object  | Optional. Default is '{}'              | Default options for sequelize.sync                                                                                                                 |
| sync.force                  | Boolean | Optional. Default is 'false'.          | If force is true, each Model will run 'DROP TABLE IF EXISTS', before it tries to create its own table                                              |
| sync.alter                  | Boolean | Optional. Default is 'false'           | Alters tables to fit models. Not recommended for production use. Deletes data in columns that were removed or had their type changed in the model. |
| logging                     | Boolean | Optional. Default is 'false'           | True if show Sequelize logs.                                                                                                                       |
| pool                        | Object  | Optional. Default is '{}'              | Sequelize connection pool configuration.                                                                                                           |
| pool.max                    | Integer | Optional. Default is 5.                | Maximum number of connection in pool.                                                                                                              |
| pool.min                    | Integer | Optional. Default is 0.                | Minimum number of connection in pool.                                                                                                              |
| pool.idle                   | Integer | Optional. Default is 10000.            | The maximum time, in milliseconds, that a connection can be idle before being released.                                                            |
| pool.acquire                | Integer | Optional. Default is 60000             | The maximum time, in milliseconds, that pool will try to get connection before throwing error.                                                     |
| pool.evict                  | Integer | Optional. Default is 1000.             | The time interval, in milliseconds, after which sequelize-pool will remove idle connections.                                                       |
| transaction                 | Object  | Optional. Default is '{}'.             | Default transaction option.                                                                                                                        |
| transaction.type            | String  | Optional. Default is 'DEFERRED'.       | Set the default transaction type. One of 'DEFERRED', 'IMMEDIATE', 'EXCLUSIVE'.                                                                     |
| transaction.isolation-level | String  | Optional. Default is 'READ_COMMITTED'. | Set the default transaction isolation level. One of 'READ_UNCOMMITTED', 'READ_COMMITTED', 'REPEATABLE_READ', 'SERIALIZABLE'.                       |
| retry                       | Object  | Optional. Default is '{}'.             | Set of flags that control when a query is automatically retried.                                                                                   |
| retry.max                   | Integer | Default is 4.                          | How many times a failing query is automatically retried. Set to 0 to disable retrying on SQL_BUSY error.                                           |

## API

### (Class) SequelizeFactoryError

Sequelize factory error.

<u>Extend(s)</u>:
 - *Error*

### (Class) SequelizeFactoryConfigurationError

Sequelize factory configuration error.

<u>Extend(s)</u>:
 - *SequelizeFactoryError*

### (Class) SequelizeFactoryAuthenticateError

Sequelize factory authenticate error.

<u>Extend(s)</u>:
 - *SequelizeFactoryError*

### (Class) SequelizeFactory

Sequelize factory.

#### factory.create(cfg, [waitForAuthenticate])

Create a new sequelize object.

<u>Exception(s)</u>:
 - SequelizeFactoryConfigurationError: Raised if configuration is invalid.
 - SequelizeFactoryAuthenticateError: Raised if sequelize authentication was failed.

<u>Parameter(s)</u>:
 - cfg (*Object*): The configuration object. Document is [here](#Configuration)
 - waitForAuthenticate(*Boolean*): True if wait for sequelize authenticate.

<u>Return value</u>:
 - The promise object which resolves sequelize object or rejects if occurred error.
