import axios from 'axios';
import shortID from 'short-id';
import { config } from './config/config';
import { getCookie, setCookie } from '../utils/cookies';

function injectFont() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap';
  document.head.appendChild(link);
};

function injectAddingStyles(service, addingStyles) {
  const id = `w-${service}-styles-custom`
  const existStyleTag = document.getElementById(id);
  if (existStyleTag) return;

  const styleTag = document.createElement('style');
  styleTag.id = id;
  styleTag.innerHTML = addingStyles;
  document.body.appendChild(styleTag);
};

function defineBootstrap () {
  const userIDCookie = getCookie('w-userID') || shortID.generate();
  setCookie('w-userID', userIDCookie);
  window.W_widgets = {
    ...window.W_widgets,
    user: userIDCookie,
    bootstrap: function() { bootstrap(window.location.href) },
  };
};

function fetchCss(cssUrl) {
  const [_, service] = cssUrl.match(/_(\w+).css/);
  const id = `w-${service}-styles-common`;
  const existStyles = document.getElementById(id);
  if (existStyles) return;

  return axios(cssUrl)
    .then(res => {
      const style = document.createElement('style');
      style.id = id;
      style.innerHTML = res.data;
      document.head.appendChild(style);
    })
};
function fetchScript(script) {
  const { filename, type } = script
  const [_, service] = filename.match(/_(\w+)_\w+.js/);
  const id = `w-${service}-script`;
  const existScript = document.getElementById(id);
  if (existScript && type === 'reload') {
    document.body.removeChild(existScript);
  }
  const scriptTag = document.createElement('script');
  scriptTag.id = id;
  scriptTag.src = filename;
  document.body.appendChild(scriptTag);
};

function injectScripts({ scripts, css, addingStyles }) {
  if (css && css.length) {
    Promise.all(css.map(cssUrl => fetchCss(cssUrl)));
  }
  if (addingStyles) {
    Object.entries(addingStyles).forEach(([service, styles]) => {
      if (!Object.keys(styles).length) return;
      injectAddingStyles(service, styles);
    });
  }

  if (scripts) {
    for(let i = 0; i < scripts.length; i++) {
      fetchScript(scripts[i]);
    }
  }
};

function bootstrap(href) {
  if (!href) return;
  const widgetConfig = window.W_widgets || {};
  const { token } = widgetConfig;

  const containers = document.querySelectorAll('[w-data]');
  const ids = [];
  for(let i = 0; i < containers.length; i++) {
    const id = containers[i].getAttribute('w-data');
    ids.push(id);
  }

  if (!ids.length) return;
  return fetch(`${config.serverUrl}/main`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      href: href.split('?')[0],
      ids: ids,
    })
  })
    .then(response => response.json())
    .then(({ scripts, css, addingStyles }) => {
      injectScripts({ scripts, css, addingStyles });
    })
    .catch(e => console.log(e));
};

let oldHref;

(function () {
  window.addEventListener('load', function() {
    injectFont();
    defineBootstrap();
    oldHref = window.location.href;
    bootstrap(window.location.href);
  });
})();
