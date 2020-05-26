//
//  Copyright 2019 - 2020 The XOrange Studio. All rights reserved.
//  Use of this source code is governed by a BSD-style license that can be
//  found in the LICENSE.md file.
//

//
//  Imports.
//

//  Imported modules.
const CfgModel = require("./../configuration/model");
const Sequelize = require("sequelize");

//  Imported classes.
const ModelConfiguration = CfgModel.ModelConfiguration;

/**
 *  Sequelize factory error.
 * 
 *  @constructor
 *  @extends {Error}
 *  @param {String} [message] - The message.
 */
function SequelizeFactoryError(message) {
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
 *  Sequelize factory configuration error.
 * 
 *  @constructor
 *  @extends {SequelizeFactoryError}
 *  @param {String} [message] - The message.
 */
function SequelizeFactoryConfigurationError(message) {
    //  Let parent class initialize.
    SequelizeFactoryError.apply(this, arguments);
}

/**
 *  Sequelize factory authenticate error.
 * 
 *  @constructor
 *  @extends {SequelizeFactoryError}
 *  @param {String} [message] - The message.
 */
function SequelizeFactoryAuthenticateError(message) {
    //  Let parent class initialize.
    SequelizeFactoryError.apply(this, arguments);
}

/**
 *  Sequelize factory.
 */
function SequelizeFactory() {

    /**
     *  Create factory.
     * 
     *  @throws {SequelizeFactoryConfigurationError}
     *      - Raised if configuration is invalid.
     *  @throws {SequelizeFactoryAuthenticateError}
     *      - Raised if sequelize authenticate was failed.
     *  @param {Object} cfg 
     *      - The configuration object.
     *  @param {Boolean} [waitForAuthenticate] 
     *      - True if wait for sequelize authenticate.
     *  @return {Promise<Sequelize>} 
     *      - The promise object which resolves sequelize object or rejects if 
     *        occurred error.
     */
    this.create = async function(cfg, waitForAuthenticate = true) {
        /**
         *  Model configuration.
         * 
         *  @type {ModelConfiguration}
         */
        let modelCfg;
        try {
            //  Load the model configuration.
            modelCfg = ModelConfiguration.From(cfg);
        } catch (error) {
            throw new SequelizeFactoryConfigurationError(error);
        }

        //  Create the new sequelize.
        let sequelize = new Sequelize(modelCfg.toObject());

        if (waitForAuthenticate) {
            //  Wait for authenticate.
            try {
                await sequelize.authenticate();
            } catch (error) {
                throw new SequelizeFactoryAuthenticateError(error.message);
            }
        }

        return sequelize;
    };
}

//  Export public APIs.
module.exports = {
    "Sequelize": Sequelize,
    "SequelizeFactory": SequelizeFactory
};
