'use client';
import { useRouter } from 'next/navigation';
import './header.css';

export function Header() {
	const router = useRouter();
	return (
		<header>
			<button className="btn-save" onClick={() => router.push('/save')}>
				SALVAR
			</button>
		</header>
	);
}
