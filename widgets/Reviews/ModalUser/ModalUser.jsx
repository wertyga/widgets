import { UserRegisteredModal } from '../UserRegisteredModal/UserRegisteredModal';
import { UserRegisterForm } from '../UserRegisterForm/UserRegisterForm';
import { _isEmpty } from '../../../utils';

export const ModalUser = ({
                            onPublish, user, dropUser, propUser,
                            handleUserChangeInput, userError, lang,
                          }) => {
  return (
    <div>
      {!_isEmpty(user) ?
        <UserRegisteredModal
          onPublish={onPublish}
          dropUser={dropUser}
          user={user}
          lang={lang}
        /> :
        <UserRegisterForm
          values={user}
          propUser={propUser}
          errors={userError}
          onChange={handleUserChangeInput}
          lang={lang}
        />
      }
    </div>
  );
};
