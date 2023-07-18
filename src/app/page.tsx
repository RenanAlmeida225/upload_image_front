import { Header } from '@/components/header/header';
import { ImageForm } from '@/components/imageForm/imageForm';

// import { LayoutImage } from '@/components/layoutImage/layoutImage';
export default function Home() {
	return (
		<main>
			<Header />
			{/* <LayoutImage /> */}
			<ImageForm />
		</main>
	);
}
