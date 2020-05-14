/**
 * BubbleCloud Component
 */
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ReactSelect from 'react-select';
// import { Button } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import _ from 'underscore';
import { connect } from 'react-redux';
import { GET_ELEMENTS } from '../../queries/element';
import BubbleCloud from '../../components/bubble/BubbleCloud';
import { ANALYSIS_ELEMENT } from '../../constants/routes';
import { FormattedSimpleMsg } from '../../utils/utility';
import PageHeadingIcon from '../../components/General/PageHeadingIcon';
import Loading from '../../components/General/Loading';
import AnalysisRate from './Analysis';
import { setElementsRates } from '../../actions/analysis';

type Props = {
  history: object,
  match: object,
  elementsRates: object,
  setElementsRatesDis: void
};

const defaultIndicatorsFactor = {
  p1: 0.3,
  p2: 0.1,
  p3: 0.5,
  p4: 0.1,
  e1: 0.1,
  e2: 0.2,
  e3: 0.1,
  e4: 0.15,
  e5: 0.15,
  e6: 0.2,
  e7: 0.1,
  s1: 0.35,
  s2: 0.3,
  s3: 0.35,
  t1: 0.5,
  t2: 0.5,
  en1: 0.3,
  en2: 0.1,
  en3: 0.15,
  en4: 0.15,
  en5: 0.3,
  l1: 0.3,
  l2: 0.2,
  l3: 0.5
};

const getFactorGroup = factor => {
  let group = '';

  if (factor.includes('en')) {
    group = 'en';
  } else {
    group = factor.substr(0, 1);
  }

  return group;
};

class AnalysisFactor extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      // currentElement: '' ,
      currentFactor: { value: '', label: 'انتخاب' },
      currentFactorVal: 0,
      elements: [],
      inputData: []
    };

    this.sourceClick = this.sourceClick.bind(this);
    this.changeFactor = this.changeFactor.bind(this);
    this.changeFactorValue = this.changeFactorValue.bind(this);
    this.recalculateData = this.recalculateData.bind(this);
  }

  componentDidMount() {
    const { elements } = this.state;
    const { elementsRates } = this.props;

    console.log("-----this.props--A---", this.props);

    if (!_.isEmpty(elements) && !_.isEmpty(elementsRates)) {
      this.setData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { elements } = this.state;
    const { elementsRates, match } = this.props;

    const { type } = match.params; console.log("---type !== prevProps.match.params.type---", type !== prevProps.match.params.type);
    console.log("-----this.props--U---", this.props);// type !== prevProps.match.params.type ||
    if (
      !_.isEqual(prevState.elements, elements) ||
      !_.isEqual(prevProps.elementsRates, elementsRates)
    ) {
      this.setData();
    }
  }

  getNewMultiple(x) {
    const { currentFactor, currentFactorVal } = this.state;

    const defVal = defaultIndicatorsFactor[currentFactor.value];

    const newval = currentFactorVal;

    return (x / (1 - defVal)) * (1 - newval);
  }

  getNewIndicators() {
    const newIndicators = {};

    const { currentFactor, currentFactorVal } = this.state;

    if (!currentFactor.value || !currentFactorVal) {
      return _.clone(defaultIndicatorsFactor);
    }

    const currGroup = getFactorGroup(currentFactor.value);

    _.each(defaultIndicatorsFactor, (val, factor) => {
      if (factor === currentFactor.value) {
        newIndicators[factor] = currentFactorVal;
      } else {
        const group = getFactorGroup(factor);

        if (currGroup === group) {
          newIndicators[factor] = this.getNewMultiple(val);
        } else {
          newIndicators[factor] = val;
        }
      }
    });

    return newIndicators;
  }

  setData() {
    const { elements, inputData } = this.state;

    const { elementsRates } = this.props;

    const data = [];

    const elementsRanks = [];

    elements.forEach(elem => {
      if (elementsRates && elementsRates[elem.element]) {
        elementsRanks.push({
          rate: elementsRates[elem.element].finalRate,
          element: elem.element
        });
      }
    });

    const allRanks = _.sortBy(elementsRanks, 'rate');

    allRanks.reverse().map((value, index) => {
      const newValue = value;
      newValue.rank = index + 1;
      return newValue;
    });

    const minRate =
      allRanks.length > 0 ? allRanks[allRanks.length - 1].rate : 0;
    const maxRate = allRanks.length > 0 ? allRanks[0].rate : 5;

    console.log('---------allRanks-------', allRanks);

    const countAll = Object.values(elementsRanks).length;

    const { intl } = this.props;

    const { formatMessage, formatNumber } = intl;

    elements.forEach(elem => {
      if (elementsRates && elementsRates[elem.element]) {
        let foundedRank = allRanks.find(x => x.element === elem.element);

        foundedRank = foundedRank ? foundedRank.rank : 0;

        let value =
          ((elementsRates[elem.element].finalRate - minRate) * 100) /
          (maxRate - minRate);

        value = value < 5 ? 5 : value;

        data.push({
          id: elem.element,
          cat: formatMessage({ id: `global.${elem.category}` }),
          name: elem.elementTitle,
          value,
          icon: elem.symbol,
          isImage: false,
          desc: `
            <div><span class="rank">رتبه: </span> <span>${formatNumber(
              foundedRank
            )}</span> از <span>${formatNumber(countAll)}</span></div>
            <div><span class="rating">امتیاز: </span> <span>${formatNumber(
              elementsRates[elem.element].finalRate
            )}</span> از <span>${formatNumber(5)}</span></div>
          `
        });
      }
    });

    if (!_.isEqual(inputData, data)) {
      console.log('----------data-----------', data);

      this.setState({
        inputData: data
      });
    }
  }

  sourceClick(node) {
    const { history, match } = this.props;

    const { type } = match.params;
    console.log('-----------node--------', node);

    history.push(
      ANALYSIS_ELEMENT.replace(':type', type)
        .replace(':element', node.element)
        .replace(':title', node.name)
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

  changeFactorValue(e) { // option
    console.log("------e.target.value----", e.target.value);
    const value = e.target.value > 1 ? 1 : e.target.value;
    this.setState({
      currentFactorVal: value < 0 ? 0 : value
    });
  }

  recalculateData() {
    console.log('-----this.state------', this.state);
  }

  render() {
    const { match, setElementsRatesDis } = this.props;

    const { type } = match.params;
    console.log('-------type-------', type);

    const { currentFactor, currentFactorVal, elements, inputData } = this.state;

    return (
      <div className="information-analysis-container">
        <AnalysisRate
          analysisFactor={type}
          indicatorsFactor={this.getNewIndicators()}
          setElementsRatesDis={setElementsRatesDis}
        />

        <Query
          query={GET_ELEMENTS}
          variables={{
            offset: -1,
            first: 0
          }}
          /* onCompleted={ data =>  { alert("tttessssss...");
            if( !_.isEqual( data.searchElement.elements, elements ) ) { alert("My test");
              this.setState({elements : data.searchElement.elements})
            }
          }} */
        >
          {({ data, loading, error, refetch }) => {
            if (loading) return <Loading />;

            if (!data || !data.searchElement || !data.searchElement.elements)
              return null;

            console.log('data, error, refetch', data, error, refetch);

            if (!_.isEqual(data.searchElement.elements, elements)) {
              this.setState({ elements: data.searchElement.elements });
              return null;
            }

            return (
              <section className="analysis-factor-wrapper">
                <PageHeadingIcon
                  icon="smfpIcon smfpIcon-illustrated-information"
                  title={<FormattedSimpleMsg id={`analysis.element_${type}`} />}
                />

                <div className="animated animation-fill-mode-backwards fadeInUp fast">
                  <div className="smfp-filter-item text-row-padding">
                    {/* <FormattedMessage id="analysis.select_affected_factor" /> */}
                    شاخص
                  </div>

                  <div className="smfp-filter-item">
                    <ReactSelect
                      name="affected_factor"
                      value={currentFactor}
                      onChange={this.changeFactor}
                      placeholder={<FormattedSimpleMsg id="global.select" />}
                      options={[
                        { value: '', label: 'انتخاب' },
                        { value: 'p1', label: 'وابستگی به سایر کشورها' },
                        { value: 'p2', label: 'تهدید روابط بین‌الملل' },
                        { value: 'p3', label: 'اهمیت راهبردی' },
                        { value: 'p4', label: 'تأثیر انحصار' },
                        { value: 'e1', label: 'مقدار منابع اولیه در ایران' },
                        { value: 'e2', label: 'ارزش اقتصادی' },
                        { value: 'e3', label: 'میزان مصرف داخلی' },
                        { value: 'e4', label: 'پتانسیل صادرات' },
                        {
                          value: 'e5',
                          label: 'تفاوت ارزش مادۀ خام و محصول فرآوری‌شده'
                        },
                        { value: 'e6', label: 'میزان تأثیرگذاری بر صنایع' },
                        { value: 'e7', label: 'دسترسی به منابع ثانویه' },
                        { value: 's1', label: 'میزان اشتغال‌زایی' },
                        { value: 's2', label: 'پراکندگی کشوری' },
                        {
                          value: 's3',
                          label: 'تأثیر در محرومیت‌زدایی منطقه‌ای'
                        },
                        { value: 't1', label: 'محدودیت فناوری‌ها' },
                        { value: 't2', label: 'ناتوانی در تولید ثانویه' },
                        { value: 'en1', label: 'بهینه‎بودن مصرف آب' },
                        { value: 'en2', label: 'بهینه‎بودن مصرف انرژی' },
                        {
                          value: 'en3',
                          label: 'بهینه‎بودن تولید گازهای گلخانه‌ای'
                        },
                        { value: 'en4', label: 'کم‎خطربودن پسماند و پساب' },
                        {
                          value: 'en5',
                          label: 'ایمنی فرآیند تولید برای نیروی انسانی'
                        },
                        { value: 'l1', label: 'اثرپذیری از تحریم‌ها' },
                        {
                          value: 'l2',
                          label: 'تاثیر تعرفه‌های واردات و صادرات'
                        },
                        { value: 'l3', label: 'کمبود حمایت‌های دولتی' }
                      ]}
                    />
                  </div>

                  <div className="smfp-filter-item text-row-padding">
                    {/* <FormattedMessage id="analysis.select_effect_value" /> */}
                    میزان تاثیر
                  </div>

                  <div className="smfp-filter-item">
                    <div className="effect-value-field">
                      <input
                        ref={el => { this.factorValEl = el; }}
                        type="number" 
                        name="effect_value"
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={this.changeFactorValue}
                        value={currentFactorVal}
                      />
                      {/* <ReactSelect
                        name="effect_value"
                        value={currentFactorVal}
                        onChange={this.changeFactorValue}
                        options={[
                          { value: '', label: 'انتخاب' },
                          { value: 0, label: 0 },
                          { value: 0.1, label: 0.1 },
                          { value: 0.2, label: 0.2 },
                          { value: 0.3, label: 0.3 },
                          { value: 0.4, label: 0.4 },
                          { value: 0.5, label: 0.5 },
                          { value: 0.6, label: 0.6 },
                          { value: 0.7, label: 0.7 },
                          { value: 0.8, label: 0.8 },
                          { value: 0.9, label: 0.9 },
                          { value: 1, label: 1 }
                        ]}
                      /> */}
                    </div>
                  </div>

                  {/* <div className="smfp-filter-item">
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
                  </div> */}
                </div>

                <BubbleCloud
                  inputData={inputData}
                  sourceClick={this.sourceClick}
                  type={type}
                />
              </section>
            );
          }}
        </Query>
      </div>
    );
  }
}

AnalysisFactor.propTypes = {
  intl: intlShape.isRequired
};

const mapStateToProps = state => ({
  elementsRates: state.analysis.elementsRates
});

const mapDispatchToProps = dispatch => ({
  setElementsRatesDis: rates => dispatch(setElementsRates(rates))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(AnalysisFactor)));
