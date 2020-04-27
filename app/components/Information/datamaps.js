import React, { Component } from 'react';

import MainDataMap from 'datamaps';
import _ from 'underscore';
import $ from 'jquery';

//import customD3 from "./CustomD3"; console.log("---------customD3------", customD3);

const customD3 = d3;

const handleZoom = () => {
  function Zoom(args) {

    
  console.log("----d3-----", d3);

    $.extend(this, {
      $buttons:   $(".zoom-button"),
      $info:      $("#zoom-info"),
      scale:      { max: 50, currentShift: 0 },
      $container: args.$container,
      datamap:    args.datamap,
      containerId: args.containerId
    });

    this.init();
  }

  Zoom.prototype.init = function() {console.log("----customD3.event----", customD3.event);
    var paths = d3.select(`#${this.containerId}`).select("svg").selectAll("path"),
        subunits = d3.select(`#${this.containerId}`).select("svg").selectAll(".datamaps-subunit");

    // preserve stroke thickness
    paths.style("vector-effect", "non-scaling-stroke");

    // disable click on drag end
    subunits.call(
      customD3.behavior.drag().on("dragend", function() { 
        customD3.event.sourceEvent.stopPropagation();
      })
    );

    this.scale.set = this._getScalesArray();
    this.d3Zoom = customD3.behavior.zoom().scaleExtent([ 1, this.scale.max ]);

    this._displayPercentage(1);
    this.listen();
  };

  Zoom.prototype.listen = function() {
    this.$buttons.off("click").on("click", this._handleClick.bind(this));

    d3.select(`#${this.containerId}`).select("svg")
      .call(this.d3Zoom.on("zoom", this._handleScroll.bind(this)))
      .on("dblclick.zoom", null); // disable zoom on double-click
  };

  Zoom.prototype.reset = function() {
    this._shift("reset");
  };

  Zoom.prototype._handleScroll = function() { console.log("-------customD3.event----", customD3.event);
    var translate = customD3.event.translate,
        scale = customD3.event.scale,
        limited = this._bound(translate, scale);

    this.scrolled = true; console.log("-----limited------", limited);

    this._update(limited.translate, limited.scale);
  };

  Zoom.prototype._handleClick = function(event) {
    var direction = $(event.target).data("zoom");

    this._shift(direction);
  };

  Zoom.prototype._shift = function(direction) {
    var center = [ this.$container.width() / 2, this.$container.height() / 2 ],
        translate = this.d3Zoom.translate(), translate0 = [], l = [],
        view = {
          x: translate[0],
          y: translate[1],
          k: this.d3Zoom.scale()
        }, bounded;

    translate0 = [
      (center[0] - view.x) / view.k,
      (center[1] - view.y) / view.k
    ];

    if (direction == "reset") {
      view.k = 1;
      this.scrolled = true;
    } else {
      view.k = this._getNextScale(direction);
    }

  l = [ translate0[0] * view.k + view.x, translate0[1] * view.k + view.y ];

    view.x += center[0] - l[0];
    view.y += center[1] - l[1];

    bounded = this._bound([ view.x, view.y ], view.k);

    this._animate(bounded.translate, bounded.scale);
  };

  Zoom.prototype._bound = function(translate, scale) {
    var width = this.$container.width(),
        height = this.$container.height();  console.log("-----width, height----", width, height);

    translate[0] = Math.min(
      (width / height)  * (scale - 1),
      Math.max( width * (1 - scale), Number.isNaN(translate[0]) ? 0 : translate[0] )
    );

    translate[1] = Math.min(0, Math.max(height * (1 - scale), Number.isNaN(translate[1]) ? 0 : translate[1]));

    return { translate: translate, scale: scale };
  };

  Zoom.prototype._update = function(translate, scale) {
    this.d3Zoom
      .translate(translate)
      .scale(scale);

    d3.select(`#${this.containerId}`).select("svg").selectAll("g")
      .attr("transform", "translate(" + translate + ")scale(" + scale + ")");

    this._displayPercentage(scale);
  };

  Zoom.prototype._animate = function(translate, scale) {
    var _this = this,
        d3Zoom = this.d3Zoom;

    customD3.transition().duration(350).tween("zoom", function() {
      var iTranslate = customD3.interpolate(d3Zoom.translate(), translate),
          iScale = customD3.interpolate(d3Zoom.scale(), scale);

      return function(t) {
        _this._update(iTranslate(t), iScale(t));
      };
    });
  };

  Zoom.prototype._displayPercentage = function(scale) {
    var value;

    value = Math.round(Math.log(scale) / Math.log(this.scale.max) * 100);
    this.$info.text(value + "%");
  };

  Zoom.prototype._getScalesArray = function() {
    var array = [],
        scaleMaxLog = Math.log(this.scale.max);

    for (var i = 0; i <= 10; i++) {
      array.push(Math.pow(Math.E, 0.1 * i * scaleMaxLog));
    }

    return array;
  };

  Zoom.prototype._getNextScale = function(direction) {
    var scaleSet = this.scale.set,
        currentScale = this.d3Zoom.scale(),
        lastShift = scaleSet.length - 1,
        shift, temp = [];

    if (this.scrolled) {

      for (shift = 0; shift <= lastShift; shift++) {
        temp.push(Math.abs(scaleSet[shift] - currentScale));
      }

      shift = temp.indexOf(Math.min.apply(null, temp));

      if (currentScale >= scaleSet[shift] && shift < lastShift) {
        shift++;
      }

      if (direction == "out" && shift > 0) {
        shift--;
      }

      this.scrolled = false;

    } else {

      shift = this.scale.currentShift;

      if (direction == "out") {
        shift > 0 && shift--;
      } else {
        shift < lastShift && shift++;
      }
    }

    this.scale.currentShift = shift;

    return scaleSet[shift];
  };

  function Datamap(options) {

    const {
      idName,
      scopeProps,
      dataUrlProps,
      bubblesProps,
      popupTemplateProps,
      setProjectionProps,
      elCon
    } = options;

    this.$container = $(elCon);
    this.containerId = idName;
    this.instance = new MainDataMap({
      element: elCon,
      scope: scopeProps, //  currently supports 'usa' and 'world', however with custom map data you can specify your own
      setProjection: setProjectionProps, // returns a d3 path and projection functions
      projection: 'mercator', //  style of projection to be used. try "mercator"
      height: null, // if not null, datamaps will grab the height of 'element'
      width: null, // if not null, datamaps will grab the width of 'element'
      responsive: true, // if true, call `resize()` on the map object when it should adjust it's size
      done: this._handleMapReady.bind(this), // callback when the map is done drawing
      fills: {
        Default: '#a4d05b',
        defaultFill: 'rgba(127, 154, 84, 0.6)' // the keys in this object map to the "fillKey" of [data] or [bubbles]
      },
      dataType: 'json', // for use with dataUrl, currently 'json' or 'csv'. CSV should have an `id` column
      dataUrl: null, // if not null, datamaps will attempt to fetch this based on dataType ( default: json )
      geographyConfig: {
        dataUrl: dataUrlProps, // if not null, datamaps will fetch the map JSON (currently only supports topojson)
        hideAntarctica: true,
        borderWidth: 1,
        borderOpacity: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
        // popupTemplate: function(geography, data) { // this function should just return a string
        //   return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
        // },
        popupOnHover: false, // disable the popup while hovering
        highlightOnHover: true,
        highlightFillColor: 'rgba(127, 154, 84, 0.8)',
        highlightBorderColor: 'transparent',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1
      },
      bubblesConfig: {
        borderWidth: 2,
        borderOpacity: 1,
        borderColor: 'rgba(255,255,255, .4)',
        popupOnHover: true,
        radius: 10,
        /* popupTemplate: function(geography, data) {
          return '<div class="hoverinfo"><strong>' + data.name + '</strong></div>';
        }, */
        fillOpacity: 0.75,
        animate: true,
        highlightOnHover: true,
        highlightFillColor: '#a4d05b',
        highlightBorderColor: 'transparent',
        highlightBorderWidth: 2,
        highlightBorderOpacity: 1,
        highlightFillOpacity: 0.85,
        exitDelay: 100,
        key: JSON.stringify
      },
      arcConfig: {
        strokeColor: '#DD1C77',
        strokeWidth: 1,
        arcSharpness: 1,
        animationSpeed: 600
      }
    });

    this.instance.bubbles(bubblesProps, popupTemplateProps);

    /*window.addEventListener('resize', () => {
      this.instance.resize();
    });*/
    
  }

  Datamap.prototype._handleMapReady = function(datamap) { console.log("-------datamap---", datamap);
    this.zoom = new Zoom({
      $container: this.$container,
      datamap: datamap,
      containerId: this.containerId
    });
  }

  return Datamap;

}

export default class Datamaps extends Component<Props> {
  componentDidMount() {
    this.createDataMap();

    window.addEventListener('resize', () => {
      this.createDataMap();
    });

  }

  componentDidUpdate(prevProps) {
    const { idName, scopeProps, dataUrlProps, bubblesProps } = this.props;

    if (
      prevProps.scopeProps !== scopeProps ||
      prevProps.idName !== idName ||
      prevProps.dataUrlProps !== dataUrlProps ||
      !_.isEqual(prevProps.bubblesProps, bubblesProps)
    ) {
      this.createDataMap();
    }
  }

  createDataMap() {
    const {
      idName,
      scopeProps,
      dataUrlProps,
      bubblesProps,
      popupTemplateProps,
      setProjectionProps
    } = this.props;

    document.getElementById(idName).innerHTML = '';
    
    const Datamap = handleZoom();

    new Datamap({
      idName,
      scopeProps,
      dataUrlProps,
      bubblesProps,
      popupTemplateProps,
      setProjectionProps,
      elCon: this.refs.mapContainer
    });


  }

  render() {
    const { idName, className, widthProps, heightProps } = this.props;
    return (
      <section>
        <div
          ref={'mapContainer'}
          id={idName}
          className={className}
          style={{ position: "relative", width: widthProps, height: heightProps }}
        />
        
        <button className="btn btn-primary btn-md text-dark zoom-button map-zoom-button" data-zoom="reset">
        حالت اولیه
        </button>
        <button className="btn btn-md text-dark btn-default zoom-button map-zoom-button" data-zoom="out">-</button>
        <button className="btn btn-md text-dark btn-default zoom-button map-zoom-button" data-zoom="in">+</button>
        <div id="zoom-info" style={{display: "none"}}></div>
      </section>
    );
  }
}
