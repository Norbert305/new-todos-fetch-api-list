import React, { useEffect } from "react";

export function MyList() {
	const [list, setList] = React.useState([]);
	const [task, setTask] = React.useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/Norbert305", {
			method: "PUT",
			body: JSON.stringify(list),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (!resp.ok) {
					throw new Error(
						`Code: ${resp.status}: Message: ${
							resp.statusText ? resp.statusText : "empty"
						} `
					);
				}
				return resp.json();
			})
			.then(body => console.log(body))
			.catch(err => console.log(err));
	}, [list]);

	return (
		<div>
			<input
				placeholder="Please Type...."
				className="shadow"
				type="text"
				value={task}
				onChange={event => setTask(event.target.value)}
				onKeyUp={event => {
					if (event.key === "Enter") {
						let newList = list.concat([
							{ label: task, done: false }
						]);
						setList(newList);
						setTask("");
					}
				}}
			/>
			<ul className="hidden">
				<div className="title">
					{list.map((item, index) => {
						return (
							<li key={index}>
								{item.label}
								<button
									onClick={() => {
										let newList = list.filter(
											(value, locate) => {
												return locate !== index;
											}
										);
										setList(newList);
									}}
									className="delete">
									x
								</button>
							</li>
						);
					})}
				</div>
			</ul>
		</div>
	);
}
