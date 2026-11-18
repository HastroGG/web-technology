import type { ReactNode } from 'react';

interface HeaderProps {
    title: string;
    text?: string;
    children?: ReactNode;
}

export default function Header({ title, text, children }: HeaderProps) {
    return (
        <header className="site-baslik">
            <h1>{title}</h1>
            {text && <p>{text}</p>}
            {children}
        </header>
    );
}