import React from "react";
import styles from "./Input.module.scss";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
	return <input {...props} className={`${styles.input} ${props.className}`} />;
};

export default Input;
