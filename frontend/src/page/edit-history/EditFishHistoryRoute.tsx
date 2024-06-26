import styles from "./EditFishHistoryRoute.module.css";
import MainForm from "../../components/main-form/MainForm";
import ModalForm from "../../components/modal-form/ModalForm";
import { useState } from "react";
import MyButton from "../../components/button/MyButton";
import FishWeightForm from "../../components/submit-forms/fish/FishWeightForm";
import FishCategoryForm from "../../components/submit-forms/fish/FishCategoryForm";
import FishTankForm from "../../components/submit-forms/fish/FishTankForm";

function EditFishHistoryRoute() {
	const [activeWeight, setActiveWeight] = useState(false);
	const [activeCategory, setActiveCategory] = useState(false);
	const [activeTank, setActiveTank] = useState(false);

	return (
		<MainForm>
			<MyButton className={styles.button} onClick={() => setActiveWeight((prev) => !prev)}>
				Добавить запись по массе
			</MyButton>
			<MyButton className={styles.button} onClick={() => setActiveCategory((prev) => !prev)}>
				Добавить запись по категории
			</MyButton>
			<MyButton className={styles.button} onClick={() => setActiveTank((prev) => !prev)}>
				Добавить запись по резервуару
			</MyButton>

			<ModalForm active={activeWeight} setActive={setActiveWeight}>
				<FishWeightForm />
			</ModalForm>
			<ModalForm active={activeCategory} setActive={setActiveCategory}>
				<FishCategoryForm />
			</ModalForm>
			<ModalForm active={activeTank} setActive={setActiveTank}>
				<FishTankForm />
			</ModalForm>
		</MainForm>
	);
}

export default EditFishHistoryRoute;
