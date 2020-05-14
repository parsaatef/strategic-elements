import React, { Component } from 'react';
import * as d3 from 'd3';
import { Query } from 'react-apollo';
import Loading from '../General/Loading';
import Datamaps from './datamaps';
import popupTemplate from './popupTemplate';
import {
  event as d3Event,
  mouse as d3Mouse,
  select as d3Select,
  selectAll as d3SelectAll
} from 'd3-selection';



console.log("----d31-----", d3);
console.log("----d3Event-----", d3Event);

// https://bl.ocks.org/mbostock/db6b4335bf1662b413e7968910104f0f or https://bl.ocks.org/mbostock/3892919
const setProjection = null;/*function(element) { console.log("---element-", arguments);
  var projection = d3.geo.equirectangular()
    .center([70, 30])
    .rotate([4.4, 0])
    .scale(element.offsetWidth)
    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
  var path = d3.geo.path()
    .projection(projection);

  return {path: path, projection: projection};
};*/

const irnSetProjection = () => {
  const projectionD3 = d3.geo
    .mercator()
    .center([57.688, 32.4279]) // always in [East Latitude, North Longitude]
    .scale(1400);
  const pathD3 = d3.geo.path().projection(projectionD3);
  return {
    path: pathD3,
    projection: projectionD3
  };
};

class Map extends Component<Props> {
  render() {
    const { locationType, variables, query, getBubbleProps, popupCustomTemplate } = this.props;

    let scopeProps = 'world';
    let idName = 'world-map';
    let widthProps = '90%';
    let heightProps = '90vh';
    let dataUrlProps = null;
    let popupTemplateProps = popupCustomTemplate || popupTemplate;
    let setProjectionProps = setProjection;

    if (locationType === 'iran') { console.log("----process.env.PUBLIC_URL----", process.env);
      scopeProps = 'irn';
      idName = 'iran-map';
      widthProps = '90%';
      heightProps = '75vh';
      dataUrlProps = `${process.env.PUBLIC_URL}/irn.topo.json`;
      popupTemplateProps = popupCustomTemplate || popupTemplate;
      setProjectionProps = irnSetProjection;
    }

    return (
      <section className="smfp-datamaps-wrap-outer animated fadeInUp fast delay-2s">
        <Query query={query} variables={variables}>
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (!data) return null;

            const LocationData = getBubbleProps(data);

            if (!LocationData) return null;

            return (
              <Datamaps
                className="smfp-datamaps-wrap animated fadeIn fast"
                idName={idName}
                widthProps={widthProps}
                heightProps={heightProps}
                scopeProps={scopeProps}
                dataUrlProps={dataUrlProps}
                bubblesProps={LocationData}
                popupTemplateProps={popupTemplateProps}
                setProjectionProps={setProjectionProps}
              />
            );
          }}
        </Query>
      </section>
    );
  }
}

export default Map;
