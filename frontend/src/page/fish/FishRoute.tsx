import styles from "./FishRoute.module.css";
import MainForm from "../../components/main-form/MainForm";
import ModalForm from "../../components/modal-form/ModalForm";
import { useState } from "react";
import MyButton from "../../components/button/MyButton";
import TypeForm from "../../components/submit-forms/type/TypeForm";
import WeightCategoryForm from "../../components/submit-forms/weight-category/WeightCategoryForm";

function FishRoute() {
	const [activeType, setActiveType] = useState(false);
	const [activeFish, setActiveFish] = useState(false);
	const [activeCategory, setActiveCategory] = useState(false);

	return (
		<MainForm>
			<MyButton className={styles.button} onClick={() => setActiveType((prev) => !prev)}>
				Добавить вид
			</MyButton>
			<MyButton className={styles.button} onClick={() => setActiveCategory((prev) => !prev)}>
				Добавить весовую категорию
			</MyButton>
			<MyButton className={styles.button} onClick={() => setActiveFish((prev) => !prev)}>
				Добавить рыбу
			</MyButton>

			<ModalForm active={activeType} setActive={setActiveType}>
				<TypeForm />
			</ModalForm>
			<ModalForm active={activeCategory} setActive={setActiveCategory}>
				<WeightCategoryForm />
			</ModalForm>
			<ModalForm active={activeFish} setActive={setActiveFish}></ModalForm>
		</MainForm>
	);
}

export default FishRoute;
