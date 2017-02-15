export default {
	lists : {
		byId : {
			"0" : {
				id : "0",
				name : "Todo",
			},
			"1" : {
				name : "In Progress",
				id   : "1",
			},
			"2" : {
				id   : "2",
				name : "Done",
			}
		},
		allLists : ["0", "1", "2"],
	},
	cards : {
		byId : {
			"0" : {
				id: "0",
				title: "Click to play with me",
				description: "THANK YOU! I will introduce you to the features of this app.Below is a list of taskes you will complete.",
				tasks : ["0", "1", "2", "3"]
			},
			"1" : {
				id: "1",
				title: "Play with me too",
				description: "",
				tasks : ["4"]
			},
			"2" : {
				id: "2",
				title: "Please sort of remove me from here",
				description: "I can't continue to be the last card on this list, please sort me to the top or create a new list and move from this list to the new list",
				tasks : ["5", "6",]
			},
			"3" : {
				id: "3",
				title: "Please help me!",
				description: "You are currently playing me, but I'm not sure what features you've used so far, please kindly let me know by adding some tasks you've completed on this card. Also, try adding some more cards on this list.",
				tasks : []
			},
			"4" : {
				id: "4",
				title: "I keep you're state!",
				description: "By now you might have noticed how I keep state. In case you missed that, try complete the tasks here",
				tasks : ["7"]
			},
		},
	},
	tasks : {
		byId : {
			"0" : {
				id : "0",
				name: "Click to edit or delete me, but please don't delete me",
				done: true
			},
			"1" : {
				id : "1",
				name : "Click my check button to toggle me as complete",
				done : false
			},
			"2" : {
				id: "2",
				name: "Click on the top right icon to view the card menu.",
				done: false
			},
			"3" : {
				id: "3",
				name: "I think you're done with me. Now Drag and Drop this card on 'Done List'",
				done: false
			},
			"4" : {
				id: "4",
				name: "I'm living in a card with no description please help add a description. And maybe, more tasks because I'm lonely here.",
				done: false
			},
			"5" : {
				id: "5",
				name: "Sort (Drag and Drop) me to the top of this list",
				done: false
			},
			"6" : {
				id: "6",
				name: "Create a new list from the top right of the board",
				done: false
			},
			"7" : {
				id: "7",
				name: "Click on me to edit, but before saving, drag and drop this card. See how I keep state :)",
				done: false
			},
		},
	}
};
