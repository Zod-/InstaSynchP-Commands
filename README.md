InstaSynchP-Commands
====================

Plugin for custom commands

Framework
---------
The `commands` object can be used to bind custom commands, grab information and execute on them.
Commands will be queued so the user doesn't get disconneted for flood detection. Every 1 second 4 commands will be sent.

The core will automatically load commands from `this.commands` when it loads e.g.:
```javascript
this.commands = {
    "'command": {
        'hasArguments': true,
        'type': 'mod',
        'reference': this,
        'description': 'description',
        'callback': this.execute
    }
};
```

#### `commands.bind`
```javascript
commands.bind({
    "'command": {
        'hasArguments': true,
        'type': 'mod',
        'reference': this,
        'description': 'description',
        'callback': function(){
            //logic
        }
    }
});
```
Commands with `hasArguments: true` will be instantly sent to chat when using autocomplete and `type: mod` commands will only show up when you are a mod.
#### `commands.get`
```javascript
commands.get("'command");
```
#### `commands.getAll`
```javascript
commands.getAll();
```
#### `commands.execute`
```javascript
commands.execute("'command", 'arg1', 'arg2');
```

Public Variables
---------
* `commands.commandMap` containing all the bound commands
* `commands.commandQueue` queue containing the to be sent commands


License
-----------
The MIT License (MIT)<br>

&lt;InstaSynch - Watch Videos with friends.&gt;<br>
Copyright (c) 2014 InstaSynch

&lt;Bibbytube - Modified InstaSynch client code&gt;<br>
Copyright (C) 2014  Zod-

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
