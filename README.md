frontend-grunt-tasks
====================
Grunt tasks that front-end developers should use to improve website's performance with no configurations and 1 command to run it right away.
## Requires

- NodeJS 
- NPM

    *[How to install](http://howtonode.org/how-to-install-nodejs)*
    
## Installation

- Clone this repository or download with .zip
- Go to this folder and run command:

```bash
npm install
```

## Configuration

After cloning, your folder/file structure look like this:

![Files structrue](http://i.imgur.com/B5i354D.jpg)

If you want to change ``source`` or ``distribution`` folder, go to Gruntfile.js and edit directories

```
	src: 'src', //source
	dist: 'dist', //distribution
```



## Usage

- **DISTRIBUTION**

Minify your all JS, CSS, HTML, images, remove unuse CSS
```bash
grunt build         //recommend
```
Result:

![Files structrue](http://i.imgur.com/TZcrs7S.jpg)


> Files that are joined will be named ``xxx.concat.js`` | ``xxx.concat.css``
> CSS files that are removed unuse will be named ``xxx.uncss.css``

---

Minify and join your all CSS, JS into one
```bash
grunt build:concat
```


> **Notice:** To make sure your CSS, JS files aren't messed up. Please named your files in the order. I recommned: ``$-style.css``. "$" will be replaced by your order. 

Examples: ``1-reset.css | 2-style.css`` ``1-jquery.js | 2-init.js``

-  **LINTER**

Check CSS, JS errors
```bash
grunt lint
```

-  **OTHERS**

Minify all CSS, JS, HTMLs

```bash
grunt min
```
---

Minify all CSS, JS, HTMLs and put CSS, JS into one.
```bash
grunt min:concat
```
