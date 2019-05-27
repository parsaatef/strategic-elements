/**
 * BubbleCloud Component
 */
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { GET_ELEMENTS_STATS } from '../../queries/elementStats';
import BubbleCloud from '../../components/bubble/BubbleCloud';
import { ANALYSIS_ELEMENT } from '../../constants/routes';
import item4 from '../../images/menu-item-4.jpg';

type Props = {
  history: object,
  match: object
};

class AnalysisFactor extends React.Component<Props> {
  constructor(props) {
    super(props);

    /* this.state = {
      currentElement: ''
    }; */

    this.sourceClick = this.sourceClick.bind(this);
  }

  getData(stats) {
    console.log(this.props);

    const data = [];

    stats.forEach(elem => {
      data.push({
        id: elem.id,
        cat: 'library',
        name: elem.element,
        value: elem.productionValue,
        icon: item4,
        desc: ''
      });
    });

    return data;
  }

  sourceClick(node) {
    const { history, match } = this.props;

    const { type } = match.params;

    history.push(
      ANALYSIS_ELEMENT.replace(':type', type)
        .replace(':element', node.id)
        .replace(':title', 'gold')
    );

    /* this.setState({
      currentElement: node.id
    }); */
  }

  render() {
    // const { currentElement } = this.state;

    return (
      <div className="information-analysis-container">
        <Query query={GET_ELEMENTS_STATS} variables={{}}>
          {({ data, loading, error, refetch }) => {
            if (loading) return 'loading.....';

            if (
              !data ||
              !data.searchElementStats ||
              !data.searchElementStats.elementsStats
            )
              return null;

            console.log('data, error, refetch', data, error, refetch);

            const inputData = this.getData(
              data.searchElementStats.elementsStats
            );

            return (
              <BubbleCloud
                inputData={inputData}
                sourceClick={this.sourceClick}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(AnalysisFactor);
