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

function injectAddingStyles(addingStyles) {
  const styleTag = document.createElement('style');
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
  axios(cssUrl)
    .then(res => {
      const style = document.createElement('style');
      style.innerHTML = res.data;
      document.head.appendChild(style);
    })
};

function injectScripts({ scripts, css, addingStyles }) {
  if (css && css.length) {
    Promise.all(css.map(cssUrl => fetchCss(`${config.serverUrl}/${cssUrl}`)));
  }
  if (addingStyles && addingStyles.length) {
    addingStyles.forEach((styles) => {
      injectAddingStyles(styles);
    });
  }

  if (scripts) {
    for(let i = 0; i < scripts.length; i++) {
      const script = document.createElement('script');

      script.src = `${config.serverUrl}/${scripts[i]}`;
      document.body.appendChild(script);
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
