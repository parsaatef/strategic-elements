/**
 * BubbleCloud Component
 */
import React from 'react';
import _ from 'underscore';
import * as d3 from 'd3';
import { format as d3Format } from 'd3-format';
import { interpolateNumber } from 'd3-interpolate';
import {
  // forceCenter,
  forceCollide as D3forceCollide,
  // forceLink,
  forceManyBody as D3forceManyBody,
  // forceRadial,
  forceSimulation as D3forceSimulation,
  forceX as D3forceX,
  forceY as D3forceY
} from 'd3-force';
import { hierarchy as D3hierarchy, pack as D3pack } from 'd3-hierarchy';
import {
  event as d3Event,
  select as d3Select,
  selectAll as d3SelectAll
} from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';
import { drag as D3drag } from 'd3-drag';
import { easeElasticOut, easePolyOut } from 'd3-ease';
import { scaleOrdinal as D3scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import {
  legendColor as D3legendColor,
  legendSize as D3legendSize
} from 'd3-svg-legend';

console.log(d3);

type Props = {
  inputData: object,
  sourceClick: () => void
};

class BubbleCloud extends React.Component<Props> {
  componentDidMount() {
    console.log('------process.env-----', process.env);
    this.renderCloud();
  }

  componentDidUpdate(prevProps) {
    const { inputData } = this.props;

    if (!_.isEqual(prevProps.inputData, inputData)) {
      this.renderCloud();
    }
  }

  renderCloud() {
    // const { type } = this.props;

    // https://naustud.io/tech-stack/
    // https://github.com/trongthanh/techstack
    // Based loosely from this D3 bubble graph https://bl.ocks.org/mbostock/4063269
    // And this Forced directed diagram https://bl.ocks.org/mbostock/4062045
    /* eslint-disable indent */
    /* [
        {
            id: "test" ,
            cat: 'فلزهای قلیایی',
            name: 'D3',
            value: 30,
            icon: 'https://naustud.io/tech-stack/https://naustud.io/tech-stack/img/d3.svg',
            desc: `
                D3.js (or just D3 for Data-Driven Documents) is a JavaScript library for
                producing dynamic, interactive data visualizations in web browsers.
                It makes use of the widely implemented SVG, HTML5, and CSS standards.<br>
                This infographic you are viewing is made with D3.
            `
        }
    ] */
    // Based loosely from this D3 bubble graph https://bl.ocks.org/mbostock/4063269
    // And this Forced directed diagram https://bl.ocks.org/mbostock/4062045
    let data = [
      {
        cat: 'فلزهای قلیایی',
        name: 'طلا',
        value: 30,
        icon: './images/img/AC.png',
        isImage: true,
        desc: `
        <div><span class="rank">رتبه: </span> <span>5</span> از <span>80</span></div>
        <div><span class="rating">امتیاز: </span> <span>3.15</span> از <span>5</span></div>
			`
      },
      {
        cat: 'فلزهای قلیایی',
        name: 'Raphaël',
        value: 10,
        icon: './images/img/AG.png',
        isImage: true,
        desc: `
				Raphaël is a cross-browser JavaScript library that draws Vector graphics for web sites.
				It will use SVG for most browsers, but will use VML for older versions of Internet Explorer.
			`
      },
      {
        cat: 'فلزهای قلیایی',
        name: 'Relay',
        value: 70,
        icon: './images/img/AL.png',
        isImage: true,
        desc: `
				A JavaScript framework for building data-driven React applications.
				It uses GraphQL as the query language to exchange data between app and server efficiently.
				Queries live next to the views that rely on them, so you can easily reason
				about your app. Relay aggregates queries into efficient network requests to fetch only what you need.
			`
      },
      {
        cat: 'فلزهای قلیایی',
        name: 'Three.js',
        value: 40,
        icon: './images/img/AM.png',
        isImage: true,
        desc: `
				Three.js allows the creation of GPU-accelerated 3D animations using
				the JavaScript language as part of a website without relying on
				proprietary browser plugins. This is possible thanks to the advent of WebGL.
			`
      },
      {
        cat: 'فلزات قلیایی خاکی',
        name: 'Lodash',
        value: 30,
        icon: './images/img/AR.png',
        isImage: true,
        desc: `
				Lodash is a JavaScript library which provides <strong>utility functions</strong> for
				common programming tasks using the functional programming paradigm.`
      },
      {
        cat: 'فلزات قلیایی خاکی',
        name: 'Moment JS',
        value: 30,
        icon: './images/img/AS.png',
        isImage: true,
        desc: `
				Handy and resourceful JavaScript library to parse, validate, manipulate, and display dates and times.
			`
      },
      {
        cat: 'فلزات قلیایی خاکی',
        name: 'Numeral.js',
        value: 20,
        icon: './images/img/AT.png',
        isImage: true,
        desc: `
				A javascript library for formatting and manipulating numbers.
			`
      },
      {
        cat: 'فلزات قلیایی خاکی',
        name: 'Redux',
        value: 80,
        icon: './images/img/AU.png',
        isImage: true,
        desc: `
				Redux is an open-source JavaScript library designed for managing
				application state. It is primarily used together with React for building user interfaces.
				Redux is inspired by Facebook’s Flux and influenced by functional programming language Elm.
			`
      },
      {
        cat: 'فلزهای پایه',
        name: 'Angular 2.0',
        value: 30,
        icon: './images/img/B.png',
        isImage: true,
        desc: `
				Angular (commonly referred to as 'Angular 2+' or 'Angular 2') is a TypeScript-based
				open-source front-end web application platform led by the Angular Team at Google and
				by a community of individuals and corporations to address all of the parts of the
				developer's workflow while building complex web applications.
			`
      },
      /* {
			cat: 'فلزهای پایه', name: 'Trails.JS', value: 10,
			icon: '',
		}, */ {
        cat: 'فلزهای پایه',
        name: 'Bootstrap CSS',
        value: 50,
        icon: './images/img/BA.png',
        isImage: true,
        desc: `
				Bootstrap is a free and open-source front-end web framework for designing websites
				and web applications. It contains HTML-and CSS-based design templates for typography,
				forms, buttons, navigation and other interface components, as well as optional JavaScript extensions.
			`
      },
      {
        cat: 'فلزهای پایه',
        name: 'Ember JS',
        value: 10,
        icon: './images/img/BE.png',
        isImage: true,
        desc: `
				Ember.js is an open-source JavaScript web framework, based on the Model–view–viewmodel
				(MVVM) pattern. It allows developers to create scalable single-page web applications by
				incorporating common idioms and best practices into the framework.
			`
      },
      {
        cat: 'فلزهای پایه',
        name: 'ExpressJS',
        value: 30,
        icon: './images/img/BH.png',
        isImage: true,
        desc: `
				Express.js, or simply Express, is a JavaScript framework designed for building web applications and APIs.
				It is the de facto server framework for Node.js.
			`
      },
      /* {
			cat: 'فلزهای پایه', name: 'Foundation', value: 10,
			icon: '',
		}, */ {
        cat: 'فلزهای پایه',
        name: 'Hexo',
        value: 50,
        icon: './images/img/BI.png',
        isImage: true,
        desc: `
				A fast, simple & powerful blog-aware <strong>static website</strong> generator, powered by Node.js.
			`
      },
      {
        cat: 'فلزهای پایه',
        name: 'ReactJS',
        value: 100,
        icon: './images/img/BK.png',
        isImage: true,
        desc: `
				React (sometimes written React.js or ReactJS) is an open-source JavaScript framework maintained by Facebook for building user interfaces.
				React processes only user interface in applications and can be used in combination with other JavaScript libraries
				or frameworks such as Redux, Flux, Backbone...
			`
      },
      /* {
			cat: 'فلزهای پایه', name: 'SenchaTouch', value: 10,
			icon: '',
		}, */ {
        cat: 'فلزهای گرانبها',
        name: 'Atom',
        value: 10,
        icon: './images/img/BR.png',
        isImage: true,
        desc: `
				Atom is a free and open-source text and source code editor for macOS, Linux, and Windows with support
				for plug-ins written in Node.js, and embedded Git Control, developed by GitHub.
				Atom is a desktop application built using web technologies.
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'Google Chrome & Devtool',
        value: 70,
        icon: './images/img/C.png',
        isImage: true,
        desc: `
				<strong>Web development tools (devtool)</strong> allow web developers to test and debug their code.
				At Nau, we use the one come with Google Chrome to debug our apps. It is one the the most powerful
				and sophisticated devtool available.
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'Jenkins CI',
        value: 30,
        icon: './images/img/CA.png',
        isImage: true,
        desc: `
				Jenkins is an open source automation server. Jenkins helps to automate the non-human part of
				the whole software development process, with now common things like continuous integration,
				but by further empowering teams to implement the technical part of a Continuous Delivery.
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'Sublime Text 3',
        value: 100,
        icon: './images/img/CD.png',
        isImage: true,
        desc: `
				Sublime Text 3 is a powerful and cross-platform source code editor. It is well-known for
				introducing the concept of multi-cursor and lots of text editing command. Besides, its
				plugin ecosystem is very rich which allows enhancing productivity to the fullest.
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'Visual Studio Code',
        value: 50,
        icon: './images/img/CE.png',
        isImage: true,
        desc: `
				Visual Studio Code is a cross-platform source code editor developed by Microsoft.
				It includes support for debugging, embedded Git control, syntax highlighting,
				intelligent code completion, snippets, and code refactoring. Its extensions eco system is
				growing quickly and it is becoming the best Front End editors out there.
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'Performance Tooling',
        value: 30,
        icon: './images/img/CF.png',
        isImage: true,
        desc: `
				At Nau, web performance is our top priority when development web sites and applications.
				We're practicing code optimization and Front End delivery optimization from day 1.
				To measure the resuslts, we use several tools to audit and benchmark our applications,
				including (but not limit to): Chrome devtool timeline & audit, Google PageSpeed Insights, Web Page Test, Website Grader...
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'Yeoman generator for Nau Workflow',
        value: 20,
        icon: './images/img/CI.png',
        isImage: true,
        desc: `
				Yeoman is an open source, command-line interface set of tools mainly used to generate
				structure and scaffolding for new projects, especially in JavaScript and Node.js.
				At Nau, we have developed a Yeoman generator that help quickly set up new projects aligned with
				Nau's conventions and standards.
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'live-server',
        value: 30,
        icon: './images/img/CM.png',
        isImage: true,
        desc: `
				A Node.js-based developer web server for quickly test apps and web pages with some
				magic of 'auto-reload' on the browser.
			`
      },
      {
        cat: 'فلزهای گرانبها',
        name: 'PostCSS',
        value: 30,
        icon: './images/img/CN.png',
        isImage: true,
        desc: `
				PostCSS is a software development tool that uses JavaScript-based plugins to automate routine CSS operations.<br>
				We use PostCSS mainly for auto-vendor-prefixing, but very soon we'll use it for NextCSS compilation.
			`
      },
      {
        cat: 'عناصر نادر خاکی',
        name: 'Elastic Search',
        value: 10,
        icon: './images/img/CO.png',
        isImage: true,
        desc: `
				A specialized database software for high performance search queries.
			`
      },
      {
        cat: 'عناصر نادر خاکی',
        name: 'Keystone CMS',
        value: 50,
        icon: './images/img/CR.png',
        isImage: true,
        desc: `
				The de-facto CMS system for website built with Node.js. It can be compared with
				Wordpress of PHP language.
			`
      },
      {
        cat: 'عناصر نادر خاکی',
        name: 'KoaJS',
        value: 10,
        icon: './images/img/CS.png',
        isImage: true,
        desc: `
				The advanced and improved version of ExpressJS, with leaner middlewares architecture
				thanks to the avent of ES6 generators.
			`
      },
      {
        cat: 'عناصر نادر خاکی',
        name: 'Loopback',
        value: 30,
        icon: './images/img/CU.png',
        isImage: true,
        desc: `
				Powerful API-focused web framework built for Node.js. It feature easy to use configurations
				and auto API documentation page.
			`
      },
      {
        cat: 'عناصر نادر خاکی',
        name: 'Restify',
        value: 20,
        icon: './images/img/DB.png',
        isImage: true,
        desc: `
				High performance API development framework, built for Node.js. It has some convenient wrapper
				to automatically generate admin backoffice site and API documentation page.
			`
      },
      {
        cat: 'عناصر نادر خاکی',
        name: 'MongoDB',
        value: 70,
        icon: './images/img/ER.png',
        isImage: true,
        desc: `
				The de-facto Database solution for JavaScript and Node.js applications. It is a light weight,
				high performance NoSQL database and can be used for small and large websites.
			`
      },
      {
        cat: 'عناصر نادر خاکی',
        name: 'NodeJS',
        value: 100,
        icon: './images/img/ES.png',
        isImage: true,
        desc: `
				Node.js is a cross-platform JavaScript runtime environment.
				Node.js allows creation of high performance and high concurrency websites with smaller footprint compared to
				other server-side solution. Node.js ecosystem is growing very fast and is trusted by a lot of big companies who
				are adopting it to enhance current products as well as for new ones.
			`
      },
      {
        cat: 'نافلزها',
        name: 'Docker Platform',
        value: 10,
        icon: './images/img/EU.png',
        isImage: true,
        desc: `
				Docker is an open-source project that automates the deployment of applications inside software containers.
				At Nau, we're still learning this technology to later facilitate easy web app deployments.
			`
      },
      {
        cat: 'نافلزها',
        name: 'MeteorJS',
        value: 80,
        icon: './images/img/F.png',
        isImage: true,
        desc: `
				MeteorJS is a free and open-source JavaScript web framework written using Node.js.
				Meteor allows for rapid prototyping and produces cross-platform (Android, iOS, Web) code.
				It integrates with MongoDB and uses the Distributed Data Protocol and a publish–subscribe
				pattern to automatically propagate data changes to clients without requiring the developer
				to write any synchronization code.
			`
      },
      {
        cat: 'نافلزها',
        name: 'Phonegap',
        value: 50,
        icon: './images/img/FE.png',
        isImage: true,
        desc: `
				A platform, library and tool for building hybrid mobile app.
			`
      },
      {
        cat: 'نافلزها',
        name: 'Reaction Commerce',
        value: 20,
        icon: './images/img/FI.png',
        isImage: true,
        desc: `
				Reaction Commerce is the first open source, real-time platform to
				combine the flexibility developers and designers want with the stability
				and support businesses need. ReactionCommerce is based on MeteorJS platform.
			`
      },
      {
        cat: 'نافلزها',
        name: 'ReactNative',
        value: 10,
        icon: './images/img/FM.png',
        isImage: true,
        desc: `
				React Native lets you build mobile apps using only JavaScript.
				It uses the same design as React, letting us compose a rich
				mobile UI from declarative components.
			`
      },
      {
        cat: 'نافلزها',
        name: 'SquareSpace',
        value: 30,
        icon: './images/img/FR.png',
        isImage: true,
        desc: `
				Squarespace is a SaaS-based content management system-integrated ecommerce-aware website builder and blogging platform.
				At Nau, we have built a website for Squarespace using their low-level API which allowed fully customization
				of the interface and other Front End functionalities.
			`
      },
      {
        cat: 'فلزهای واسطه',
        name: 'HTML5 & CSS3',
        value: 100,
        icon: './images/img/GA.png',
        isImage: true,
        desc: `
				The languages of the Web Front End. At Nau, they are in our blood and with them we can build
				world-class websites with any kind of visual effects or designs requested.
			`
      },
      {
        cat: 'فلزهای واسطه',
        name: 'JavaScript',
        value: 100,
        icon: './images/img/GD.png',
        isImage: true,
        desc: `
				JavaScript is the heart of modern Web front end development and essential element of any Single Page
				Applications. In Nau, we invest a good deal in training developers to have good control of this universal language
				and now caplable of developing full stack websites with only JavaScript.
			`
      },
      {
        cat: 'فلزهای واسطه',
        name: 'CSS Next',
        value: 10,
        icon: './images/img/GE.png',
        isImage: true,
        desc: `
				The CSS language specs of the future but with the help of PostCSS (like Babel for ES6),
				we can use CSS Next today.
			`
      },
      {
        cat: 'فلزهای واسطه',
        name: 'GraphQL',
        value: 50,
        icon: './images/img/H.png',
        isImage: true,
        desc: `
				GraphQL is a data query language developed by Facebook publicly released in 2015.
				It provides an alternative to REST and ad-hoc webservice architectures. In combination
				with RelayJS, this combo help us reduce the time to develop web apps for weeks.
			`
      },
      {
        cat: 'فلزهای واسطه',
        name: 'LESS CSS',
        value: 20,
        icon: './images/img/HE.png',
        isImage: true,
        desc: `
				A preprocessor language to be compiled to CSS. This language is not as popular nowadays and we
				only use them when requested.
			`
      },
      {
        cat: 'فلزهای واسطه',
        name: 'SASS (SCSS flavor)',
        value: 70,
        icon: './images/img/HF.png',
        isImage: true,
        desc: `
				This is our main CSS preprocessor language helping us lay structured foundation to CSS as well
				as assisting on writing more convenient BEM anotations.
			`
      },
      {
        cat: 'فلزهای واسطه',
        name: 'TypeScript 2',
        value: 30,
        icon: './images/img/HG.png',
        isImage: true,
        desc: `
				The strict-typing flavor of ECMAScript, always requires a compiler to compile to vanilla JavaScript
				but the type checking and other syntactical sugar are exceptional. Right now, we only use it for
				Angular 2 projects when needed.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'code.naustud.io',
        value: 100,
        icon: './images/img/HO.png',
        isImage: true,
        desc: `
				A set of guidelines, presets, configs and stadard documentation for Nau developers.
				Please visit the document site at: <a href='http://code.naustud.io' target='_blank'>code.naustud.io</a>
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'Mobile First',
        value: 100,
        icon: './images/img/HS.png',
        isImage: true,
        desc: `
				This is one of our most important principle for web and mobile development.
				More details will be discussed in blog later.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'BabelJS',
        value: 50,
        icon: './images/img/I.png',
        isImage: true,
        desc: `
				The de-facto tool to work with ECMAScript 6 and ReactJS nowadays.
			`
      },
      /* {
			cat: 'شبه فلزات', name: 'Browserify', value: 10,
			icon: '',
		}, */ {
        cat: 'شبه فلزات',
        name: 'CSS BEM Notation',
        value: 70,
        icon: './images/img/IN.png',
        isImage: true,
        desc: `
				Our naming standard for CSS, which enhance collaboration, documentation and reusability of
				CSS rules.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'Front End Code Guide',
        value: 30,
        icon: './images/img/IR.png',
        isImage: true,
        desc: `
				Based on an existing best practice document for HTML and CSS. We're adopting it as our standards
				and guideline.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'ESLint',
        value: 20,
        icon: './images/img/K.png',
        isImage: true,
        desc: `
				The tool to check and validate JavaScript code when we develop and prevent potential issues with code.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'Gitflow Workflow',
        value: 70,
        icon: './images/img/KR.png',
        isImage: true,
        desc: `
				Our code version control tool is Git, and Gitflow is one of its workflow standard which
				ensure good collaboration and avoid conflict-resolving efforts. For more info, visit: code.naustud.io
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'GulpJS',
        value: 50,
        icon: './images/img/LA.png',
        isImage: true,
        desc: `
				GulpJS is a task automation tools written for Node.js. It is among the most popular
				Front End and Node project automation tools nowadays
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'Nau Code Styles',
        value: 50,
        icon: './images/img/LI.png',
        isImage: true,
        desc: `
				Based on AirBnB's well-defined JavaScript code styles. Our derivation has some different standards such as
				TAB indentation. This code style has an accompanied ESLint config.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'Stylelint',
        value: 50,
        icon: './images/img/LR.png',
        isImage: true,
        desc: `
				Our on-stop tool to validate both CSS and SCSS with a set of conventions and guidelines from our best practice.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'SystemJS',
        value: 20,
        icon: './images/img/LU.png',
        isImage: true,
        desc: `
				A module loader library that come along Angular 2. Its use is scarce, however.
			`
      },
      {
        cat: 'شبه فلزات',
        name: 'Webpack',
        value: 30,
        icon: './images/img/MD.png',
        isImage: true,
        desc: `
				A module bundler library that is becoming de-facto tool to use in ReactJS or SPA apps nowadays.
			`
      },
      {
        cat: 'هالوژن ها',
        name: 'AngularJS 1',
        value: 10,
        icon: './images/img/MG.png',
        isImage: true,
        desc: `
				Angular 1. Deprecated
			`
      },
      {
        cat: 'هالوژن ها',
        name: 'Backbone',
        value: 30,
        icon: './images/img/MN.png',
        isImage: true,
        desc: `
				A Model-View library. Deprecated
			`
      },
      {
        cat: 'هالوژن ها',
        name: 'Grunt & Automation Stack',
        value: 30,
        icon: './images/img/MO.png',
        isImage: true,
        desc: `
				Grunt task automation tool. Deprecated
			`
      },
      {
        cat: 'هالوژن ها',
        name: 'jQuery',
        value: 50,
        icon: './images/img/N.png',
        isImage: true,
        desc: `
				Deprecated, because <a href='http://youmightnotneedjquery.com/' target='_blank'>youmightnotneedjquery.com</a>
			`
      },
      {
        cat: 'هالوژن ها',
        name: 'RequireJS & AMD',
        value: 30,
        icon: './images/img/NA.png',
        isImage: true,
        desc: `
				AMD module loader. Deprecated and replaced by ES module and Webpack.
			`
      },
      {
        cat: 'گازهای نجیب',
        name: 'Browser Sync',
        value: 40,
        icon: './images/img/NB.png',
        isImage: true,
        desc: `
				Web development server popular among gulp/grunt web apps. No deprecated and replaced by live-server
				or webpackDevServer.
			`
      },
      {
        cat: 'گازهای نجیب',
        name: 'Git Pre-commit',
        value: 30,
        icon: './images/img/ND.png',
        isImage: true,
        desc: `
				Pre-commit hook for git, now deprecated due to slow commit time. Code validation should be done
				in the code editor.
			`
      },
      {
        cat: 'گازهای نجیب',
        name: 'http-server',
        value: 20,
        icon: './images/img/NE.png',
        isImage: true,
        desc: `
				A quick test web server based on Node.js, deprecated and replaced by live-server.
			`
      },
      {
        cat: 'گازهای نجیب',
        name: 'LiveReload',
        value: 20,
        icon: './images/img/NI.png',
        isImage: true,
        desc: `
				A propritery auto-reload solution for web developers, now deprecated in favor of live-server and
				hot module reload in Webpack.
			`
      }
    ];

    const svg = d3Select('#teck-stack-svg');

    const width =
      document.body.clientWidth -
      document.querySelector('.smfp-header-wrap').offsetWidth; // get width in pixels
    const height = +svg.attr('height');
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const strength = 0.05;
    let focusedNode;
    const format = d3Format(',d');
    const scaleColor = D3scaleOrdinal(schemeCategory10);
    // use pack to calculate radius of the circle
    const pack = D3pack()
      .size([width, height])
      .padding(4);
    const forceCollide = D3forceCollide(d => d.r + 1);
    // use the force
    const simulation = D3forceSimulation()
      // .force('link', d3.forceLink().id(d => d.id))
      .force('charge', D3forceManyBody())
      .force('collide', forceCollide)
      // .force('center', d3.forceCenter(centerX, centerY))
      .force('x', D3forceX(centerX).strength(strength))
      .force('y', D3forceY(centerY).strength(strength));
    // reduce number of circles on mobile screen due to slow computation
    if (
      'matchMedia' in window &&
      window.matchMedia('(max-device-width: 767px)').matches
    ) {
      data = data.filter(el => el.value >= 50);
    }
    const root = D3hierarchy({ children: data }).sum(d => d.value);
    // we use pack() to automatically calculate radius conveniently only
    // and get only the leaves
    const nodes = pack(root)
      .leaves()
      .map(node => {
        // console.log('node:', node.x, (node.x - centerX) * 2);
        const newData = node.data;
        return {
          x: centerX + (node.x - centerX) * 3, // magnify start position to have transition to center movement
          y: centerY + (node.y - centerY) * 3,
          r: 0, // for tweening
          radius: node.r, // original radius
          id: `${newData.cat}.${newData.name.replace(/\s/g, '-')}`,
          cat: newData.cat,
          name: newData.name,
          value: newData.value,
          icon: newData.icon,
          desc: newData.desc,
          isImage: newData.isImage
        };
      });

    simulation.nodes(nodes).on('tick', () => {
      node
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .select('circle')
        .attr('r', d => d.r);
    });

    // svg.style('background-color', '#eee');

    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(
        D3drag()
          .on('start', d => {
            const dem = d;
            if (!d3Event.active) simulation.alphaTarget(0.2).restart();
            dem.fx = d.x;
            dem.fy = d.y;
          })
          .on('drag', d => {
            const dem = d;
            dem.fx = d3Event.x;
            dem.fy = d3Event.y;
          })
          .on('end', d => {
            const dem = d;
            if (!d3Event.active) simulation.alphaTarget(0);
            dem.fx = null;
            dem.fy = null;
          })
      );

    node
      .append('circle')
      .attr('id', d => d.id)
      .attr('r', 0)
      .style('fill', d => scaleColor(d.cat))
      .transition()
      .duration(2000)
      .ease(easeElasticOut)
      .tween('circleIn', d => {
        const dem = d;
        const i = interpolateNumber(0, d.radius);
        return t => {
          dem.r = i(t);
          simulation.force('collide', forceCollide);
        };
      });

    node
      .append('clipPath')
      .attr('id', d => `clip-${d.id}`)
      .append('use')
      .attr('xlink:href', d => `#${d.id}`);

    // display text as circle icon
    node
      .filter(d => {
        console.log('---consoe.log--d.isImage--', d.isImage, d);
        return (
          !String(d.icon).includes('https://naustud.io/tech-stack/img/') &&
          !d.isImage
        );
      })
      .append('text')
      .classed('node-icon', true)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .selectAll('tspan')
      .data(d => d.icon.split(';'))
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes2) => {
        console.log('--nodes2--', d, i, nodes2);
        return 13 + (i - nodes2.length / 2 - 0.5) * 10;
      })
      .text(name => name);

    // display image as circle icon
    node
      .filter(
        d =>
          String(d.icon).includes('https://naustud.io/tech-stack/img/') ||
          d.isImage === true
      )
      .append('image')
      .classed('node-icon', true)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .attr('xlink:href', d => d.icon)
      .attr('x', d => -d.radius * 0.7)
      .attr('y', d => -d.radius * 0.7)
      .attr('height', d => d.radius * 2 * 0.7)
      .attr('width', d => d.radius * 2 * 0.7);

    node.append('title').text(d => `${d.cat}::${d.name}\n${format(d.value)}`);

    const legendOrdinal = D3legendColor()
      .scale(scaleColor)
      .shape('circle')
      .shapePadding(10); // console.log( "--------legendOrdinal----" , legendOrdinal );

    /**
     * legend 1
     */
    svg
      .append('g')
      .classed('legend-color', true)
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(30,30)')
      .style('font-size', '12px')
      .style('fill', '#FFFFFF')
      .style('font-family', 'IranSans')
      .call(legendOrdinal);

    const sizeScale = D3scaleOrdinal()
      .domain(['امتیاز کمتر', 'امتیاز بیشتر'])
      .range([5, 10]);

    const legendSize = D3legendSize()
      .scale(sizeScale)
      .shape('circle')
      .shapePadding(10)
      .labelAlign('start');
    console.log(legendSize);

    /**
     * legend 2
     */
    /* svg
      .append('g')
      .classed('legend-size', true)
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(180, 25)')
      .style('font-size', '12px')
      .style('fill', '#FFFFFF')
      .style('font-family', 'IranSans')
      .call(legendSize); */

    /*
    <foreignObject class="circle-overlay" x="10" y="10" width="100" height="150">
      <div class="circle-overlay__inner">
        <h2 class="circle-overlay__title">ReactJS</h2>
        <p class="circle-overlay__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, sunt, aspernatur. Autem repudiandae, laboriosam. Nulla quidem nihil aperiam dolorem repellendus pariatur, quaerat sed eligendi inventore ipsa natus fugiat soluta doloremque!</p>
      </div>
    </foreignObject>
    */

    const infoBox = node
      .append('foreignObject')
      .classed('circle-overlay hidden', true)
      .attr('x', -350 * 0.5 * 0.8)
      .attr('y', -350 * 0.5 * 0.8)
      .attr('height', 350 * 0.8)
      .attr('width', 350 * 0.8)
      .append('xhtml:div')
      .classed('circle-overlay__inner', true);

    infoBox
      .append('h2')
      .classed('circle-overlay__title', true)
      .text(d => d.name);

    infoBox
      .append('p')
      .classed('circle-overlay__body', true)
      .html(d => d.desc);

    const moreButton = infoBox
      .append('button')
      .classed('circle-overlay__button btn btn-overly', true)
      .attr('type', 'button')
      .text('اطلاعات بیشتر');

    moreButton.on('click', currentNode => {
      console.log('----currentNode----', currentNode);
      const { sourceClick } = this.props;
      sourceClick(currentNode);
    });

    node.on('click', currentNode => {
      const currNode = currentNode;
      d3Event.stopPropagation();
      // console.log('currentNode', currentNode);
      const { currentTarget } = d3Event; // the <g> el
      if (currNode === focusedNode) {
        // no focusedNode or same focused node is clicked
        return;
      }
      const lastNode = focusedNode;
      focusedNode = currNode;
      simulation.alphaTarget(0.2).restart();
      // hide all circle-overlay
      d3SelectAll('.circle-overlay').classed('hidden', true);
      d3SelectAll('.node-icon').classed('node-icon--faded', false);
      // don't fix last node to center anymore
      if (lastNode) {
        lastNode.fx = null;
        lastNode.fy = null;
        node
          .filter((d, i) => i === lastNode.index)
          .transition()
          .duration(2000)
          .ease(easePolyOut)
          .tween('circleOut', () => {
            const irl = interpolateNumber(lastNode.r, lastNode.radius);
            return t => {
              lastNode.r = irl(t);
            };
          })
          .on('interrupt', () => {
            lastNode.r = lastNode.radius;
          });
      }
      // if (!d3Event.active) simulation.alphaTarget(0.5).restart();
      d3Transition()
        .duration(2000)
        .ease(easePolyOut)
        .tween('moveIn', () => {
          // console.log('tweenMoveIn', currentNode);
          const ix = interpolateNumber(currentNode.x, centerX);
          const iy = interpolateNumber(currentNode.y, centerY);
          const ir = interpolateNumber(currentNode.r, centerY * 0.5);
          return t => {
            // console.log('i', ix(t), iy(t));
            currNode.fx = ix(t);
            currNode.fy = iy(t);
            currNode.r = ir(t);
            simulation.force('collide', forceCollide);
          };
        })
        .on('end', () => {
          simulation.alphaTarget(0);
          const $currentGroup = d3Select(currentTarget);
          $currentGroup.select('.circle-overlay').classed('hidden', false);
          $currentGroup.select('.node-icon').classed('node-icon--faded', true);
        })
        .on('interrupt', () => {
          console.log('move interrupt', currNode);
          currNode.fx = null;
          currNode.fy = null;
          simulation.alphaTarget(0);
        });
    });
    // blur
    d3Select(document).on('click', () => {
      const { target } = d3Event;
      // check if click on document but not on the circle overlay
      if (!target.closest('#circle-overlay') && focusedNode) {
        focusedNode.fx = null;
        focusedNode.fy = null;
        simulation.alphaTarget(0.2).restart();
        d3Transition()
          .duration(2000)
          .ease(easePolyOut)
          .tween('moveOut', () => {
            console.log('tweenMoveOut', focusedNode);
            const ir = interpolateNumber(focusedNode.r, focusedNode.radius);
            return t => {
              focusedNode.r = ir(t);
              simulation.force('collide', forceCollide);
            };
          })
          .on('end', () => {
            focusedNode = null;
            simulation.alphaTarget(0);
          })
          .on('interrupt', () => {
            simulation.alphaTarget(0);
          });
        // hide all circle-overlay
        d3SelectAll('.circle-overlay').classed('hidden', true);
        d3SelectAll('.node-icon').classed('node-icon--faded', false);
      }
    });
  }

  render() {
    return (
      <div className="tech-stack-container bg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          direction="rtl"
          xmlLang="fa"
          id="teck-stack-svg"
          width="100%"
          height="700"
          fontFamily="sans-serif"
          fontSize="10"
          textAnchor="middle"
        />
      </div>
    );
  }
}

export default BubbleCloud;
