/**
 * BubbleCloud Component
 */
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { GET_ELEMENTS } from '../../queries/element';
import BubbleCloud from '../../components/bubble/BubbleCloud';
import { ANALYSIS_ELEMENT } from '../../constants/routes';
import item4 from '../../images/menu-item-4.jpg';
import { FormattedSimpleMsg } from '../../utils/utility';

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
        id: elem.element,
        cat: elem.group,
        name: elem.elementTitle,
        value: 50,
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
    const { match } = this.props;

    const { type } = match.params;

    return (
      <div className="information-analysis-container">
        <Query
          query={GET_ELEMENTS}
          variables={{
            offset: -1,
            first: 0
          }}
        >
          {({ data, loading, error, refetch }) => {
            if (loading) return 'loading.....';

            if (!data || !data.searchElement || !data.searchElement.elements)
              return null;

            console.log('data, error, refetch', data, error, refetch);

            const inputData = this.getData(data.searchElement.elements);

            return (
              <section className="analysis-factor-wrapper">
                <div className="smfp-intro-heading text-center">
                  <h1>
                    <FormattedSimpleMsg id={`analysis.element_${type}`} />
                  </h1>
                </div>

                <BubbleCloud
                  inputData={inputData}
                  sourceClick={this.sourceClick}
                />
              </section>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(AnalysisFactor);
