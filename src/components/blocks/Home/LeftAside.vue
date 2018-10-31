<template>
	<aside class="col col-xl-3 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
		<!--<div class="ui-block">

			&lt;!&ndash; W-Weather &ndash;&gt;

			<div class="widget w-wethear">
				<a href="#" class="more">
					<svg class="olymp-three-dots-icon">
						<use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
					</svg>
				</a>

				<div class="wethear-now inline-items">
					<div class="temperature-sensor">64°</div>
					<div class="max-min-temperature">
						<span>58°</span>
						<span>76°</span>
					</div>

					<svg class="olymp-weather-partly-sunny-icon">
						<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-partly-sunny-icon"></use>
					</svg>
				</div>

				<div class="wethear-now-description">
					<div class="climate">Partly Sunny</div>
					<span>Real Feel: <span>67°</span></span>
					<span>Chance of Rain: <span>49%</span></span>
				</div>

				<ul class="weekly-forecast">

					<li>
						<div class="day">sun</div>
						<svg class="olymp-weather-sunny-icon">
							<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-sunny-icon"></use>
						</svg>

						<div class="temperature-sensor-day">60°</div>
					</li>

					<li>
						<div class="day">mon</div>
						<svg class="olymp-weather-partly-sunny-icon">
							<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-partly-sunny-icon"></use>
						</svg>
						<div class="temperature-sensor-day">58°</div>
					</li>

					<li>
						<div class="day">tue</div>
						<svg class="olymp-weather-cloudy-icon">
							<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-cloudy-icon"></use>
						</svg>

						<div class="temperature-sensor-day">67°</div>
					</li>

					<li>
						<div class="day">wed</div>
						<svg class="olymp-weather-rain-icon">
							<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-rain-icon"></use>
						</svg>

						<div class="temperature-sensor-day">70°</div>
					</li>

					<li>
						<div class="day">thu</div>
						<svg class="olymp-weather-storm-icon">
							<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-storm-icon"></use>
						</svg>

						<div class="temperature-sensor-day">58°</div>
					</li>

					<li>
						<div class="day">fri</div>
						<svg class="olymp-weather-snow-icon">
							<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-snow-icon"></use>
						</svg>

						<div class="temperature-sensor-day">68°</div>
					</li>

					<li>
						<div class="day">sat</div>

						<svg class="olymp-weather-wind-icon-header">
							<use xlink:href="/svg-icons/sprites/icons-weather.svg#olymp-weather-wind-icon-header"></use>
						</svg>

						<div class="temperature-sensor-day">65°</div>
					</li>

				</ul>

				<div class="date-and-place">
					<h5 class="date">Saturday, March 26th</h5>
					<div class="place">San Francisco, CA</div>
				</div>

			</div>

			&lt;!&ndash; W-Weather &ndash;&gt;
	  </div>-->

		<div class="ui-block">
			<div class="w-calendar calendar-container text-center">
				<v-calendar :attributes='calendarAttrs' class="calendar" :theme-styles="themeStyles" :formats="calendarFormats"
				            @dayclick='dayClicked' style="display: block;">
					<header slot='header' slot-scope='{ monthLabel, yearLabel, movePrevMonth, moveNextMonth }'>
						<h6 class="month">{{ monthLabel }} {{ yearLabel }}</h6>
						<a class="calendar-btn-prev fas fa-angle-left" href="#" @click.prevent="movePrevMonth"></a>
						<a class="calendar-btn-next fas fa-angle-right" href="#" @click.prevent="moveNextMonth"></a>
					</header>
					<!--<div slot="ocadu-date-row" slot-scope="{ attribute }" class='todo-row'>
						<div class='todo-content'>
								&lt;!&ndash;<h6 class="todo-title">{{ attribute.popover.customData.title }}</h6>&ndash;&gt;
                <p :class="['todo-description']" v-html="attribute.popover.customData.description"></p>
						</div>
					</div>-->
				</v-calendar>
				<div class="calendar list">
					<b-collapse id="collapse1" v-model="selectedDayBool" class="day-event mt-2">
						<template v-if="selectedDay">
							<div class="ui-block-title ui-block-title-small">
								<h6 class="title">{{ isToday(selectedDay) ? "TODAY'S EVENTS" : `${getTimestamp(selectedDay).toFormat("MMMM d, y")} EVENTS` }}</h6>
							</div>
							<b-card v-if="!selectedDay.attributes.length">
								<div class="card-header">No Events Available</div>
							</b-card>
							<b-card no-body v-for="eventItem in selectedDay.attributes" :key="eventItem.key">
								<template v-if="eventItem.customData.eventType === 'ocadu'">
									<div class="card-header" role="tab" :id="`headingOne-${eventItem.key}`">
										<div class="event-time">
											<span class="circle"></span>
											<time v-if="getTimestamp(eventItem.dates[0])" class="entry-date updated" :datetime="getTimestamp(eventItem.dates[0]).toISO()">
												{{ getTimestamp(eventItem.dates[0]).toFormat("t") }}
											</time>
											<!--<a href="#" class="more">
												<svg class="olymp-three-dots-icon">
													<use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
												</svg>
											</a>-->
										</div>
										<h5 class="mb-0">
											<b-link v-b-toggle="eventItem.key">
												{{ eventItem.customData && eventItem.customData.title }}
												<svg class="olymp-dropdown-arrow-icon">
													<use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use>
												</svg>
											</b-link>
										</h5>
									</div>
									<b-collapse :id="eventItem.key" class="mt-2">
										<div class="card-bod y" v-html="eventItem.customData.description"></div>
										<div class="place inline-items">
											<!--<svg class="olymp-add-a-place-icon">
												<use xlink:href="/svg-icons/sprites/icons.svg#olymp-add-a-place-icon"></use>
											</svg>
											<span>Daydreamz Agency</span>-->
										</div>
									</b-collapse>
								</template>
								<template v-else>
									<div class="card-header" role="tab" :id="`headingOne-${eventItem.key}`">
										<div class="event-time">
											<span class="circle"></span>
											<time v-if="getTimestamp(eventItem.dates[0])" class="entry-date updated" :datetime="getTimestamp(eventItem.dates[0]).toISO()">
												{{ getTimestamp(eventItem.dates[0]).toFormat("t") }}
											</time>
											<!--<a href="#" class="more">
												<svg class="olymp-three-dots-icon">
													<use xlink:href="/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
												</svg>
											</a>-->
										</div>
										<h5 class="mb-0">
											<b-link v-b-toggle="eventItem.key">
												{{ eventItem.customData && eventItem.customData.title }}
												<svg class="olymp-dropdown-arrow-icon">
													<use xlink:href="/svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use>
												</svg>
											</b-link>
										</h5>
									</div>
								</template>
							</b-card>
						</template>
						<!--<a href="#" class="check-all">Check all your Events</a>-->
					</b-collapse>
				</div>
			</div>
		</div>
	</aside>
</template>
<style lang="scss">
.calendar-container {
  .c-weekdays {
    margin: 15px auto 0;
    .c-weekday {
      border: 2px solid transparent;
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      width: 30px;
      border-radius: 100%;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 9px;
      color: #888da8;
    }
  }
  .c-weeks {
    margin: 0 auto;
  }
  .list {
    .card-header {
      a {
        /*font-size: 18px;*/
      }
    }
  }
}
</style>
<script type="text/javascript">
import { DateTime } from "luxon";

export default {
  name: "HomeLeftAside",
  data() {
    return {
      today: DateTime.local(),
      selectedDay: null, // Add state to store selected day
      selectedDayBool: false, // Add state to store selected day
      calendarReady: false,
      ocaduDates: [],
      themeStyles: {
        wrapper: {
          // background: "linear-gradient(to bottom right, #ff5050, #ff66b3)",
          background: "none",
          color: "#4b4e65"
        }
      },
      calendarFormats: {
        title: "MMMM YYYY",
        weekdays: "WWW",
        navMonths: "MMM",
        input: ["L", "YYYY-MM-DD", "YYYY/MM/DD"], // Only for `v-date-picker`
        dayPopover: "L", // Only for `v-date-picker`
        data: ["L", "YYYY-MM-DD", "YYYY/MM/DD"] // For attribute dates
      }
    };
  },
  computed: {
    calendarAttrs() {
      return [
        ...this.ocaduDates,
        // Attributes for todos
        {
          customData: {
            eventType: "test",
          },
          dot: {
            backgroundColor: "#ff4d4d" // Red dot
          },
          dates: [
            new Date(2018, 9, 1),
            new Date(2018, 9, 10),
            new Date(2018, 9, 22),
            new Date(2018, 10, 6),
            new Date(2018, 10, 16)
          ]
        },
        {
          key: "today",
          highlight: {
            backgroundColor: "#ff8080"
          },
          // Just use a normal style
          contentStyle: {
            color: "#fafafa"
          },
          dates: new Date()
        }
      ];
    }
  },
  methods: {
    dayClicked(day) {
      console.log(day);
      if (this.selectedDay && this.selectedDay.dateTime === day.dateTime) {
        this.selectedDay = null;
        this.selectedDayBool = false;
      } else {
        this.selectedDay = day;
        this.selectedDayBool = true;
      }
    },
    getTimestamp(timestamp) {
      return DateTime.fromMillis(timestamp.dateTime);
    },
    isToday(timestamp) {
      return DateTime.fromMillis(timestamp.dateTime).hasSame(this.today, "day");
    }
  },
  mounted() {
    fetch("https://www1.ocadu.ca/feed/dates/2018-2019.json")
      .then(response => response.json())
      .then(response => {
        // response.splice(20);
        for (let i = 0; i < response.length; i++) {
          this.ocaduDates.push({
            dates: DateTime.fromFormat(
              response[i].long_date[0],
              "EEEE, MMMM d'st|nd|rd|th', y"
            ).toJSDate(),
            dot: {
              backgroundColor: "#000"
            },
            customData: {
              eventType: "ocadu",
              ...response[i]
            }
          });
        }
      });
  }
};
</script>
