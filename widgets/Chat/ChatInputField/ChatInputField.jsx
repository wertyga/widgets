import { Input } from "widgets/components";
import { AngleRight } from 'widgets/components/Icons';

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
    if (!value) this.props.onMessage(value); // Drop edit message
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
          <AngleRight />
        </div>
      </div>
    );
  }
}
