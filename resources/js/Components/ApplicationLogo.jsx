export default function ApplicationLogo(props) {
    return (
        <img
            src="/logo-notoria.png"
            alt="Notoria Logo"
            width={180}
            height={48}
            className="object-contain"
            {...props}
        />
    );
}
