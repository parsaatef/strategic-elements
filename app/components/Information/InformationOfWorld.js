import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import _ from 'underscore';
import { ELEMENT_INFORMATION } from '../../constants/routes';
import Select from '../General/Select';
import IconButton from '../General/IconButton';
import PageHeadingIcon from '../General/PageHeadingIcon';
import { getYearOptions, getElementsCategory } from '../../utils/utility';
import ElementsSelect from './ElementsSelect';
import MapInfo from './MapInfo';

// window.d3 = d3;

/* const MapOptions = [
  { value: 'world', label: 'جهان' },
  { value: 'iran', label: 'ایران' }
]; */

const typeOptions = [
  { value: 'product', label: 'تولید' },
  { value: 'source', label: 'منابع' },
  { value: 'export', label: 'صادرات' },
  { value: 'import', label: 'واردات' }
];

const groupsOptions = getElementsCategory();

const yearOptions = getYearOptions(1990, 2030);

class InformationOfWorld extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      locationType: 'world',
      /**
       * TODO: remove hard code and calculate 1 year ago from now
       */
      year: 2018,
      elements: ['gold'],
      group: '',
      currentElement: {
        value: 'gold',
        label: 'طلا'
      },
      elementDefault: {
        value: 'gold',
        label: 'طلا'
      },
      elementSelectRefresh: '',
      type: 'product'
    };

    this.onChangeElement = this.onChangeElement.bind(this);

    this.setGroupElements = this.setGroupElements.bind(this);
  }

  onChangeElement(element) {
    this.setState({
      elements: [element.value],
      currentElement: element
    });
  }

  changeOptions(type, selectedOption) {
    this.setState({
      [type]: selectedOption.value
    });
  }

  setGroupElements(elementsObj, selectedOption) {
    const { group, elements } = this.state;

    const newElements = elementsObj.map(elem => elem.element);

    if (group && (!selectedOption || !selectedOption.value)) {
      let isEqual = true;

      if (elements.length === newElements.length) {
        elements.forEach(elem => {
          if (!newElements.includes(elem)) {
            isEqual = false;
          }
        });
      } else {
        isEqual = false;
      }

      if (!isEqual) {
        this.setState({
          elements: [...newElements],
          currentElement: {}
        });
      }
    } else if (
      !group &&
      (!selectedOption || !selectedOption.value) &&
      newElements.length > 0
    ) {
      this.setState({
        elementDefault: {
          label: elementsObj[0].elementTitle,
          value: elementsObj[0].element
        },
        elementSelectRefresh: _.uniqueId('element_refresh_')
      });
    }
  }

  render() {
    const {
      year,
      group,
      currentElement,
      elementDefault,
      elementSelectRefresh,
      type
    } = this.state;

    const currGroup = groupsOptions.find(grp => grp.value === group);

    const currGroupLabel = currGroup && currGroup.label ? currGroup.label : '';

    return (
      <section>
        <div className="info-select-group">
          <PageHeadingIcon
            icon="smfpIcon smfpIcon-illustrated-information"
            title={
              <FormattedMessage
                id="global.map_page_heading"
                values={{
                  element: currentElement.value
                    ? currentElement.label
                    : currGroupLabel
                }}
              />
            }
          />

          <Row>
            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast animation-fill-mode-backwards"
            >
              {/* <Select
                options={MapOptions}
                placeholder="انتخاب نقشه"
                onChange={this.changeOptions.bind(this, 'locationType')}
                defaultValue={locationType}
              /> */}

              <Select
                options={typeOptions}
                placeholder="انتخاب نوع"
                onChange={this.changeOptions.bind(this, 'type')}
                defaultValue={type}
              />
            </Col>

            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast delay-0-5s animation-fill-mode-backwards"
            >
              <Select
                options={groupsOptions}
                placeholder="انتخاب دسته"
                onChange={this.changeOptions.bind(this, 'group')}
                defaultValue={group}
              />
            </Col>

            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast delay-1s animation-fill-mode-backwards"
            >
              <ElementsSelect
                group={group}
                onChangeElement={this.onChangeElement}
                setGroupElements={this.setGroupElements}
                elementDefault={elementDefault}
                elementSelectRefresh={elementSelectRefresh}
              />
            </Col>

            <Col
              sm={3}
              xs={6}
              className="animated flipInX fast delay-1-5s animation-fill-mode-backwards"
            >
              <Select
                options={yearOptions}
                placeholder="انتخاب سال"
                onChange={this.changeOptions.bind(this, 'year')}
                defaultValue={year}
              />
            </Col>
          </Row>
        </div>

        <MapInfo {...this.state} />

        {currentElement.value && (
          <IconButton
            className="text-center btn-element-wrap animated fadeInUp fast"
            link={ELEMENT_INFORMATION.replace(':element', currentElement.value)}
            icon="smfpIcon smfpIcon-element"
            title="نمایش اطلاعات ماده معدنی"
          />
        )}
      </section>
    );
  }
}

InformationOfWorld.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(InformationOfWorld);
