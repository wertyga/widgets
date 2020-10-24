import { Input } from "widgets/components";
import { Carret } from 'widgets/components/Icons/Carret';

import { socket } from '../Socket/socketEvents';

import './styles.css';

const TIMEOUT = 2000;

export class ChatInputField extends React.Component {
  state = {
    value: '',
  };
  timer;

  componentDidUpdate(prevProps) {
    if (prevProps.editValue !== this.props.editValue) {
      this.setState({ value: this.props.editValue });
    }
  }

  sendUserActive = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const { origin, user } = window.W_widgets;
    socket.emit('user_active', { userID: user, origin, active: true });
    this.timer = setTimeout(() => {
      socket.emit('user_active', { userID: user, origin, active: false });
    }, TIMEOUT);
  }

  onChange = ({ target: { value } }) => {
    this.sendUserActive();
    this.setState({ value });
  }

  onSend = () => {
    this.props.onMessage(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <div className="cht-inf">
        <Input
          value={this.state.value}
          onChange={this.onChange}
          className="mb-4"
          textarea
          style={{
            borderLeft: 'none',
            borderRight: 'none',
            borderBottom: 'none',
          }}
        />
        <div onClick={this.onSend} className="cht-inf__btn">
          <Carret />
        </div>
      </div>
    );
  }
}

// export const ChatInputField = ({ lang, onMessage, editValue }) => {
//   let timer;
//   const [value, setValue] = useState('');
//
//   const sendUserActive = () => {
//     if (timer) {
//       clearTimeout(timer);
//       timer = null;
//     }
//
//     const { origin, user } = window.W_widgets;
//     socket.emit('user_active', { userID: user, origin, active: true });
//     timer = setTimeout(() => {
//       socket.emit('user_active', { userID: user, origin, active: false });
//     }, 1000);
//   };
//
//   const onChange = ({ target: { value: message } }) => {
//     sendUserActive();
//     setValue(message);
//   };
//
//   const onSend = () => {
//     onMessage(value);
//     setValue('');
//   };
//
//   useEffect(() => {
//     setValue(editValue);
//   }, [editValue]);
//
//   return (
//     <div className="cht-inf">
//       <Input
//         value={value}
//         onChange={onChange}
//         className="mb-4"
//         textarea
//         style={{
//           borderLeft: 'none',
//           borderRight: 'none',
//           borderBottom: 'none',
//         }}
//       />
//       <div onClick={onSend} className="cht-inf__btn">
//         <Carret />
//       </div>
//     </div>
//   );
// };
