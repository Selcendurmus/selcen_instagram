import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInformationInputs: false,
      handle: '',
      website: '',
      location: '',
      bio: '',
      email: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

  if (nextProps.profile.profile) {
    const profile = nextProps.profile.profile;

     // If profile field doesnt exist, make empty string
     profile.website = !isEmpty(profile.website) ? profile.website : '';
     profile.location = !isEmpty(profile.location) ? profile.location : '';
     profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
     profile.information = !isEmpty(profile.information) ? profile.information : {};
     profile.email = !isEmpty(profile.information.email)
       ? profile.information.email
       : '';
         

       // Set component fields state
      this.setState({
        handle: profile.handle,
        website: profile.website,
        location: profile.location,
        bio: profile.bio,
        email: profile.email,
        });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      email: this.state.email,
        
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displayInformationInputs } = this.state;

    let informationInputs;

    if (displayInformationInputs) {
      informationInputs = (
        <div>
          <InputGroup
            placeholder="Email"
            name="email"
            icon="fab fa-email"
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
          />

          

        </div>
      );
    }

    // Select options for gender
    //const options = [
      //{ label: 'Select Gender', value: 0 },
     // { label: 'Male', value: 'Male' },
      //{ label: 'Female', value: 'Female' },
     // { label: 'Other', value: 'Other' },
     // { label: 'Prefer not to answer', value: 'Prefer not to answer' },
   // ];

    
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

              
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayInformationInputs: !prevState.displayInformationInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Information
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {informationInputs}
                <input
                  type="Submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);