/**
 * BubbleCloud Component
 */
import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import ReactSelect from 'react-select';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { GET_ELEMENTS } from '../../queries/element';
import BubbleCloud from '../../components/bubble/BubbleCloud';
import { ANALYSIS_ELEMENT } from '../../constants/routes';
import item4 from '../../images/menu-item-4.jpg';
import { FormattedSimpleMsg } from '../../utils/utility';
import PageHeadingIcon from '../../components/General/PageHeadingIcon';
import Loading from '../../components/General/Loading';

type Props = {
  history: object,
  match: object
};

class AnalysisFactor extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      // currentElement: '' ,
      currentFactor: { value: '', label: 'انتخاب' },
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
            if (loading) return <Loading />;

            if (!data || !data.searchElement || !data.searchElement.elements)
              return null;

            console.log('data, error, refetch', data, error, refetch);

            const inputData = this.getData(data.searchElement.elements);

            return (
              <section className="analysis-factor-wrapper">
                <PageHeadingIcon
                  icon="smfpIcon smfpIcon-illustrated-information"
                  title={<FormattedSimpleMsg id={`analysis.element_${type}`} />}
                />

                <div className="animated fadeInUp fast">
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
                      <ReactSelect
                        name="effect_value"
                        value={currentFactorVal}
                        onChange={this.changeFactorValue}
                        options={[]}
                      />
                    </div>
                  </div>

                  <div className="smfp-filter-item">
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
                  </div>
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

export default withRouter(AnalysisFactor);
