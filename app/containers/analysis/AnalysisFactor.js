/**
 * BubbleCloud Component
 */
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Button, Row, Col } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { GET_ELEMENTS } from '../../queries/element';
import BubbleCloud from '../../components/bubble/BubbleCloud';
import { ANALYSIS_ELEMENT } from '../../constants/routes';
import item4 from '../../images/menu-item-4.jpg';
import { FormattedSimpleMsg } from '../../utils/utility';
import PageHeadingIcon from '../../components/General/PageHeadingIcon';

type Props = {
  history: object,
  match: object
};

class AnalysisFactor extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      // currentElement: '' ,
      currentFactor: {},
      currentFactorVal: {}
    };

    this.sourceClick = this.sourceClick.bind(this);
    this.changeFactor = this.changeFactor.bind(this);
    this.changeFactorValue = this.changeFactorValue.bind(this);
    this.recalculateData = this.recalculateData.bind(this);
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

  changeFactor(option) {
    this.setState({
      currentFactor: option
    });
  }

  changeFactorValue(option) {
    this.setState({
      currentFactorVal: option
    });
  }

  recalculateData() {
    console.log('-----this.state------', this.state);
  }

  render() {
    const { match } = this.props;

    const { type } = match.params;

    const { currentFactor, currentFactorVal } = this.state;

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
                <PageHeadingIcon
                  className="animated bounceInUp slow delay-2s"
                  icon="smfpIcon smfpIcon-illustrated-information"
                  title={<FormattedSimpleMsg id={`analysis.element_${type}`} />}
                />

                <Row>
                  <Col sm={2} className="text-left text-row-padding">
                    <FormattedMessage id="analysis.select_affected_factor" />
                  </Col>

                  <Col sm={3}>
                    <ReactSelect
                      name="affected_factor"
                      value={currentFactor}
                      onChange={this.changeFactor}
                      options={[]}
                    />
                  </Col>

                  <Col sm={2} className="text-left text-row-padding">
                    <FormattedMessage id="analysis.select_effect_value" />
                  </Col>

                  <Col sm={3}>
                    <div className="effect-value-field">
                      <ReactSelect
                        name="effect_value"
                        value={currentFactorVal}
                        onChange={this.changeFactorValue}
                        options={[]}
                      />
                    </div>
                  </Col>

                  <Col sm={2} className="text-right">
                    <Button
                      style={{ marginLeft: '6px' }}
                      onClick={this.recalculateData}
                      type="button"
                    >
                      <FormattedMessage id="global.apply" />
                    </Button>

                    <Button type="button" variant="outline-danger">
                      <FormattedMessage id="global.reset" />
                    </Button>
                  </Col>
                </Row>

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
