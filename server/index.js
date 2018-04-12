require('dotenv').config({ silent: true });
const express = require('express');
const logger = require('morgan');
const path = require('path');
const simpleOauthModule = require('simple-oauth2');
const randomstring = require('randomstring');

// Constants
const PORT = process.env.PORT || 3000;

// App
const app = express();

// OAuth
const oauth2 = simpleOauthModule.create({
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET
  },
  auth: {
    // Supply GIT_HOSTNAME for enterprise github installs.
    tokenHost: process.env.GIT_HOSTNAME || 'https://github.com',
    tokenPath: process.env.OAUTH_TOKEN_PATH || '/login/oauth/access_token',
    authorizePath: process.env.OAUTH_AUTHORIZE_PATH || '/login/oauth/authorize'
  }
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: process.env.REDIRECT_URL,
  scope: process.env.SCOPES || 'repo,user',
  state: randomstring.generate(32)
});

// log to stdout
// app.use(
//   logger(
//     JSON.stringify({
//       body_bytes_sent: ':res[content-length]',
//       http_referrer: ':referrer',
//       http_user_agent: ':user-agent',
//       remote_addr: ':remote-addr',
//       remote_user: ':remote-user',
//       request: ':url',
//       request_time: ':response-time ms',
//       status: ':status',
//       time_local: ':date'
//     })
//   )
// );

// serve static file from root path
app.use('/', express.static(path.join(__dirname, '../dist')));

// Initial page redirecting to Github
app.get('/auth', (req, res) => {
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    let mess;
    let content;

    if (error) {
      console.error('Access Token Error', error.message);
      mess = 'error';
      content = JSON.stringify(error);
    } else {
      const token = oauth2.accessToken.create(result);
      mess = 'success';
      content = {
        token: token.token.access_token,
        provider: 'github'
      };
    }

    const script = `
    <script>
    (function() {
      function recieveMessage(e) {
        console.log("recieveMessage %o", e)
        // send message to main window with da app
        window.opener.postMessage(
          'authorization:github:${mess}:${JSON.stringify(content)}',
          e.origin
        )
      }
      window.addEventListener("message", recieveMessage, false)
      // Start handshare with parent
      console.log("Sending message: %o", "github")
      window.opener.postMessage("authorizing:github", "*")
      })()
    </script>`;
    return res.send(script);
  });
});

app.get('/success', (req, res) => {
  res.send('');
});

app.listen(PORT);

console.log(`Running on http://localhost:${PORT}`);
