import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { injectIntl, intlShape } from 'react-intl';
import { GET_MINES } from '../../queries/mine';
import PageHeadingIcon from '../General/PageHeadingIcon';
import Loading from '../General/Loading';
import Map from '../Information/Map';
import Iran from '../../utils/iran.json';
import { getUnit } from '../../utils/utility';

export const GET_ELEMENT_BY_NAME = gql`
  query($element: String!) {
    elementByName(element: $element) {
      id
      element
      elementTitle
      secondaryResourcesDesc
    }
  }
`;

const StatesOptions = Iran.States;

const popupTemplate = {
  popupTemplate: (geo, data) => {

    let mineItems = '';

    data.mines.forEach(({title, savedValue, unit}) => {
      mineItems += `<tr>
        <td>${title}</td>
        <td>${savedValue}</td>
        <td>${unit}</td>
      </tr>`;
    })

    return `<div id="popover" class="hoverinfo">
        <div class="close"></div>
        <section>
          <div>
            <ul style="float: right">
              <li>
                <label class="title">نام استان:</label>
                <span class="value">${data.locationTitle}</span>
              </li>
            </ul>
            <ul style="float: left">  
              <li>
                <label class="title">درصد ذخیره</label>
                <span class="value">${data.radiusPercent}%</span>
              </li>
            </ul>
            <div style="clear: both"> </div>
          </div>
          <table class="table table-with-width table-striped table-bordered">
            <thead>
              <tr>
                <th>نام معدن</th>
                <th>میزان ذخیره</th>
                <th>واحد</th>
              </tr>
            </thead>
            <tbody>
              ${mineItems}
            </tbody>
          </table>
        </section>
      </div>`;
  }
};

class Mines extends Component<Props> {
  constructor(props) {
    super(props);

    const { intl } = this.props;

    const { formatMessage } = intl;

    this.labels = {
      locationTitle: formatMessage({ id: 'mapInfo.state' }),
      mineName: formatMessage({ id: 'mapInfo.mineName' }),
      mainMineral: formatMessage({ id: 'mapInfo.mainMineral' }),
      caratAverage: formatMessage({ id: 'mapInfo.caratAverage' }),
      mineStatus: formatMessage({ id: 'mapInfo.mineStatus' }),
      savedValue: formatMessage({ id: 'mapInfo.savedValue' }),
      unit: formatMessage({ id: 'mapInfo.unit' })
    };

    this.getBubbleProps = this.getBubbleProps.bind(this);
  }

  getBubbleProps(data) {
    if (!data || !data.searchMine || !data.searchMine.mines) return null;

    const dataStats = data.searchMine.mines;

    const LocationData = [];

    const { intl } = this.props;

    const { formatMessage, formatNumber } = intl;

    console.log("----dataStats----", dataStats);

    const allStates = [];

    let total = 0;

    dataStats.forEach(elem => {
      let locIndex = -1;
      const loc = allStates.find((item, index) => {

        if (item.state === elem.location) {
          locIndex = index;
        }

        return item.state === elem.location;
      });

      if(!loc) {
        const location = StatesOptions.find(cnty => cnty.state === elem.location);
        allStates.push({
          ...location,
          locationTitle: formatMessage({ id: location.title }),
          mines: [{
            ...elem,
            savedValue: formatNumber(elem.productionValue),
            unit: getUnit('option', elem.unit)
          }]
        });
      } else {
        allStates[locIndex].mines.push({
          ...elem,
          savedValue: formatNumber(elem.productionValue),
          unit: getUnit('option', elem.unit)
        });
      }

      total += elem.productionValue && (elem.caratAverage || 1)
      ? elem.productionValue * (elem.caratAverage || 1)
      : 0;

    });

    allStates.forEach((locData, index) => {
      let radius = 0;
      locData.mines.forEach(mine => {
        radius += mine.productionValue && (mine.caratAverage || 1)
        ? mine.productionValue * (mine.caratAverage || 1)
        : 0;
      });
      allStates[index].radiusPercent = Math.round((radius/total) * 10000)/100;
      allStates[index].radius = Math.round((radius/total) * 100) || 2;
    });

    console.log("----allStates------", allStates);

    return allStates;

    /*dataStats.forEach(elem => {
      const location = StatesOptions.find(cnty => cnty.state === elem.location);

      LocationData.push({
        ...location,
        locationTitle: formatMessage({ id: location.title }),
        mineName: elem.title,
        mainMineral: elem.mineral,
        caratAverage: elem.caratAverage ? formatNumber(elem.caratAverage) : '-',
        mineStatus: elem.status,
        savedValue: elem.productionValue
          ? formatNumber(elem.productionValue)
          : '',
        unit: getUnit('option', elem.unit),
        labels: this.labels,
        radius:
          elem.productionValue && elem.caratAverage
            ? elem.productionValue * elem.caratAverage
            : 1
      });
    });

    console.log("----LocationData----", LocationData);

    return LocationData;*/
  }

  render() {
    const { match, intl } = this.props;

    const { element, title } = match.params;

    const { formatNumber, formatMessage } = intl;

    return (
      <div>
        <PageHeadingIcon
          icon="smfpIcon smfpIcon-mine"
          title={`معادن ${title}`}
        />

        <Map
          locationType="iran"
          query={GET_MINES}
          variables={{
            locationType: 'iran',
            elements: [element],
            offset: -1
          }}
          getBubbleProps={this.getBubbleProps}
          popupCustomTemplate={popupTemplate}
        />

        <Query
          query={GET_MINES}
          variables={{
            elements: [element],
            offset: -1
          }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;

            if (data && data.searchMine && data.searchMine.mines) {
              return (
                <div>
                  <table className="table table-with-width table-striped table-bordered" style={{maxWidth: '600px'}}>
                    <thead>
                      <tr>
                        <th>نام معدن</th>
                        <th>میزان ذخیره</th>
                        <th>واحد</th>
                        <th>عیار</th>
                        <th>وضعیت معدن</th>
                        <th>استان</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.searchMine.mines.map(source => {
                        
                        const location = StatesOptions.find(cnty => cnty.state === source.location);

                          return (
                            <tr
                              key={source.id}
                              className="animated fadeInUp faster animation-auto-delay"
                            >
                              <td>{source.title}</td>
                              <td>{source.productionValue ? formatNumber(source.productionValue) : '-'}</td>
                              <td>{getUnit('option', source.unit)}</td>
                              <td>{source.caratAverage ? formatNumber(source.caratAverage) : '-'}</td>
                              <td>{formatMessage({ id: `mapInfo.${source.status}` })}</td>
                              <td>{formatMessage({ id: location.title })}</td>
                            </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

Mines.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(Mines);
