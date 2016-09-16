export default [
	{
		name : "Todo",
		id   : 0,
		cards : [
			{
				id: 0,
				title: "Code app structure",
				description: "Code the sturcture of the app",
				status: "todo",
				tasks: [
					{
					id: 1,
					name: "ContactList Example",
					done: true
					},
					{
					id: 2,
					name: "Kanban Example",
					done: false
					},
					{
					id: 3,
					name: "My own experiments",
					done: false
					}
				]
			},
			{
				id: 1,
				title: "Do something I don't know yet",
				description: "",
				status: "in-progress",
				tasks: []
			}
		]
	},
	{
		name : "In Progress",
		id   : 1,
		cards : [
			{
				id: 3,
				title: "Build a Trello clone",
				description: "I need to build my version of Trello app",
				status: "in-progress",
				tasks: []
			}
		]
	},
	{
		name : "Done",
		id   : 2,
		cards : []
	}
];
