import React from 'react';

import { render } from 'react-dom';
import { useEffect } from 'react';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';

const WComponent = ({ location: { pathname } }) => {
  const renderPathReviews = ['/', '/reviews'];
  const renderPathChat = ['/', '/chat'];
  useEffect(() => {
    const { W_widgets: { bootstrap } = {} } = window;
    bootstrap && bootstrap();
  }, [pathname]);

  return (
    <div>
      {renderPathReviews.includes(pathname) &&
        <div w-data="reviews" className="w-widgets"/>
      }
      {renderPathChat.includes(pathname) &&
        <div w-data="chat" className="w-widgets"/>
      }
    </div>
  );
};

const Main = () => {
  return (
    <div>
      <h1>Main Page</h1>
      {/*<div w-data="reviews" className="w-widgets" />*/}
      {/*<div w-data="chat" className="w-widgets" />*/}
    </div>
  );
};

const Reviews = () => {
  return (
    <div>
      <h1>Another Page</h1>
      {/*<div w-data="reviews" className="w-widgets" />*/}
    </div>
  );
};
const Chat = () => {
  return (
    <div>
      <h1>Chat Page</h1>
      {/*<div w-data="chat" className="w-widgets" />*/}
    </div>
  );
};
const Both = () => {
  return (
    <div>
      <h1>Both Page</h1>
      {/*<div w-data="reviews" className="w-widgets" />*/}
      {/*<div w-data="chat" className="w-widgets" />*/}
    </div>
  );
};


const Empty = () => {
  return (
    <div>
      <h1>Empty Page</h1>
    </div>
  );
};

const Wrapper = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">To main page</Link>
        </li>
        <li>
          <Link to="/reviews">To reviews page</Link>
        </li>
        <li>
          <Link to="/chat">To chat page</Link>
        </li>
        <li>
          <Link to="/both">To both page</Link>
        </li>
        <li>
          <Link to="/empty">To empty page</Link>
        </li>
      </ul>
      <Route path="*" component={WComponent} />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/reviews" exact component={Reviews} />
        <Route path="/chat" exact component={Chat} />
        <Route path="/empty" exact component={Empty} />
      </Switch>
    </div>
  );
};

render(
  <BrowserRouter>
    <Wrapper />
  </BrowserRouter>,
  document.getElementById('client-data'),
);
