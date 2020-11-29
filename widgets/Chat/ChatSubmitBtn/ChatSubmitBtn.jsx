import { AngleRight } from "../../components/Icons";

import './styles.css';

export const ChatSubmitBtn = ({ onSubmit }) => {
	return (
		<div onClick={onSubmit} className="cht-inf__btn">
			<button>
				<AngleRight />
			</button>
		</div>
	);
};
