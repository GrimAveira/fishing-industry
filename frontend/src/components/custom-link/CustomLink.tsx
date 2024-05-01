import styles from "./CustomLink.module.css";

const CustomLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
	return (
		<a {...props} className={`${styles.link} ${props.className}`}>
			{props.children}
		</a>
	);
};

export default CustomLink;
