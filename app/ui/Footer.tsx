'use client';

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-teal-600 p-4 text-white text-center">
            <p>© {new Date().getFullYear()} NovelNest. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
