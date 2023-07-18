'use client';
import { useState } from 'react';
import './imageForm.css';

export function ImageForm() {
	let [image, setImage] = useState('');
	let [file, setfile] = useState<File>();
	let [title, setTitle] = useState('');
	let [description, setDescription] = useState('');

	const save = (file: File, title: string, description: string) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('title', title);
		formData.append('description', description);
		fetch('http://localhost:8080/file', {
			method: 'POST',
			mode: 'no-cors',
			body: formData,
		});
	};

	return (
		<div className="imageForm">
			<div className="image">
				<label htmlFor="image_input" tabIndex={0}>
					<span>{image ? <img src={image} /> : 'choose an image'}</span>
				</label>
				<input
					type="file"
					name="file"
					accept="image/*"
					id="image_input"
					required
					onChange={(e) => {
						const img = e.target!.files!.item(0);
						setfile(img!);
						let reader = new FileReader();
						reader.readAsDataURL(img!);
						reader.onload = () => {
							setImage(reader.result!.toString());
						};
					}}
				/>
			</div>
			<div className="attribute">
				<input
					type="text"
					name="title"
					placeholder="Title..."
					required
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<textarea
					name="description"
					cols={30}
					rows={10}
					placeholder="Description..."
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				></textarea>
				<button
					className="btn-save"
					onClick={() => save(file!, title, description)}
				>
					Salvar
				</button>
			</div>
		</div>
	);
}
