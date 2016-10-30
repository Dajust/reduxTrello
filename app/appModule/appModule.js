export default [
	{
		name : "Todo",
		id   : 0,
		cards : [
			{
				id: 0,
				title: "Click to play with me",
				description: "Yay! you clicked, THANK YOU! I will introduce you to the features of this app.Below is a list of taskes you will complete.",
				status: "todo",
				tasks: [
					{
					id: 1,
					name: "Click to edit or delete me, but please don't delete me",
					done: true
					},
					{
					id: 2,
					name: "Click my check button to toggle me as complete",
					done: false
					},
					{
						id: 3,
						name: "Click on the top right icon to view the card menu.",
						done: false
					},
					{
						id: 4,
						name: "I think you're done with me. Now Drag and Drop this card on 'Done List'",
						done: false
					}
				]
			},
			{
				id: 1,
				title: "Play with me too",
				description: "",
				status: "in-progress",
				tasks: [
					{
						id: 5,
						name: "I'm living in a card with no description please help add a description. And maybe, more taks because I'm lonely here.",
						done: false
					}
				]
			},
			{
				id: 2,
				title: "Please sort of remove me from here",
				description: "I can't continue to be the last card on this list, please sort me to the top or create a new list and move from this list to the new list",
				status: "in-progress",
				tasks: [
					{
						id: 6,
						name: "Sort (Drag and Drop) me to the top of this list",
						done: false
					},
					{
						id: 7,
						name: "Create a new list from the top right of the board",
						done: false
					}
				]
			}
		]
	},
	{
		name : "In Progress",
		id   : 1,
		cards : [
			{
				id: 3,
				title: "Please help me!",
				description: "You are currently playing me, but I'm not sure what featues you have used so far, please kindly let me know by adding some taks you've completed on this card. Also try adding some more cards on this list.",
				status: "in-progress",
				tasks: []
			}
		]
	},
	{
		name : "Done",
		id   : 2,
		cards : [
			{
				id: 4,
				title: "I keep you're state!",
				description: "By now you might have noticed how I keep state. In case you missed that, try complete the tasks here",
				status: "done",
				tasks: [
					{
						id: 7,
						name: "Click on me to edit, but before saving, drag and drop this card. See how I keep state :)",
						done: false
					}
				]
			},
		]
	}
];
