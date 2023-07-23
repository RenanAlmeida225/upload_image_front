import Image from 'next/image';
import './layoutImage.css';

interface Image {
	id: number;
	title: string;
	description: string;
	url: string;
}

async function getData(): Promise<Image[]> {
	const res = await fetch('http://localhost:8080/file', { cache: 'no-store' });
	if (!res.ok) {
		throw new Error('error');
	}
	const data = await res.json();
	console.log(data);
	return [...data];
}

export async function LayoutImage() {
	const data = await getData();
	return (
		<div className="container">
			{data.map((image: Image) => (
				<div className="box">
					<img src={image.url} alt={image.title} />
					<p>{image.title}</p>
				</div>
			))}
		</div>
	);
}
