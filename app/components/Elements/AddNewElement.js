import React, { Component } from 'react';

export default class AddNewElement extends Component<Props> {
  render() {
    return (
      <div>
        <h4 id="add-new-user">Add New Element</h4>

        <form>
          <table className="smfp-form-table">
            <tbody>
              <tr className="form-field">
                <th scope="row">
                  <div className="Name_element">Name</div>
                </th>
                <td>
                  <input name="Name_element" type="text" id="Name_element" />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Symbol_element">Symbol</div>
                </th>
                <td>
                  <input
                    className="Symbol_element"
                    name="Symbol_element"
                    type="text"
                    id="Symbol_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Atomic_number_element">Atomic number</div>
                </th>
                <td>
                  <input
                    name="Atomic_number_element"
                    type="text"
                    id="Atomic_number_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Group_element">Group</div>
                </th>
                <td>
                  <input name="Group_element" type="text" id="Group_element" />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Period_element">Period</div>
                </th>
                <td>
                  <input
                    name="Period_element"
                    type="text"
                    id="Period_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Standard_atomic_weight_element">
                    Standard atomic weight
                  </div>
                </th>
                <td>
                  <input
                    name="Standard_atomic_weight_element"
                    type="text"
                    id="Standard_atomic_weight_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Atomic_Volume_element">Atomic Volume</div>
                </th>
                <td>
                  <input
                    name="Atomic_Volume_element"
                    type="text"
                    id="Atomic_Volume_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Melting_point_element">Melting point</div>
                </th>
                <td>
                  <input
                    name="Melting_point_element"
                    type="text"
                    id="Melting_point_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Boiling_point_element">Boiling point</div>
                </th>
                <td>
                  <input
                    name="Boiling_point_element"
                    type="text"
                    id="Boiling_point_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Phase_at_STP_element">Phase at STP</div>
                </th>
                <td>
                  <input
                    name="Phase_at_STP_element"
                    type="text"
                    id="Phase_at_STP_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Special_weight_element">Special weight</div>
                </th>
                <td>
                  <input
                    name="Special_weight_element"
                    type="text"
                    id="Special_weight_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Electronegativity_element">
                    Electronegativity
                  </div>
                </th>
                <td>
                  <input
                    name="Electronegativity_element"
                    type="text"
                    id="Electronegativity_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Oxidation_states_element">
                    Oxidation states
                  </div>
                </th>
                <td>
                  <input
                    name="Oxidation_states_element"
                    type="text"
                    id="Oxidation_states_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Electron_configuration_element">
                    Electron configuration
                  </div>
                </th>
                <td>
                  <input
                    name="Electron_configuration_element"
                    type="text"
                    id="Electron_configuration_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Atomic_radius_element">Atomic radius</div>
                </th>
                <td>
                  <input
                    name="Atomic_radius_element"
                    type="text"
                    id="Atomic_radius_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Density1_element">Density1</div>
                </th>
                <td>
                  <input
                    name="Density1_element"
                    type="text"
                    id="Density1_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Density2_element">Density2</div>
                </th>
                <td>
                  <input
                    name="Density2_element"
                    type="text"
                    id="Density2_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Crystal_structure_element">
                    Crystal structure
                  </div>
                </th>
                <td>
                  <input
                    name="Crystal_structure_element"
                    type="text"
                    id="Crystal_structure_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Hardness_element">Hardness</div>
                </th>
                <td>
                  <input
                    name="Hardness_element"
                    type="text"
                    id="Hardness_element"
                  />
                </td>
              </tr>
              <tr className="form-field">
                <th scope="row">
                  <div className="Toxicity_element">Toxicity</div>
                </th>
                <td>
                  <input
                    name="Toxicity_element"
                    type="text"
                    id="Toxicity_element"
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
              value="Add New Element"
            />
          </p>
        </form>
      </div>
    );
  }
}
