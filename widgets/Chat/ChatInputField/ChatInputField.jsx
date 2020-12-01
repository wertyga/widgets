import { getStorage } from 'utils';
import { Input } from "widgets/components";
import { ChatSubmitBtn } from '../ChatSubmitBtn/ChatSubmitBtn';
import { Emoji } from '../Emoji/Emoji';

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

    const { origin, userId } = getStorage();
    socket.emit('user_active', { userID: userId, origin, active: true });
    this.timer = setTimeout(() => {
      socket.emit('user_active', { userID: userId, origin, active: false });
    }, TIMEOUT);
  }

  onChange = ({ target: { value } }) => {
    this.sendUserActive();
    this.setState({ value });
    if (!value) this.props.onMessage(value); // Drop edit message
  }

  onSend = () => {
    this.props.onMessage(this.state.value);
    this.setState({ value: '' });
  }
  
  handleEmojiSelect = (emoji) => {
    this.setState({ value: `${this.state.value}${emoji}` });
  }

  render() {
    return (
      <div className="cht-inf flex-column">
        <div className="d-flex align-center w-100">
          <Input
            value={this.state.value}
            onChange={this.onChange}
            className="pb-4"
            textarea
          />
          <ChatSubmitBtn
            onSubmit={this.onSend}
          />
          </div>
        <Emoji
          onSelect={this.handleEmojiSelect}
        />
      </div>
    );
  }
}
