import React, { Component } from 'react';
import Datamap from 'datamaps';
import _ from 'underscore';

export default class Datamaps extends Component<Props> {
  componentDidMount() {
    this.createDataMap();
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

    const myMapTest = new Datamap({
      element: document.getElementById(idName),
      scope: scopeProps, //  currently supports 'usa' and 'world', however with custom map data you can specify your own
      setProjection: setProjectionProps, // returns a d3 path and projection functions
      projection: 'mercator', //  style of projection to be used. try "mercator"
      height: null, // if not null, datamaps will grab the height of 'element'
      width: null, // if not null, datamaps will grab the width of 'element'
      responsive: false, // if true, call `resize()` on the map object when it should adjust it's size
      done: () => {}, // callback when the map is done drawing
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
        highlightOnHover: false,
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
        radius: null,
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

    myMapTest.bubbles(bubblesProps, popupTemplateProps);
  }

  render() {
    const { idName, className, widthProps, heightProps } = this.props;
    return (
      <div
        id={idName}
        className={className}
        style={{ width: widthProps, height: heightProps }}
      />
    );
  }
}
