import React,{ Component } from 'react';
import routes from '../constants/routes';
//import { Link } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { userActions } from '../_actions';

export default class Login extends Component<Props> {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        //const { dispatch } = this.props;
        //if (username && password) {
        //    dispatch(userActions.login(username, password));
        //}
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (


            <div className="smfp-login-page">
                <div className="smfp-login-wrap">
                    <div className="smfp-login-wrap-inner">

                        <div className="smfp-login-heading"><h1>سامانه مدیریتی فناورانه پویا</h1></div>

                        <form name="loginform" id="loginform" action="" method="post" onSubmit={this.handleSubmit}>

                            <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                <label className="smfp-input-wrap user-name">
                                    <input type="text" placeholder="نام کاربری یا ایمیل" className="form-control" name="username" value={username} onChange={this.handleChange} />
                                </label>
                                {submitted && !username &&
                                <div className="help-block">Username is required</div>
                                }
                            </div>

                            <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                <label className="smfp-input-wrap password">
                                    <input type="password" placeholder="رمز ورود" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                </label>
                                {submitted && !password &&
                                <div className="help-block">Password is required</div>
                                }
                            </div>

                            <div className="form-group">
                                <input type="submit" name="smfp-submit" id="smfp-submit" className="submit button button-primary button-large" value="ورود" />
                                {//loggingIn &&
                                }
                            </div>

                            <div>
                                <label htmlFor="rememberme" className="forgetmenot">
                                    <input name="rememberme" type="checkbox" id="rememberme" /> مرا به خاطر بسپار
                                </label>
                                <div className="smfp-other"><a href="#" className="signup">ثبت
                                    نام</a><span> / </span><span className="lostpassword">فراموشی رمز عبور</span>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>

        );
    }
}

