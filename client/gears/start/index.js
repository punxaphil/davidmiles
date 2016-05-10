var router = require('router');
var pages = require('pages');
var bus = require('message-bus');

exports.start = function () {
    var firstRender = true;
    router.on('/', function (ctx) {
            pages.render();
            firstRender = false;
        }
    );
    router.on('/:page', function (ctx) {
            var page = ctx.params.page;
            if (page.indexOf('#') === 0) {
                page = page.substr(1);
                if (!firstRender) {
                    bus.publish('main-content', page);
                } else {
                    firstRender = false;
                    pages.render(page);
                }
            }
        }
    );
};

exports.controllers = [];