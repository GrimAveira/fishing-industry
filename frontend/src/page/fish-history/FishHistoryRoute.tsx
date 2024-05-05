import styles from "./FishHistoryRoute.module.css";
import MainForm from "../../components/main-form/MainForm";
import ModalForm from "../../components/modal-form/ModalForm";
import { useState } from "react";
import MyButton from "../../components/button/MyButton";
import FishWeightForm from "../../components/submit-forms/fish/FishWeightForm";
import FishCategoryForm from "../../components/submit-forms/fish/FishCategoryForm";

function FishHistoryRoute() {
	const [activeWeight, setActiveWeight] = useState(false);
	const [activeCategory, setActiveCategory] = useState(false);

	return (
		<MainForm>
			<MyButton className={styles.button} onClick={() => setActiveWeight((prev) => !prev)}>
				Добавить запись по массе
			</MyButton>
			<MyButton className={styles.button} onClick={() => setActiveCategory((prev) => !prev)}>
				Добавить запись по категории
			</MyButton>

			<ModalForm active={activeWeight} setActive={setActiveWeight}>
				<FishWeightForm />
			</ModalForm>
			<ModalForm active={activeCategory} setActive={setActiveCategory}>
				<FishCategoryForm />
			</ModalForm>
		</MainForm>
	);
}

export default FishHistoryRoute;
