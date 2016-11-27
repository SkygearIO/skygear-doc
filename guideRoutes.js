const guideRoutes = {
  'auth': {
    'basics': {
      'js': {
        'markdown': require('./content/auth/basics-js.md')
      },
      'android': {
        'markdown': require('./content/auth/basics-android.md')
      },
      'ios': {
        'markdown': require('./content/auth/basics-ios.md')
      },
    },
    'social-login': {
      'js': {
        'markdown': require('./content/auth/social-login-js.md')
      },
      'android': {
        'markdown': require('./content/auth/social-login-android.md')
      },
      'ios': {
        'markdown': require('./content/auth/social-login-ios.md')
      },
    },
    'user-profile': {
      'js': {
        'markdown': require('./content/auth/user-profile-js.md')
      },
      'android': {
        'markdown': require('./content/auth/user-profile-android.md')
      },
      'ios': {
        'markdown': require('./content/auth/user-profile-ios.md')
      },
    },
  },
};

export default guideRoutes;
