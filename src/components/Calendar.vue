<template lang="pug">
FullCalendar(:options="calendarOptions")
</template>

<script>
	import FullCalendar from "@fullcalendar/vue";
	import listPlugin from "@fullcalendar/list";
	import interactionPlugin from "@fullcalendar/interaction";
	export default {
		components: {
			FullCalendar,
		},
		data: () => ({
			calendarOptions: {
				plugins: [listPlugin, interactionPlugin],
				initialView: "listMonth",
				height: "auto",
				events: [],
				selectable: true,
				eventClick: function (info) {
					info.jsEvent.preventDefault();
					console.table(info.event.id);
				},
			},
		}),
		async mounted() {
			let service = "https://www.googleapis.com/calendar/v3/calendars";
			let cal = "lovallo.james@gmail.com";
			let key = "AIzaSyCB9GQWwL_pO6JRdVKU7wt8pkgw4z2Q_DA";

			let events = [];
			let cleaned = [];

			let d = new Date();
			let start = new Date(new Date().setDate(d.getDate() - 60)).toISOString();

			let request = `${service}/${cal}/events?key=${key}&timeMin=${start}&singleEvents=true&orderBy=startTime`;

			await fetch(request)
				.then((response) => response.json())
				.then((data) => (events = data.items));

			await events.forEach((event) => {
				let details = {
					title: event.summary,
					id: event.id,
					start: event.start?.date || event.start?.dateTime,
					end: event.end?.date || event.end?.dateTime,
					color: "var(--v-accent-base)",
					textColor: "white",
				};
				cleaned.push(details);
			});

			this.calendarOptions.events = cleaned;
		},
	};
</script>

<style lang="scss">
	.fc-toolbar {
		.fc-button {
			background: transparent;
			color: var(--v-accent-base) !important;
			border: transparent;
			border-radius: 0;
			transition: 0.25s;

			&:focus,
			&:active,
			&:hover {
				outline: none !important;
				box-shadow: none !important;
				background: transparent !important;
			}
			&:hover {
				transform: scale(1.2);
			}
			&:disabled {
				display: none;
			}

			.fc-icon {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>