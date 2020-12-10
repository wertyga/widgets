import { useState, useEffect } from 'react';

import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { common } from '../../config/lang';
import { config } from '../../config/config';

import { userCheck, getUserGravatar } from './helpers';

import './styles.css';

export const UserRegisterForm = ({ onChange, errors: propsErrors = {}, propUser, lang }) => {
  const [state, setState] = useState({ name: '', email: '', errors: propsErrors });

  const handleChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value, errors: {} });
  };

  const handleUserEnter = () => {
    const { errors: stateErrors, ...user } = state;
    const { isValid, errors } = userCheck(user, lang);
    if (!isValid) return setState({ ...state, errors });

    const avatar = getUserGravatar(user.email);
    const updatedUser = { ...user, avatar };
    propUser.set(updatedUser);
    onChange(updatedUser);
  };

  useEffect(() => {
    setState({ ...state, errors: propsErrors });
  }, [JSON.stringify(propsErrors)]);

  const { name, email, errors } = state;
  return (
    <div className="w-usr-rg d-flex">
      <a href="https://gravatar.com/" target="__blank">
        <img className="mr-4 avatar" src={`${process.env.SERVER_HOST}/static/anonym.png`} />
      </a>

      <div className="w-usr-rg__inf">
        <Input
          className="mb-2"
          name="name"
          value={name}
          onChange={handleChange}
          error={errors.name}
          placeholder={`${common.name[lang]}...`}
        />
        <Input
          className="mb-2"
          name="email"
          value={email}
          onChange={handleChange}
          error={errors.email}
          placeholder={`${common.email[lang]}...`}
        />

        <Button onClick={handleUserEnter}>
          {common.enter[lang]}
        </Button>
      </div>
    </div>
  );
};
