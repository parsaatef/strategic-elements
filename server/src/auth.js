import { AuthenticationError } from 'apollo-server-express';
import { User } from './models';

export const attemptSignIn = async (email, password) => {
  const message = 'Incorrect email or password. Please try again.';

  const user = await User.findOne({ email });

  if (!user || !(await user.matchesPassword(password))) {
    throw new AuthenticationError(message);
  }

  return user;
};

const signedIn = req => req.currentUser;

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in.');
  }
};

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You are already signed in.');
  }
};

// TODO: we should use redis and JWT for Sign Out
export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err);

      // res.clearCookie(SESS_NAME)
      res.clearCookie();

      resolve(true);
    });
    resolve(true);
  });
