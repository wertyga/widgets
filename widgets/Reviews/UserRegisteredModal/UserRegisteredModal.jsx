import { common } from '../../config/lang/common';
import { config } from '../../config/config';
import { Button } from "../../components";

export const UserRegisteredModal = ({ user = {}, onPublish, lang, dropUser }) => {
  const { name, avatar } = user;
  const image = avatar || `${config.serverUrl}/static/anonym.png`;

  return (
    <div className="justify-between">
      <div className="w-rg-usr-md__c d-flex">
        <img className="mr-4 avatar" src={image} alt="Avatar" />
        <div className="flex-column justify-between">
          <span className="font-bold">{name || common.anonym[lang]}</span>
          <span
            onClick={dropUser}
            style={{ cursor: 'pointer' }}
          >
            {common.exit[lang]}
          </span>
        </div>
      </div>

      <Button onClick={onPublish}>
        {common.publish[lang]}
      </Button>
    </div>
  );
};
