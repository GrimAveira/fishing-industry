import { styled } from "@mui/material/styles";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	InputBase,
	SelectChangeEvent,
} from "@mui/material";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
	margin: "10px",
	"& .MuiInputBase-input": {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #ced4da",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		padding: "12px",
		width: "190px",
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
	},
}));

interface IProps {
	name?: string;
	label: string;
	onChange: (event: SelectChangeEvent<string>) => void;
	items:
		| {
				value: string | undefined;
				label: string;
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }[]
		| undefined;
	value: string;
}

function SelectMui(props: IProps) {
	const { items, label, name, onChange, value } = props;

	return (
		<FormControl fullWidth margin="normal">
			<InputLabel id="demo-simple-select-label">{label}</InputLabel>
			<Select
				key={name}
				label={label}
				name={name}
				value={value}
				input={<BootstrapInput />}
				required
				onChange={onChange}
			>
				{items?.map(({ value, label }) => {
					return (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
}

export default SelectMui;
