import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { addition, deletion } from '../../store/todoSlice';
import style from './List.module.css';

const TodoList = () => {
	const { list } = useAppSelector((state) => state.todo);
	const [text, setText] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (text.trim() === '') {
			return;
		}

		dispatch(addition(text));
		setText('');
	};

	const handleDelete = (index: number) => {
		dispatch(deletion(index));
	};

	return (
		<section className={style.todoContainer}>
			<form className={style.todoForm} onSubmit={handleSubmit}>
				<input
					type='text'
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder='Next to do...?'
				/>
				<button className={style.todoAddButton}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						width='24'
						height='24'
					>
						<path fill='none' d='M0 0h24v24H0z'></path>
						<path
							fill='currentColor'
							d='M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z'
						></path>
					</svg>
					<span>Add</span>
				</button>
			</form>
			{list?.map((todo, index) => (
				<div key={index} className={style.todoItem}>
					{todo}
					<button onClick={() => handleDelete(index)}>Del</button>
				</div>
			))}
		</section>
	);
};

export default TodoList;
