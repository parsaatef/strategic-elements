import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import ReactSelect from 'react-select';
import List from './List';
import Register from './Register';
import Tabs from '../General/Tabs/Tabs';
import Tab from '../General/Tabs/Tab';
import TabsContent from '../General/Tabs/TabsContent';
import TabItems from '../General/Tabs/TabItems';

class Page extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      currentElement: ''
    };

    this.setCurrentElement = this.setCurrentElement.bind(this);
  }

  setCurrentElement(e) {
    this.setState({
      currentElement: e.target.value
    });
  }

  activeRoute(routeName) {
    const { location } = this.props;

    return location.pathname.indexOf(routeName) > -1;
  }

  render() {
    const {
      id,
      form,
      schema,
      hasElementTab,
      registerRoute,
      listRoute,
      editRoute,
      query,
      listTitle,
      filters,
      columns,
      indexCol,
      keyCol,
      titleCol,
      registerTitle,
      editTitle
    } = this.props;

    const { item } = query;

    const isEdit = this.activeRoute(editRoute);

    const { currentElement } = this.state;

    return (
      <section>
        <Tabs>
          <TabItems>
            {hasElementTab && (
              <Tab>
                <ReactSelect
                  onChange={this.setCurrentElement}
                  value={currentElement}
                  options={[
                    {
                      label: 'Contributor',
                      value: 'contributor'
                    },
                    {
                      label: 'Author',
                      value: 'author'
                    },
                    {
                      label: 'Editor',
                      value: 'editor'
                    },
                    {
                      label: 'Administrator',
                      value: 'administrator'
                    }
                  ]}
                />
              </Tab>
            )}
            <Tab
              link={registerRoute}
              isActive={this.activeRoute(registerRoute)}
            >
              <div className="icon">
                <span className="fal fa-th-list" />
              </div>
              <div className="title">
                <span>
                  <FormattedMessage id="global.register" />
                </span>
              </div>
            </Tab>
            <Tab link={listRoute} isActive={this.activeRoute(listRoute)}>
              <div className="icon">
                <span className="fal fa-th-list" />
              </div>
              <div className="title">
                <span>
                  <FormattedMessage id="global.list" />
                </span>
              </div>
            </Tab>
            {isEdit && (
              <Tab isActive={isEdit}>
                <div className="icon">
                  <span className="fal fa-th-list" />
                </div>
                <div className="title">
                  <span>
                    <FormattedMessage id="global.edit" />
                  </span>
                </div>
              </Tab>
            )}
          </TabItems>

          <TabsContent>
            <div className="smfp-ht-tabs-content">
              {this.activeRoute(listRoute) && (
                <List
                  heading={listTitle}
                  query={query}
                  filters={filters}
                  columns={columns}
                  editRoute={editRoute}
                  indexCol={indexCol}
                  keyCol={keyCol}
                  titleCol={titleCol}
                />
              )}

              {this.activeRoute(registerRoute) && (
                <Register
                  formCmp={form}
                  validationSchema={schema}
                  initialValues={{}}
                  type="register"
                  listRoute={listRoute}
                  query={query}
                  heading={registerTitle}
                />
              )}

              {isEdit && (
                <Query
                  query={item.gql}
                  variables={{
                    id
                  }}
                >
                  {({ data, loading, error }) => {
                    console.log('----data-----', data, loading, error);
                    if (loading) return 'loading.....';
                    return (
                      <Register
                        formCmp={form}
                        validationSchema={schema}
                        initialValues={
                          data && data[item.func] ? data[item.func] : {}
                        }
                        type="edit"
                        id={id}
                        listRoute={listRoute}
                        query={query}
                        heading={editTitle}
                      />
                    );
                  }}
                </Query>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    );
  }
}

Page.defaultProps = {
  hasElementTab: true
};

const mapStateToProps = state => ({
  location: state.router.location
});

export default connect(mapStateToProps)(Page);
