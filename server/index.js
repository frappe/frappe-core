const backends = {};
backends.sqlite = require('frappejs/backends/sqlite');
//backends.mysql = require('frappejs/backends/mysql');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const frappe = require('frappejs');
const restAPI = require('./restAPI');
const frappeModels = require('frappejs/models');
const common = require('frappejs/common');
const bodyParser = require('body-parser');
const fs = require('fs');
const { setupExpressRoute: setRouteForPDF } = require('frappejs/server/pdf');
const auth = require('./../auth/auth')();
const morgan = require('morgan');
const { addWebpackMiddleware } = require('../webpack/serve');
const { getAppConfig } = require('../webpack/utils');
<<<<<<< HEAD
<<<<<<< HEAD

frappe.conf = getAppConfig();
=======
const appConfig = getAppConfig();
<<<<<<< HEAD
=======
>>>>>>> Added image upload to rest api
>>>>>>> dde2752... Added image upload to rest api
=======
>>>>>>> d09e216... Add file-loader and indexEntry
=======
const quickthumb = require('quickthumb')


frappe.conf = getAppConfig();
>>>>>>> 7ac6628... Thumbnail creation with imagemagick

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

module.exports = {
    async start({backend, connectionParams, models, authConfig=null}) {
        await this.init();

        if (models) {
            frappe.registerModels(models, 'server');
        }

        // database
        await this.initDb({backend:backend, connectionParams:connectionParams});

        // app
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use(express.static(frappe.conf.distPath));
<<<<<<< HEAD

        app.use('/static', express.static(frappe.conf.staticPath))
=======
        app.use('/static', quickthumb.static(path.resolve(frappe.conf.staticPath), { type: 'resize' }));
>>>>>>> 7ac6628... Thumbnail creation with imagemagick

        app.use(morgan('tiny'));

        if (connectionParams.enableCORS) {
            app.use(cors());
        }

        if(authConfig) {
            this.setupAuthentication(app, authConfig);
        }

        // socketio
        io.on('connection', function (socket) {
            frappe.db.bindSocketServer(socket);
        });
        // routes
        restAPI.setup(app);

        if (process.env.NODE_ENV === 'development') {
            // webpack dev server
            addWebpackMiddleware(app);
        }

        frappe.config.port = frappe.conf.dev.devServerPort;

        // listen
        server.listen(frappe.config.port, () => {
            console.log(`FrappeJS server running on http://localhost:${frappe.config.port}`)
        });

        frappe.app = app;
        frappe.server = server;

        setRouteForPDF();
    },

    async init() {
        frappe.isServer = true;
        await frappe.init();
        frappe.registerModels(frappeModels, 'server');
        frappe.registerLibs(common);

        await frappe.login('Administrator');
    },

    async initDb({backend, connectionParams}) {
        frappe.db = await new backends[backend](connectionParams);
        await frappe.db.connect();
        await frappe.db.migrate();
    },

    setupAuthentication(app, authConfig) {
        app.post("/api/signup", auth.signup);
        app.post("/api/login", auth.login);
        app.use(auth.initialize(authConfig));
        app.all("/api/resource/*", auth.authenticate());
    }
}
