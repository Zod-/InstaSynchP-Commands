// ==UserScript==
// @name        InstaSynchP Commands
// @namespace   InstaSynchP
// @description Plugin for custom commands

// @version     1
// @author      Zod-
// @source      https://github.com/Zod-/InstaSynchP-Commands
// @license     MIT

// @include     http://*.instasynch.com/*
// @include     http://instasynch.com/*
// @include     http://*.instasync.com/*
// @include     http://instasync.com/*
// @grant       none
// @run-at      document-start

// @require     https://greasyfork.org/scripts/5647-instasynchp-library/code/InstaSynchP%20Library.js
// ==/UserScript==

function Commands(version) {
    "use strict";
    this.version = version;
    this.name = "InstaSynchP Commands";
    this.commandMap = {};
}

Commands.prototype.executeOnceCore = function () {
    "use strict";
    var th = this;
    window.commands = {
        //add a command
        bind: function (commands) {
            for (var command in commands) {
                if (commands.hasOwnProperty(command)) {
                    commands[command].name = command;
                    th.commandMap[command.toLowerCase()] = commands[command];
                }
            }
        },
        //get the commands
        get: function (key) {
            return th.commandMap[key.toLowerCase()];
        },
        //get all commands
        getAll: function () {
            return th.commandMap;
        },
        //get command info
        description: function (key) {
            return th.commandMap[key].description;
        },
        //execute a command
        execute: function (key, args) {
            key = key.toLowerCase();
            if (th.commandMap.hasOwnProperty(key)) {
                //send the event to the site
                window.postMessage(JSON.stringify({
                    action: 'ExecuteCommand',
                    data: {
                        parameters: args
                    }
                }), "*");
            }
        }
    };

    /*{
        "'command" = {
            'hasArguments':true,
            'type':'mod',
            'sendToChat':false,
            'description':'description',
            'callback': function(){
            }
        };
    }*/

    var defaultCommands = {
        "'resynch": {},
        "'toggleFilter": {},
        "'toggleAutosynch": {},
        "'togglePlaylistLock": {'type':'mod'},
        "'kick": {'hasArguments':true,'type':'mod'},
        "'ban": {'hasArguments':true,'type':'mod'},
        "'unban": {'hasArguments':true,'type':'mod'},
        "'clean": {'type':'mod'},
        "'remove": {'hasArguments':true,'type':'mod'},
        "'purge": {'hasArguments':true,'type':'mod'},
        "'move": {'hasArguments':true,'type':'mod'},
        "'play": {'hasArguments':true,'type':'mod'},
        "'pause": {'type':'mod'},
        "'resume": {'type':'mod'},
        "'seekto": {'hasArguments':true,'type':'mod'},
        "'seekfrom": {'hasArguments':true,'type':'mod'},
        "'setskip": {'hasArguments':true,'type':'mod'},
        "'banlist": {'type':'mod'},
        "'modlist": {'type':'mod'},
        "'leaverban": {'hasArguments':true,'type':'mod'},
        //commented those so you can't accidently use them
        //"'clearbans",
        //"'motd ",
        //"'mod ",
        //"'demod ",
        //"'description ",
        "'next": {'type':'mod'}
    };

    function empty() {
        return undefined;
    }
    //prepare default commands
    for (var command in defaultCommands) {
        if (defaultCommands.hasOwnProperty(command)) {
            defaultCommands[command].description = 'http://instasynch.com/help.php#commands';
            defaultCommands[command].callback = empty;
            defaultCommands[command].sendToChat = false;
            if (!defaultCommands[command].type) {
                defaultCommands[command].type = 'regular';
            }
        }
    }
    //bind them
    commands.bind(defaultCommands);

    //commands gets executed by posting a message to the site and catching it
    //in the script scope
    events.on(th, 'ExecuteCommand', function (data) {
        var command = th.commandMap[data.parameters[0].toLowerCase()];
        command.callback(data.parameters);
        if (!command.sendToChat) {
            $('#cin').val('');
        }
    });
    events.on(th, 'SendChat', function (message) {
        var params = message.split(' ');
        commands.execute(params[0], params);
    });
};


window.plugins = window.plugins || {};
window.plugins.commands = new Commands('1');
