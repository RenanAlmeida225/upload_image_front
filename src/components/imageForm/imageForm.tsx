'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import './imageForm.css';
import { Loading } from '../loading/loading';
import { useRouter } from 'next/navigation';

function saveImage(file: File, title: string, description: string) {
	const body = new FormData();
	body.append('file', file);
	body.append('title', title);
	body.append('description', description);
	return fetch('http://localhost:8080/file', {
		method: 'POST',
		mode: 'no-cors',
		body,
	});
}

type Inputs = {
	file: FileList;
	title: string;
	description: string;
};

export function ImageForm() {
	const { register, handleSubmit } = useForm<Inputs>();
	const router = useRouter();
	const [img, setImg] = useState('');
	const [load, setLoad] = useState(false);
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const { file, title, description } = data;
		if (!file.item(0)) {
			return;
		}
		setLoad(true);
		saveImage(file.item(0)!, title, description)
			.then((data) => {
				router.push('/');
			})
			.catch((error) => console.error(error));
	};

	return (
		<>
			{!load ? <></> : <Loading />}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="image">
					<label htmlFor="file" tabIndex={0}>
						<span>{!img ? 'choose an image' : <img src={img} />}</span>
					</label>
					<input
						{...register('file')}
						type="file"
						id="file"
						accept="image/*"
						required
						onChange={(e) => {
							const file = e.target.files!.item(0)!;
							const reader = new FileReader();
							reader.readAsDataURL(file);
							reader.addEventListener('load', (e) => {
								setImg(e.target!.result!.toString());
							});
						}}
					/>
				</div>
				<div className="attributes">
					<input
						{...register('title')}
						type="text"
						required
						placeholder="Add an Title the image"
					/>
					<textarea
						{...register('description')}
						cols={30}
						rows={10}
						placeholder="Add an description the image"
					></textarea>
					<input type="submit" value="SAVE" className="btn-save" />
				</div>
			</form>
		</>
	);
}
