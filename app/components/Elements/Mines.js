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

    dataStats.forEach(elem => {
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
          elem.savedValue && elem.caratAverage
            ? elem.savedValue * elem.caratAverage
            : 1
      });
    });

    return LocationData;
  }

  render() {
    const { match } = this.props;

    const { element, title } = match.params;

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
                  <table className="table table-with-width table-striped table-bordered">
                    <tbody>
                      {data.searchMine.mines.map(source => (
                        <tr
                          key={source.id}
                          className="animated fadeInUp faster animation-auto-delay"
                        >
                          <td>{source.title}</td>
                          <td>{source.productionValue}</td>
                          <td>{source.activeMines}</td>
                        </tr>
                      ))}
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
