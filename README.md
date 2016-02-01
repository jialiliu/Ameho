## Ameho - A personal Ghost theme

### Description

Refacting the original work of [Yabu No Naka](http://themeforest.net/item/yabu-no-naka-a-responsive-ghost-theme/6813025). **Yabu no Naka** is a [ghost](http://ghost.org) theme designed and coded by Hermit.

* 100% Responsive and ready for Retina
* Customizable sidebar menu and site descriptions
* 10+ social network icons
* Ghost 0.7 compatible
* Google Fonts

<br />

<hr />

<h3 id="index">Index of Contents</h3>

1. [Get Start](#start)
2. [How to install](#install)
3. [HTML Structure](#html-structure)
4. [CSS Structure](#css-structure)
5. [Javascript](#javascript)
6. [Theme Settings](#settings)
7. [Customization](#customize)
8. [Sources and Credits](#credits)

<br />

<hr />

<h3 id="start">Get Start</h3>

#### 1. Prepare for requirements

Install [Nodejs](https://nodejs.org/).

Install Jshint
```shell
npm install jshint -gd
```

Install **Gulp**:
```shell
npm install gulp -d
cd theme_path
npm install -d
```

Install gscan
```shell
npm install gscan -gd
```

#### 2. Run gulp default watch task:
```shell
gulp
```

[Back to index](#index)

<br />

<hr />

<h3 id="install">How to Install</h3>

Installation of ghost theme is quite simple if you've already set up your ghost blog correctly on your server or localhost. If you haven't done so, here are some articles I recommend you to read:

* Official instruction on ghost.org [http://docs.ghost.org/installation/](http://docs.ghost.org/installation/)
* Ghost on Linode by Rune Gulbrandsøy [http://ghostblog.be/ghost-on-linode/](http://ghostblog.be/ghost-on-linode/)

The general steps of ghost theme installation:

1. Configure (and customize) your theme;

2. Upload or copy the folder contains your theme to <code>/ghost/content/themes/</code> (You do not need to upload `readme.html`, `readme.md` and the folder `/docs`);

3. Restart your instance of ghost. There are two options (as far as I know):
    * If you run ghost blog via <code>forever</code>, you can direct to your <code>/ghost</code> directory and restart the instance by typing in this command: <code>sudo forever restart index.js</code>
    * If you run ghost as a startup service on your server, you may use <code>sudo service ghost restart</code> (under Ubuntu, should be similar on other distributions). This is the way I do and recommend.

[Back to index](#index)

<br />

<hr />

<h3 id="html-structure">HTML Structure</h3>

Here is the basic HTML structure of **Ameho**:

    <body>

        <header id="header">
            Logo
        </header>

        <div id="container" class="cf">

            <section id="sidebar">
                Sidebar
            </section>

            <main class="post-list" role="main">
                Post and Pagination
            </main>

        </div>

        <footer id="footer">
            Copyright info
        </footer>

    </body>

In the `#container` div, `#sidebar` and `.post-list` are floating blocks, which makes the two-column layout.

[Back to index](#index)

<br />

<hr />

<h3 id="css-structure">CSS Structure</h3>

The CSS structure of this theme is arranged in the following manner:

    /* === Include === */

        Some code

    /* === Reset === */

        Some code

    /* === Header === */

        Some code

    /* === Container === */

        Some code

    /* === Sidebar === */

        Some code

    ...etc.

    /* === Responsive === */

        Some code

The last block of CSS code handles responsive features.

[Back to index](#index)

<br />

<hr />

<h3 id="javascript">JavaScript</h3>

There is two Javascript file contained in this theme, `/assets/js/jquery.fitvids.js` and `/assets/js/all.js`.

`all.js` contains theme settings, codes that parse theme settings to htmls and a little bit of visual effect codes.

`/assets/js/jquery.fitvids.js` is the jquery plugin I used for responsive embed video.

Both files are loaded at the bottom of page, right above the closing tag `</body>`.

Ghost will automatically load jQuery into the page (before our js files), this is handled by `{{ghost_foot}}`. Please do not flip the order of this line of code with the other javascript-loading tags.

Of course, feel free to edit `all.js` :)

[Back to index](#index)

<br />

<hr />

<h3 id="settings">Theme Settings</h3>

All the theme settings of **Ameho** are enabled using a function `Ysettings` located in <code>/yabu/assets/js/all.js</code>.

The options locate in `js/options.json`. You are going to modify this json file to set your options.

Here is the syntax we use to set the options:

* **"y_author"**
    * Set author's name
    * Default: "John Smith"
    * Example:

            "y_author": "Art Chen"

* **y_right_sidebar**
    * Set `true` if you want the sidebar floating to right
    * Default: false
    * Example:

            "y_right_sidebar": true

* **y_right_logo**
    * Set `true` if you want the logo floating to right
    * Default: false
    * Example:

            "y_right_logo": false


#####Special instructions on site menu settings (please read)

Since ghost v0.5.9 we finally got official support for navigation settings. You can make your main menu directly from admin panel!

* **y_description**
    * Set the "set" key to `true` if you want to customize the style of your site description (i.e. use HTML+CSS). Please be sure to write every line of your description inside a pair of <code>\<p\></code> tag. If "set" is set to `false` (by default), the blog description from ghost dashboard will be displayed.
    * Default: false

            "y_description": {
                "set": true,
                "desc": "<p>Hermit Chen</p><p>Portfolio @ rakugaki.me</p><p>Themeforest ID = otakism</p><p>Thank you for previewing my theme.</p>",
                "textalign": "center"
            }

* **y_social**
    * Add social network icons displayed in the bottom of page. I recommend a total number of less than 10 icons
    * Examples: only enabling facebook icon and github icon

            "y_social": [
                {
                    "name": "facebook",
                    "url": "YOUR FACEBOOK PAGE'S URL"
                },
                {
                    "name": "github",
                    "url": "#"
                }
            ]

##### Put it together

Just to demonstrate how should a valid theme setting look like.

    var theme_options = {
        "y_author": "Art Chen",
        "y_description": {
            "set": true,
            "desc": "<p>a</p><p>r</p><p>t</p>",
            "textalign": "center"
        },
        "y_social": [
            {
                "name": "facebook",
                "url": "#"
            },
            {
                "name": "github",
                "url": "#"
            }
        ]
    }

\* **Please be aware that only correctly formatted settings can be parsed properly.**

\* **Please compare your settings with the above example carefully. Even a dropped comma could ruin everything.**

[Back to index](#index)

<br />

<hr />

<h3 id="customize">Customization</h3>

If you would like to make some changes to **Ameho**, especially the CSS styling, you can either create a new custom CSS file, or edit the original style.css directly. If you choose to create a new stylesheet, for example `custom.css`, you may link it to the page by adding the following line of code right below the `screen.css`:

    ...

    <link rel="stylesheet" type="text/css" href="{{asset "css/screen.css"}}" />
    <link rel="stylesheet" type="text/css" href="{{asset "css/custom.css"}}" />

    ...

Please be sure to put your file in `/asset/css` directory.

Modifying styles is simple if you know how to write CSS. For example, if you want to change the color of hyperlink when it is hovered, you may write these code:

    a:hover{
        color:rgba(38,135,133,0.9);
    }

This will work for those hyperlinks that haven't been set a specific "hovering color". If there is already a style defined for the element you want to make changes to, you need to find that line of code and modify it.

If you are writing in your own `custom.css`, you need to use a selector that is at least as specific as the original one (I know it sounds complicated...but it is not actually). For instance, you want to change the hovering effect of post title, but it has already been defined in `screen.css` as follows:

    .post-title a:hover h3{
        color:rgba(38,135,133,0.9);
    }

In this case, you have to (at least) write

    .post-title a:hover h3{
        color: /* Your Favorite Color */;
    }

Rather than

    a:hover h3{
        color: /* Your Favorite Color */;
    }

This is because the browser will follow the most recently loaded (this is why we put `custom.css` after `screen.css`) and the most specific CSS code.

I would like to recommend you to use Google Chrome's `Inspect Element` function while you are editing your theme. You can invoke it by right-clicking on any element you want to inspect, it is (usually) the last option in the menu.

[Back to index](#index)

<br />

<hr />

<h3 id="credits">Sources and Credits</h3>

I've use these images or files files as listed:

* `/assets/images/social.svg` - icons from [icomoon.io](http://icomoon.io/)
* `/assets/js/jquery.fitvids.js` - [FitVids.js](https://github.com/davatron5000/FitVids.js) by @ChrisCoyier, @davatron5000, @TrentWalton, @raygunray (on Github)

[Back to index](#index)
