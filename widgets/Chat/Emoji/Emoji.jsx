import { useState, useEffect, useRef, useMemo } from 'react';
import classnames from 'classnames';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart'

import './styles.css';

export const Emoji = ({ onSelect }) => {
	const emojiRef = useRef();
	const [mounted, setMounted] = useState(false);
	const [opened, setOpen] = useState({
		initial: false,
		value: false,
	});
	
	const addEmoji = (data) => {
		setOpen({ initial: false, value: false });
		onSelect(data.native);
	};
	
	const handleClick = () => {
		if (opened.initial) return;
		setOpen({ initial: true, value: true });
	};
	
	useEffect(() => {
		const search = emojiRef.current.querySelector('.emoji-mart-search');
		const bottom = emojiRef.current.querySelector('.emoji-mart-preview');
		const labels = emojiRef.current.querySelectorAll('.emoji-mart-scroll .emoji-mart-category-label');
		[search, bottom, ...labels].forEach(node => {
			if (!node) return;
			node.style.display = 'none';
		});
		
		setMounted(true);
	}, []);
	
	const addingStyle = opened.value ? {} : { height: '2.5rem' };
	return (
		<div
			className={classnames('emoji', { mounted: mounted, opened })}
			ref={emojiRef}
			onClick={handleClick}
			role="propagation"
		>
			<Picker
				onSelect={addEmoji}
				onClick={handleClick}
				showPreview={false}
				showSkinTones={false}
				exclude={['recent']}
				style={{
					border: 'none',
					width: '100%',
					...addingStyle,
				}}
			/>
		</div>
	);
};
