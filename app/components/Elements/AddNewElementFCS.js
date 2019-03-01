import React, { Component } from 'react';
import Menu from '../Menu/Menu';

export default class AddNewElementFCS extends Component<Props> {
  render() {
    return (
      <div className="container">
        <div className="smfp-main-page">
          <div className="row">
            <div className="col-sm-3">
              <Menu />
            </div>

            <div className="col-sm-9">
              <div className="smfp-main-container smfp-Custom-scrollbar-container">
                <div className="smfp-main-container-inner">
                  <h4 id="add-new-user">
                    Add New Element for the countries or states
                  </h4>

                  <form>
                    <table className="smfp-form-table">
                      <tbody>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="Element_Name_el">Element Name</div>
                          </th>
                          <td>
                            <select
                              className="smfp-select2"
                              name="Element_Name_el"
                              id="Element_Name_el"
                            >
                              <option selected="selected" value="Copper">
                                Copper
                              </option>
                              <option value="Zinc">Zinc</option>
                              <option value="Gallium">Gallium</option>
                              <option value="Germanium">Germanium</option>
                              <option value="Selenium">Selenium</option>
                            </select>
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="Group_el">Group</div>
                          </th>
                          <td>
                            <select
                              className="smfp-select2"
                              name="Group_el"
                              id="Group_el"
                            >
                              <option selected="selected" value="Group1">
                                Group1
                              </option>
                              <option value="Group2">Group2</option>
                              <option value="Group3">Group3</option>
                            </select>
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="Country_el">Country</div>
                          </th>
                          <td>
                            <select
                              className="smfp-select2"
                              name="Country_el"
                              id="Country_el"
                            >
                              <option selected="selected" value="Iran">
                                Iran
                              </option>
                              <option value="India">India</option>
                              <option value="China">China</option>
                              <option value="United States">
                                United States
                              </option>
                              <option value="Turkey">Turkey</option>
                            </select>
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="State_el">State</div>
                          </th>
                          <td>
                            <select
                              className="smfp-select2"
                              name="State_el"
                              id="State_el"
                            >
                              <option selected="selected" value="Tehran">
                                Tehran
                              </option>
                              <option value="Yazd">Yazd</option>
                              <option value="Tabriz">Tabriz</option>
                              <option value="Kerman">Kerman</option>
                              <option value="Golestan">Golestan</option>
                            </select>
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="Year_el">Year</div>
                          </th>
                          <td>
                            <select
                              className="smfp-select2"
                              name="Year_el"
                              id="Year_el"
                            >
                              <option selected="selected" value="2000">
                                2000
                              </option>
                              <option value="2005">2005</option>
                              <option value="2010">2010</option>
                              <option value="2015">2015</option>
                              <option value="2019">2019</option>
                            </select>
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="extraction_el">extraction</div>
                          </th>
                          <td>
                            <input
                              name="extraction_el"
                              type="text"
                              id="extraction_el"
                            />
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="Production_el">Production</div>
                          </th>
                          <td>
                            <input
                              name="Production_el"
                              type="text"
                              id="Production_el"
                            />
                          </td>
                        </tr>
                        <tr className="form-field">
                          <th scope="row">
                            <div className="Consumption_el">Consumption</div>
                          </th>
                          <td>
                            <input
                              name="Consumption_el"
                              type="text"
                              id="Consumption_el"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="submit">
                      <input
                        type="submit"
                        name="createuser"
                        id="createuser"
                        className="btn btn-primary"
                        value="Add New"
                      />
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
