//
//  Copyright 2019 - 2020 The XOrange Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Imports.
//

//  Import modules.
const FS = require("fs");
const Path = require("path");
const XRTLibTraverse = require("xrtlibrary-traverse");
const Util = require("util");

//
//  Private functions.
//

/**
 *  Read default raw configuration.
 * 
 *  @return {Object} - The raw.
 */
function ReadDefaultRawConfiguration() {
    //  Get the default path.
    let defaultFile = Path.join(
        __dirname,
        "model.default.json"
    );

    //  Read the configuration file.
    let cfg = null;
    try {
        cfg = FS.readFileSync(defaultFile);
    } catch (error) {
        throw new Error(Util.format(
            "Read model default configuration file error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    //  Parse the configurations.
    let rst = null;
    try {
        rst = JSON.parse(cfg);
    } catch (error) {
        throw new Error(Util.format(
            "Invalid default model configuration. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return rst;
}

//
//  Classes.
//

/**
 *  Model configuration error.
 * 
 *  @constructor
 *  @extends {Error}
 *  @param {String} [message] - The message.
 */
function ModelConfigurationError(message) {
    //  Let parent class initialize.
    if (arguments.length > 0) {
        Error.call(this, message);
        this.message = message;
    } else {
        Error.call(this);
        this.message = "Unknown error.";
    }
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
}

/**
 *  Model pool connection.
 * 
 *  @constructor
 *  @param {Number} max - Maximum number of connection in pool. 
 *  @param {Number} min - Minimum number of connection in pool.
 *  @param {Number} idle - The maximum time, in milliseconds, that a connection 
 *                         can be idle before being released.
 *  @param {Number} acquire - The maximum time, in milliseconds, that pool will 
 *                            try to get connection before throwing error.
 *  @param {Number} evict - The time interval, in milliseconds, after which 
 *                          sequelize-pool will remove idle connections.
 */
function ModelPoolConfiguration(
    max,
    min,
    idle,
    acquire,
    evict
) {
    //
    //  Public methods.
    //
    
    /**
     *  Get the maximum number of connection in pool.
     * 
     *  @return {Number} - The number.
     */
    this.getMax = function() {
        return max;
    };

    /**
     *  Get the minimum number of connection in pool.
     * 
     *  @return {Number} - The number.
     */
    this.getMin = function() {
        return min;
    };

    /**
     *  Get the maximum time, in milliseconds, that a connection can be idle 
     *  before being released.
     * 
     *  @return {Number} - The time.
     */
    this.getIdle = function() {
        return idle;
    };

    /**
     *  Get the maximum time, in milliseconds, that pool will try to get 
     *  connection before throwing error.
     * 
     *  @return {Number} - The time.
     */
    this.getAcquire = function() {
        return acquire;
    };

    /**
     *  Get the time interval, in milliseconds, after which sequelize-pool will 
     *  remove idle connections.
     * 
     *  @return {Number} - The interval.
     */
    this.getEvict = function() {
        return evict;
    };

    /**
     *  Convert to object.
     * 
     *  @return {Object} - The object.
     */
    this.toObject = function() {
        return {
            "max": max,
            "min": min,
            "idle": idle,
            "acquire": acquire,
            "evict": evict
        };
    };
}

/**
 *  Model sync configuration.
 * 
 *  @constructor
 *  @param {Boolean} force - True if each Model will run 'DROP TABLE IF EXISTS', 
 *                           before it tries to create its own table.
 *  @param {Boolean} alter - True if alters tables to fit models.
 */
function ModelSyncConfiguration(
    force,
    alter
) {
    //
    //  Public methods.
    //

    /**
     *  Whether run 'DROP TABLE IF EXISTS', before it tries to create its own 
     *  table.
     * 
     *  @return {Boolean} - True if so.
     */
    this.getForce = function() {
        return force;
    };

    /**
     *  Whether alters tables to fit models
     * 
     *  @return {Boolean} - True if so.
     */
    this.getAlter = function() {
        return alter;
    };

    /**
     *  Convert to object.
     * 
     *  @return {Object} - The object.
     */
    this.toObject = function() {
        return {
            "force": force,
            "alter": alter
        };
    };
}

/**
 *  Model transaction configuration.
 * 
 *  @constructor
 *  @param {String} type - The default transaction type. One of 'DEFERRED', 
 *                         'IMMEDIATE', 'EXCLUSIVE'
 *  @param {String} isolationLevel - The default transaction isolation level. 
 *                                   One of 'READ_UNCOMMITTED','READ_COMMITTED', 
 *                                   'REPEATABLE_READ', 'SERIALIZABLE'.
 */
function ModelTransactionConfiguration(
    type,
    isolationLevel
) {
    /**
     *  Get the default transaction type.
     * 
     *  @return {String} - The transaction type. 
     */
    this.getType = function() {
        return type;
    };

    /**
     *  Get the isolation level.
     * 
     *  @return {String} - The isolation level.
     */
    this.getIsolationLevel = function() {
        return isolationLevel;
    };

    /**
     *  Convert to object.
     * 
     *  @return {Object} - The object.
     */
    this.toObject = function() {
        return {
            "transactionType": type,
            "isolationLevel": isolationLevel
        };
    }
}

/**
 *  Model retry configuration.
 * 
 *  @constructor
 *  @param {Number} max - The time that a failing query is automatically 
 *                        retried.
 */
function ModelRetryConfiguration(
    max
) {
    //
    //  Public methods.
    //

    /**
     *  Get the time that a failing query is automatically retried.
     * 
     *  @return {Number} - The time.
     */
    this.getMax = function() {
        return max;
    };

    /**
     *  Convert to object.
     * 
     *  @return {Object} - The object.
     */
    this.toObject = function() {
        return {
            "max": max
        };
    };
}

/**
 *  Models configurations.
 * 
 *  @constructor
 *  @param {String} host - The host of relational database.
 *  @param {Number} port - The port of the relational database.
 *  @param {String} username - The username which is used to authenticate 
 *                             against the database.
 *  @param {String} password - The password which is used to authenticate 
 *                             against the database.
 *  @param {String} database - The name of database.
 *  @param {String} dialect - The dialect of the database you are connecting to.
 *  @param {String} protocol - The protocol of the relational database.
 *  @param {ModelSyncConfiguration} syncCfg - The model sync configuration.
 *  @param {Boolean} logging - True if show Sequelize logs.
 *  @param {Boolean} omitNull - A flag that defines if null values should be 
 *                              passed to SQL queries or not.
 *  @param {ModelPoolConfiguration} pool - The model pool configuration.
 *  @param {ModelTransactionConfiguration} transactionCfg - The transaction 
 *                                                           configuration.
 *  @param {ModelRetryConfiguration} retryCfg - The retry configuration.
 *  @param {?Object} operatorsAliases - String based operator alias. Pass object 
 *                                      to limit set of aliased operators.
 */
function ModelConfiguration(
    host,
    port,
    username,
    password,
    database,
    dialect,
    protocol,
    syncCfg,
    logging,
    omitNull,
    poolCfg,
    transactionCfg,
    retryCfg,
    operatorsAliases
) {
    //
    //  Public methods.
    //

    /**
     *  Get the host.
     * 
     *  @return {String} - The host.
     */
    this.getHost = function() {
        return host;
    };

    /**
     *  Get the port.
     * 
     *  @return {String} - The port.
     */
    this.getPort = function() {
        return port;
    };

    /**
     *  Get the username.
     * 
     *  @return {String} - The username.
     */
    this.getUsername = function() {
        return username;
    };

    /**
     *  Get the username.
     * 
     *  @return {String} - The username.
     */
    this.getPassword = function() {
        return password;
    };

    /**
     *  Get the database.
     * 
     *  @return {String} - The database.
     */
    this.getDatabase = function() {
        return database;
    };

    /**
     *  Get the dialect.
     * 
     *  @return {String} - The dialect.
     */
    this.getDialect = function() {
        return dialect;
    };

    /**
     *  Get the protocol.
     * 
     *  @return {String} - The protocol.
     */
    this.getProtocol = function() {
        return protocol;
    };

    /**
     *  Get the sync configuration.
     * 
     *  @return {ModelSyncConfiguration} - The configuration.
     */
    this.getSyncConfiguration =function() {
        return syncCfg;
    };

    /**
     *  Whether shows Sequelize logs.
     * 
     *  @return {Boolean} - True if so.
     */
    this.getLogging = function() {
        return logging;
    };

    /**
     *  Whether null values should be passed to SQL queries.
     * 
     *  @return {Boolean} - True if so.
     */
    this.getOmitNull = function() {
        return omitNull;
    };

    /**
     *  Get the configuration of pool.
     * 
     *  @return {ModelPoolConfiguration} - The configuration.
     */
    this.getPoolConfiguration = function() {
        return poolCfg;
    };

    /**
     *  Get the transaction configuration.
     * 
     *  @return {ModelTransactionConfiguration} - The configuration.
     */
    this.getTransactionConfiguration = function() {
        return transactionCfg;
    };

    /**
     *  Get the retry configuration.
     * 
     *  @return {ModelRetryConfiguration} - The configurations.
     */
    this.getRetryConfiguration = function() {
        return retryCfg;
    };

    /**
     *  String based operator alias. Pass object to limit set of aliased 
     *  operators.
     * 
     *  @return {?Object} - True if so.
     */
    this.getOperatorsAliases = function() {
        return operatorsAliases;
    };

    /**
     *  Convert to object.
     * 
     *  @return {Object} - The object.
     */
    this.toObject = function() {
        return {
            "host": host,
            "port": port,
            "username": username,
            "password": password,
            "database": database,
            "dialect": dialect,
            "protocol": protocol,
            "sync": syncCfg.toObject(),
            "logging": logging,
            "omitNull": omitNull,
            "pool": poolCfg.toObject(),
            "transactionType": transactionCfg.getType(),
            "isolationLevel": transactionCfg.getIsolationLevel(),
            "retry": retryCfg.toObject(),
            "operatorsAliases": operatorsAliases
        };
    }
}

//
//  Public functions.
//

/**
 *  Load the default model sync configuration.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if default configuration error.
 *  @return {ModelSyncConfiguration} 
 *      - The configuration.
 */
ModelSyncConfiguration.Default = function() {
    //  Read default raw configuration.
    let cfg = ReadDefaultRawConfiguration();

    let force;
    let alter;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .sub("sync")
                                 .notNull()
                                 .typeOf(Object);
        force = root.sub("force")
                    .notNull()
                    .boolean()
                    .inner();
        alter = root.sub("alter")
                    .notNull()
                    .boolean()
                    .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load default model sync configuration error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelSyncConfiguration(
        force,
        alter
    ); 
}

/**
 *  Load the model sync configuration from raw.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if the configuration or default configuration error.
 *  @param {Object} cfg 
 *      - The raw.
 *  @return {ModelSyncConfiguration} 
 *      - The configuration.
 */
ModelSyncConfiguration.From = function(cfg) {
    //  Load default configuration.
    let dcfg = ModelSyncConfiguration.Default();

    let force;
    let alter;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .notNull()
                                 .typeOf(Object);
        force = root.optionalSub("force", dcfg.getForce())
                    .notNull()
                    .boolean()
                    .inner();
        alter = root.optionalSub("alter", dcfg.getAlter())
                    .notNull()
                    .boolean()
                    .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load model sync configuration error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelSyncConfiguration(
        force,
        alter
    );
}

/**
 *  Load the default model pool configuration.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if default configuration error.
 *  @return {ModelPoolConfiguration} 
 *      - The configuration.
 */
ModelPoolConfiguration.Default = function() {
    //  Read default configuration.
    let cfg = ReadDefaultRawConfiguration();

    let max;
    let min;
    let idle;
    let acquire;
    let evict;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .sub("pool")
                                 .notNull()
                                 .typeOf(Object);
        max = root.sub("max")
                  .notNull()
                  .integer()
                  .inner();
        min = root.sub("min")
                  .notNull()
                  .integer()
                  .inner();
        idle = root.sub("idle")
                   .notNull()
                   .integer()
                   .inner();
        acquire = root.sub("acquire")
                      .notNull()
                      .integer()
                      .inner();
        evict = root.sub("evict")
                    .notNull()
                    .integer()
                    .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load default model pool configuration error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelPoolConfiguration(
        max,
        min,
        idle,
        acquire,
        evict
    );
}

/**
 *  Load the model pool configuration from raw.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if the configuration or default configuration error.
 *  @param {Object} cfg 
 *      - The raw configuration.
 *  @return {ModelPoolConfiguration} 
 *      - The configuration.
 */
ModelPoolConfiguration.From = function(cfg) {
    //  Load default configuration.
    let dcfg = ModelPoolConfiguration.Default();

    let max;
    let min;
    let idle;
    let acquire;
    let evict;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .notNull()
                                 .typeOf(Object);
        max = root.optionalSub("max", dcfg.getMax())
                  .notNull()
                  .integer()
                  .inner();
        min = root.optionalSub("min", dcfg.getMin())
                  .notNull()
                  .integer()
                  .inner();
        idle = root.optionalSub("idle", dcfg.getIdle())
                   .notNull()
                   .integer()
                   .inner();
        acquire = root.optionalSub("acquire", dcfg.getAcquire())
                      .notNull()
                      .integer()
                      .inner();
        evict = root.optionalSub("evict", dcfg.getEvict())
                    .notNull()
                    .integer()
                    .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load model pool configuration error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelPoolConfiguration(
        max,
        min,
        idle,
        acquire,
        evict
    );
}

/**
 *  Load the default model transaction configuration.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if default configuration error.
 *  @return {ModelTransactionConfiguration} 
 *      - The configuration.
 */
ModelTransactionConfiguration.Default = function() {
    let cfg = ReadDefaultRawConfiguration();
    let type;
    let isolationLevel;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .sub("transaction")
                                 .notNull()
                                 .typeOf(Object);
        type = root.sub("type")
                   .notNull()
                   .string()
                   .inner();
        isolationLevel = root.sub("isolation-level")
                             .notNull()
                             .string()
                             .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load default model transaction configuration. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelTransactionConfiguration(
        type,
        isolationLevel
    );
}

/**
 *  Load the model transaction configuration from raw.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if the configuration or default configuration error.
 *  @param {Object} cfg 
 *      - The raw configuration.
 *  @return {ModelTransactionConfiguration} 
 *      - The configuration.
 */
ModelTransactionConfiguration.From = function(cfg) {
    //  Load default configuration.
    let dcfg = ModelTransactionConfiguration.Default();

    let type;
    let isolationLevel;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .notNull()
                                 .typeOf(Object);
        type = root.optionalSub("type", dcfg.getType())
                   .notNull()
                   .string()
                   .inner();
        isolationLevel = root.optionalSub("isolation-level", 
                             dcfg.getIsolationLevel())
                             .notNull()
                             .string()
                             .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load model transaction configuration. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelTransactionConfiguration(
        type,
        isolationLevel
    );
}

/**
 *  Load the default model retry configuration.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if default configuration error.
 *  @return {ModelRetryConfiguration} 
 *      - The configuration.
 */
ModelRetryConfiguration.Default = function() {
    //  Read default configuration.
    let cfg = ReadDefaultRawConfiguration();

    let max;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .sub("retry")
                                 .notNull()
                                 .typeOf(Object);
        max = root.sub("max")
                  .notNull()
                  .integer()
                  .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load model retry configuration error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelRetryConfiguration(max);
}

/**
 *  Load the model retry configuration from raw.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if the configuration or default configuration error.
 *  @param {Object} cfg 
 *      - The raw configuration.
 *  @return {ModelRetryConfiguration} 
 *      - The configuration.
 */
ModelRetryConfiguration.From = function(cfg) {
    let dcfg = ModelRetryConfiguration.Default();

    let max;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .notNull()
                                 .typeOf(Object);
        max = root.optionalSub("max", dcfg.getMax())
                  .notNull()
                  .integer()
                  .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load model retry configuration error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    return new ModelRetryConfiguration(max);
}

/**
 *  Load the default model configuration.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if default configuration error.
 *  @return {ModelConfiguration} 
 *      - The configuration.
 */
ModelConfiguration.Default = function() {
    let cfg = ReadDefaultRawConfiguration();

    let host;
    let port;
    let username;
    let password;
    let database;
    let dialect;
    let protocol;
    let sync;
    let logging;
    let omitNull;
    let pool;
    let transaction;
    let retry;
    let operatorsAliases;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .notNull()
                                 .typeOf(Object);
        host = root.sub("host")
                   .notNull()
                   .string()
                   .inner();
        port = root.sub("port")
                   .notNull()
                   .integer()
                   .inner();
        username = root.sub("username")
                       .string()
                       .inner();
        password = root.sub("password")
                       .string()
                       .inner();
        database = root.sub("database")
                       .string()
                       .inner();
        dialect = root.sub("dialect")
                      .notNull()
                      .string()
                      .inner();
        protocol = root.sub("protocol")
                       .notNull()
                       .string()
                       .inner();
        sync = root.sub("sync")
                   .notNull()
                   .typeOf(Object)
                   .inner();
        logging = root.sub("logging")
                      .notNull()
                      .boolean()
                      .inner();
        omitNull = root.sub("omit-null")
                       .notNull()
                       .boolean()
                       .inner();
        pool = root.sub("pool")
                   .notNull()
                   .typeOf(Object)
                   .inner();
        transaction = root.sub("transaction")
                          .notNull()
                          .typeOf(Object)
                          .inner();
        retry = root.sub("retry")
                    .notNull()
                    .typeOf(Object)
                    .inner();
        operatorsAliases = root.sub("operators-aliases")
                               .typeOf(Object)
                               .inner();
    } catch (error) {
        throw new ModelConfigurationError(
            error.message || "Unknown error."
        );
    }

    let syncCfg = ModelSyncConfiguration.From(sync);
    let poolCfg = ModelPoolConfiguration.From(pool);
    let transactionCfg = ModelTransactionConfiguration.From(transaction);
    let retryCfg = ModelRetryConfiguration.From(retry);

    return new ModelConfiguration(
        host,
        port,
        username,
        password,
        database,
        dialect,
        protocol,
        syncCfg,
        logging,
        omitNull,
        poolCfg,
        transactionCfg,
        retryCfg,
        operatorsAliases
    );
}

/**
 *  Load the model configuration from raw.
 * 
 *  @throws {ModelConfigurationError}
 *      - Raised if the configuration or default configuration error.
 *  @param {Object} cfg 
 *      - The raw configuration.
 *  @return {ModelConfiguration} 
 *      - The configuration.
 */
ModelConfiguration.From = function(cfg) {
    //  Load the default model configuration.
    let dcfg = ModelConfiguration.Default();

    let host;
    let port;
    let username;
    let password;
    let database;
    let dialect;
    let protocol;
    let sync;
    let logging;
    let omitNull;
    let pool;
    let transaction;
    let retry;
    let operatorsAliases;
    try {
        let root = XRTLibTraverse.WrapObject(cfg)
                                 .notNull()
                                 .typeOf(Object);
        host = root.optionalSub("host", dcfg.getHost())
                   .notNull()
                   .string()
                   .inner();
        port = root.optionalSub("port", dcfg.getPort())
                   .notNull()
                   .integer()
                   .inner();
        username = root.optionalSub("username", dcfg.getUsername())
                       .string()
                       .inner();
        password = root.optionalSub("password", dcfg.getPassword())
                       .string()
                       .inner();
        database = root.optionalSub("database", dcfg.getDatabase())
                       .string()
                       .inner();
        dialect = root.optionalSub("dialect", dcfg.getDialect())
                      .notNull()
                      .string()
                      .inner();
        protocol = root.optionalSub("protocol", dcfg.getProtocol())
                       .notNull()
                       .string()
                       .inner();
        sync = root.optionalSub("sync", {})
                   .notNull()
                   .typeOf(Object)
                   .inner();
        logging = root.optionalSub("logging", dcfg.getLogging())
                      .notNull()
                      .boolean()
                      .inner();
        omitNull = root.optionalSub("omit-null", dcfg.getOmitNull())
                       .notNull()
                       .boolean()
                       .inner();
        pool = root.optionalSub("pool", {})
                   .notNull()
                   .typeOf(Object)
                   .inner();
        transaction = root.optionalSub("transaction", {})
                          .notNull()
                          .typeOf(Object)
                          .inner();
        retry = root.optionalSub("retry", {})
                    .notNull()
                    .typeOf(Object)
                    .inner();
        operatorsAliases = root.optionalSub("operators-aliases", 
                               dcfg.getOperatorsAliases())
                               .typeOf(Object)
                               .inner();
    } catch (error) {
        throw new ModelConfigurationError(Util.format(
            "Load model configuration error. (error = \"%s\")",
            error.message || "Unknown error."
        ));
    }

    //  Load the sub configuration.
    let syncCfg = ModelSyncConfiguration.From(sync);
    let transactionCfg = ModelTransactionConfiguration.From(transaction);
    let poolCfg = ModelPoolConfiguration.From(pool);
    let retryCfg = ModelRetryConfiguration.From(retry);

    return new ModelConfiguration(
        host,
        port,
        username,
        password,
        database,
        dialect,
        protocol,
        syncCfg,
        logging,
        omitNull,
        poolCfg,
        transactionCfg,
        retryCfg,
        operatorsAliases
    );
};

//  Export public APIs.
module.exports = {
    "ModelConfiguration": ModelConfiguration 
};
