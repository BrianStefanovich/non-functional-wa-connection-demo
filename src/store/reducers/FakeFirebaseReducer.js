const initState = {
  requesting: {},
  requested: {},
  timestamps: {},
  data: {},
  ordered: {},
  auth: {
    uid: "2CyOQZzVI9Mf3ZBUcov00PLpBFg2",
    displayName: null,
    photoURL: null,
    email: "stefanovich.brian@gmail.com",
    emailVerified: true,
    phoneNumber: null,
    isAnonymous: false,
    tenantId: null,
    providerData: [
      {
        uid: "stefanovich.brian@gmail.com",
        displayName: null,
        photoURL: null,
        email: "stefanovich.brian@gmail.com",
        phoneNumber: null,
        providerId: "password",
      },
    ],
    apiKey: "AIzaSyAXsdOOxF8isFcNw-H-jxeWDy2OoLzTb1A",
    appName: "[DEFAULT]",
    authDomain: "connectivitys-2066c.firebaseapp.com",
    stsTokenManager: {
      apiKey: "AIzaSyAXsdOOxF8isFcNw-H-jxeWDy2OoLzTb1A",
      refreshToken:
        "AOvuKvSshj3S7rGm3PlT6eGG5hPxo6S2jOo40nBF2FznkNnPYnB0NbGImVKiAAVnibBamZPLwBoAvZhCiazWUrKjO44jW34wmoMj7pGL9ERv8KsYEUmaKAyApl9NR_X_NYXOCh-ptV6m_VCWONOH5FieBscLaPS9G1w4r8cWgcbIZGzFyf3OAYTrlfskZHHZjCFYSIfLGWZ-aj8lGdOF-M-cwhJ1zeEb3WaF3yWAYNxDk8HydMYVDZs",
      accessToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYmMyZmI5N2QyNWE1MmQ5MjJhOGRkNTRiZmQ4MzhhOTk4MjE2MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29ubmVjdGl2aXR5cy0yMDY2YyIsImF1ZCI6ImNvbm5lY3Rpdml0eXMtMjA2NmMiLCJhdXRoX3RpbWUiOjE2MTExMDEwMTUsInVzZXJfaWQiOiIyQ3lPUVp6Vkk5TWYzWkJVY292MDBQTHBCRmcyIiwic3ViIjoiMkN5T1FaelZJOU1mM1pCVWNvdjAwUExwQkZnMiIsImlhdCI6MTYxNDA0ODg4OSwiZXhwIjoxNjE0MDUyNDg5LCJlbWFpbCI6InN0ZWZhbm92aWNoLmJyaWFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInN0ZWZhbm92aWNoLmJyaWFuQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.GomC09hemI8ByRpyC1vwznZlOkBVPGuP7JH8g25S3D3_I8ksOVmnmI46eVjpAj5pewN2WC8PJvC_THlZ4l53_QQxisr8MGBpL9VHV5Tz2O7vYUyOKFbJhNM6tMBh8ASDg9D8Cl6JuKhPQaRCUkMgZlR6or0RWpaIlFHHW-59_1rIUw8pnqdf9gv0muZSOHKCPIfDsMEJcYdZL4mvPP2dh_CyhKnAYa2C30yQj6M-TVcTb4YC63gmvSILggciMpWqpt-k0IhTErThzS7sTP9dv8z4q6LmtseG39FprNLZk9zG9-cpd_cb0fOIJ4525eUVaEiKgxSzMTI48uxs25ViFw",
      expirationTime: 1614052489000,
    },
    redirectEventId: null,
    lastLoginAt: "1612740023321",
    createdAt: "1605376833643",
    multiFactor: {
      enrolledFactors: [],
    },
    isEmpty: false,
    isLoaded: true,
  },
  authError: null,
  profile: {
    token: {
      token:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjBlYmMyZmI5N2QyNWE1MmQ5MjJhOGRkNTRiZmQ4MzhhOTk4MjE2MmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY29ubmVjdGl2aXR5cy0yMDY2YyIsImF1ZCI6ImNvbm5lY3Rpdml0eXMtMjA2NmMiLCJhdXRoX3RpbWUiOjE2MTExMDEwMTUsInVzZXJfaWQiOiIyQ3lPUVp6Vkk5TWYzWkJVY292MDBQTHBCRmcyIiwic3ViIjoiMkN5T1FaelZJOU1mM1pCVWNvdjAwUExwQkZnMiIsImlhdCI6MTYxNDA0OTA2NCwiZXhwIjoxNjE0MDUyNjY0LCJlbWFpbCI6InN0ZWZhbm92aWNoLmJyaWFuQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInN0ZWZhbm92aWNoLmJyaWFuQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.FUwNahWSatCv5dh27wrNK-138ugpH5-SHp23kchNRMOxitzByv1d1_-eRG5SperrErh7y0HWGf6Pg2uCGkK5C9zZe2Jme1sBd933II8mBPSuWx61rpCaPxwxCwQakZrPMCHWo35GuxrCZnsTWCYSmkALXlH4AVXLfCglRmhBsEJXZQvdm4Yam1nbWZ-ez2lNzaobZdEY4js_cs0Nve7sNzDu83OdBy5LpuUcUomhPkIND8errqGdzI1xOGKaap3unyPGzrllyA4-a6Ox1ZfMBRcFhcdBbPYWNtZ3rEUW8j5blS_D3vMPyHV7BsTzcJIJk5xbR4Lxs_1-cb7YpCxhyQ",
      expirationTime: "Tue, 23 Feb 2021 03:57:44 GMT",
      authTime: "Wed, 20 Jan 2021 00:03:35 GMT",
      issuedAtTime: "Tue, 23 Feb 2021 02:57:44 GMT",
      signInProvider: "password",
      signInSecondFactor: null,
      claims: {
        iss: "https://securetoken.google.com/connectivitys-2066c",
        aud: "connectivitys-2066c",
        auth_time: 1611101015,
        user_id: "2CyOQZzVI9Mf3ZBUcov00PLpBFg2",
        sub: "2CyOQZzVI9Mf3ZBUcov00PLpBFg2",
        iat: 1614049064,
        exp: 1614052664,
        email: "stefanovich.brian@gmail.com",
        email_verified: true,
        firebase: {
          identities: {
            email: ["stefanovich.brian@gmail.com"],
          },
          sign_in_provider: "password",
        },
      },
    },
    isEmpty: false,
    isLoaded: true,
  },
  listeners: {
    byId: {},
    allIds: [],
  },
  isInitializing: false,
  errors: [],
};

const fakeFirebaseReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};

export default fakeFirebaseReducer;
