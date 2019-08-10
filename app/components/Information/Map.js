import React, { Component } from 'react';
import * as d3 from 'd3';
import { Query } from 'react-apollo';
import Loading from '../General/Loading';
import Datamaps from './datamaps';
import popupTemplate from './popupTemplate';

const setProjection = null;

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
    const { locationType, variables, query, getBubbleProps } = this.props;

    let scopeProps = 'world';
    let idName = 'world-map';
    let widthProps = '80%';
    let heightProps = '65vh';
    let dataUrlProps = null;
    let popupTemplateProps = popupTemplate;
    let setProjectionProps = setProjection;

    if (locationType === 'iran') {
      scopeProps = 'irn';
      idName = 'iran-map';
      widthProps = '85%';
      heightProps = '65vh';
      dataUrlProps = 'components/Information/irn.topo.json';
      popupTemplateProps = popupTemplate;
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
